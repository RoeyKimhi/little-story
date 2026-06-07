import axios from "axios";
import { apiClient } from "./api";
import type {
  ApiAuthResponse,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import { mapApiAuthResponse, MOCK_USERS_KEY } from "@/types/auth";

export class AuthServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthServiceError";
  }
}

const clearMockData = () => {
  localStorage.removeItem(MOCK_USERS_KEY);
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Cannot reach the server. Make sure the backend is running on port 3000.";
    }

    if (error.response.status === 404) {
      return "Auth API not found. Restart the backend: npm run dev in LittleStory.";
    }

    if (error.response.status === 403) {
      return "Access denied (403). Check that the backend is running on port 3000.";
    }

    const apiError = error.response?.data as { error?: string } | undefined;
    return apiError?.error || "Something went wrong. Please try again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiAuthResponse>(
      "/api/auth/login",
      payload,
    );
    clearMockData();
    return mapApiAuthResponse(response.data);
  } catch (error) {
    throw new AuthServiceError(getErrorMessage(error));
  }
};

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiAuthResponse>(
      "/api/auth/register",
      {
        name: payload.fullName,
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
      },
    );
    clearMockData();
    return mapApiAuthResponse(response.data);
  } catch (error) {
    throw new AuthServiceError(getErrorMessage(error));
  }
};
