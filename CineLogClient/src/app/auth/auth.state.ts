// auth.state.ts
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}
