export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Shape returned by the backend API
export interface ApiUser {
  _id: string;
  name: string;
  email: string;
}

export interface ApiAuthResponse {
  token: string;
  user: ApiUser;
}

export const AUTH_TOKEN_KEY = "authToken";
export const AUTH_USER_KEY = "authUser";
export const MOCK_USERS_KEY = "littlestory_mock_users";

export const mapApiUserToUser = (apiUser: ApiUser): User => ({
  id: apiUser._id,
  fullName: apiUser.name,
  email: apiUser.email,
});

export const mapApiAuthResponse = (response: ApiAuthResponse): AuthResponse => ({
  token: response.token,
  user: mapApiUserToUser(response.user),
});
