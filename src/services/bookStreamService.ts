import { AUTH_TOKEN_KEY } from "@/types/auth";
import type { GenerateBookPayload, StoryResponse } from "./bookService";
import type { GenerationProgressEvent } from "@/lib/createStoryStatus";

const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface StreamErrorPayload {
  error?: string;
  details?: string;
}

type ProgressListener = (event: GenerationProgressEvent) => void;

let inFlightGeneration: Promise<StoryResponse> | null = null;
const progressListeners = new Set<ProgressListener>();

const notifyProgress = (event: GenerationProgressEvent) => {
  progressListeners.forEach((listener) => listener(event));
};

export const subscribeGenerationProgress = (listener: ProgressListener) => {
  progressListeners.add(listener);
  return () => {
    progressListeners.delete(listener);
  };
};

const parseSseChunk = (
  buffer: string,
): { events: Array<{ event: string; data: string }>; rest: string } => {
  const events: Array<{ event: string; data: string }> = [];
  const parts = buffer.split("\n\n");
  const rest = parts.pop() ?? "";

  for (const part of parts) {
    if (!part.trim()) {
      continue;
    }

    const lines = part.split("\n");
    let event = "message";
    const dataLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith("event:")) {
        event = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).trim());
      }
    }

    if (dataLines.length > 0) {
      events.push({ event, data: dataLines.join("\n") });
    }
  }

  return { events, rest };
};

const buildStreamError = (payload: StreamErrorPayload | null, status: number) => {
  const message = payload?.details || payload?.error || `Request failed (${status})`;
  const error = new Error(message);
  (error as Error & { status?: number }).status = status;
  return error;
};

export const generateBookStream = async (
  payload: GenerateBookPayload,
): Promise<StoryResponse> => {
  const formData = new FormData();
  formData.append("childName", payload.childName);
  formData.append("childAge", payload.childAge);
  formData.append("childGender", payload.childGender);
  formData.append("theme", payload.theme);
  formData.append("image", payload.image);

  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${apiUrl}/api/ai/generate-book-stream`, {
    method: "POST",
    body: formData,
    headers,
  });

  if (!response.ok) {
    let payloadError: StreamErrorPayload | null = null;

    try {
      payloadError = (await response.json()) as StreamErrorPayload;
    } catch {
      payloadError = null;
    }

    throw buildStreamError(payloadError, response.status);
  }

  if (!response.body) {
    throw new Error("השרת לא החזיר תגובת התקדמות");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let story: StoryResponse | null = null;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const parsed = parseSseChunk(buffer);
    buffer = parsed.rest;

    for (const { event, data } of parsed.events) {
      if (event === "progress") {
        notifyProgress(JSON.parse(data) as GenerationProgressEvent);
      } else if (event === "complete") {
        story = JSON.parse(data) as StoryResponse;
      } else if (event === "error") {
        const payloadError = JSON.parse(data) as StreamErrorPayload;
        throw buildStreamError(payloadError, 500);
      }
    }
  }

  if (!story?.pages?.length) {
    throw new Error("השרת החזיר ספר ללא עמודים");
  }

  return story;
};

export const getOrStartBookGeneration = (payload: GenerateBookPayload) => {
  if (!inFlightGeneration) {
    inFlightGeneration = generateBookStream(payload).finally(() => {
      inFlightGeneration = null;
    });
  }

  return inFlightGeneration;
};
