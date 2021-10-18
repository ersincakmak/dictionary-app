import { User } from "@firebase/auth";

export type Status = "idle" | "pending" | "filled";
export interface AuthState {
  auth: boolean;
  status: Status;
  user: User | undefined;
  error: string;
}
