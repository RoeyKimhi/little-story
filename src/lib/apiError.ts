import axios from "axios";

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "יצירת הספר לקחה יותר מדי זמן. נסו שוב — אם הבקשה הסתיימה בשרת, הספר עשוי להופיע אחרי רענון.";
    }

    const serverMessage =
      typeof error.response?.data?.details === "string"
        ? error.response.data.details
        : typeof error.response?.data?.error === "string"
          ? error.response.data.error
          : null;

    const isForbidden =
      error.response?.status === 403 ||
      serverMessage?.toLowerCase().includes("forbidden");

    if (isForbidden) {
      if (serverMessage?.toLowerCase().includes("exhausted balance")) {
        return "חשבון FAL נעול — היתרה נגמרה. טענו balance ב-fal.ai/dashboard/billing ונסו שוב.";
      }

      if (serverMessage?.toLowerCase().includes("user is locked")) {
        return "חשבון FAL נעול. בדקו ב-fal.ai/dashboard/billing את היתרה והחשבון המקושר ל-API Key.";
      }

      return "שירות יצירת התמונות (FAL) דחה את הבקשה — בדקו ב-fal.ai/dashboard שה-API Key תקין ושיש יתרה (balance).";
    }

    if (serverMessage?.toLowerCase().includes("exhausted balance")) {
      return "חשבון FAL נעול — היתרה נגמרה. טענו balance ב-fal.ai/dashboard/billing ונסו שוב.";
    }

    if (serverMessage) {
      return serverMessage;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "משהו השתבש ביצירת הספר. נסו שוב.";
};
