export interface CreateStoryPayload {
  childName: string;
  childAge: string;
  childGender: string;
  theme: string;
  image: File;
}

export interface CreateStoryLocationState {
  payload?: CreateStoryPayload;
  error?: string;
}
