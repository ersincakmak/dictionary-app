export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface FormikLoginValues {
  email: string;
  password: string;
}

export interface FormikAddWordValues {
  words: string[];
}

export interface FormikRegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormikForgotPasswordValues {
  email: string;
}
