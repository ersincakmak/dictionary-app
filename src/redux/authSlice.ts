import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../firebase";
import { AuthState, Status } from "../types/auth";
import {
  FormikForgotPasswordValues,
  LoginCredentials,
  RegisterCredentials,
} from "../types/credentials";

const initialState: AuthState = {
  auth: false,
  status: "idle",
  user: undefined,
  error: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (params: RegisterCredentials, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      const myError = error as FirebaseError;
      return rejectWithValue(myError.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params: LoginCredentials, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      const myError = error as FirebaseError;
      return rejectWithValue(myError.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      const myError = error as FirebaseError;
      return rejectWithValue(myError.message);
    }
  }
);

export const sendResetPasswordMail = createAsyncThunk(
  "auth/sendResetPasswordMail",
  async (params: FormikForgotPasswordValues, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, params.email);
      return true;
    } catch (error) {
      const myError = error as FirebaseError;
      return rejectWithValue(myError.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    authenticate: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.auth = true;
      state.status = "filled";
    },
    unAuthenticate: (state) => {
      state.user = undefined;
      state.auth = false;
      state.status = "filled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.auth = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.error = "";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.auth = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.auth = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(register.pending, (state) => {
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.auth = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.auth = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(sendResetPasswordMail.pending, (state) => {
        state.error = "";
      })
      .addCase(sendResetPasswordMail.fulfilled, (state, action) => {
        state.auth = false;
        state.error =
          "If you have an account with this email we will send to link, checkout mailbox.";
      })
      .addCase(sendResetPasswordMail.rejected, (state, action) => {
        state.auth = false;
        state.error =
          "If you have an account with this email we will send to link, checkout mailbox.";
      });
  },
});

export const { setStatus, authenticate, unAuthenticate, clearError } =
  authSlice.actions;

export default authSlice.reducer;
