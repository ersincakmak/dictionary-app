/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Form from "../components/Form/Form";
import FomrText from "../components/Form/FormText";
import { clearError, login, loginWithGoogle } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { FormikLoginValues } from "../types/credentials";

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
    font-size: 40px;
    margin-bottom: 0.625rem;
  }
`;

const ErrorMessage = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.colors.error};
  color: white;
  border-radius: 0.3125rem; // 5px
`;

const ForgotPassword = styled.div`
  width: max-content;
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.2s ease;
  a {
    color: inherit;
    text-decoration: none;
    font-size: 0.875rem; // 14px
  }
`;

const Login = () => {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const formik = useFormik<FormikLoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required().label("Email Address"),
      password: yup.string().min(6).required().label("Password"),
    }),
    onSubmit: async (values) => {
      await dispatch(login(values));
    },
  });

  return (
    <LoginContainer>
      <FormikProvider value={formik}>
        <Form noValidate={true} onSubmit={formik.handleSubmit}>
          <h1>LOGIN</h1>

          {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}

          <Button
            btnWidth="full"
            btnType="google"
            btnColor="google"
            type="button"
            onClick={() => dispatch(loginWithGoogle())}
          >
            <FcGoogle />
            Login with Google
          </Button>

          <Divider message="Or Login With Your Email" />

          <div className="inputs">
            <FomrText
              label="Email"
              props={{
                name: "email",
                placeholder: "Type your email address",
                autoComplete: "on",
                type: "email",
                tabIndex: 1,
              }}
            />
            <FomrText
              label="Password"
              props={{
                name: "password",
                placeholder: "Type your password",
                autoComplete: "off",
                type: "password",
                tabIndex: 2,
              }}
            />
          </div>
          <ForgotPassword>
            <Link to="/forgotpassword" target="_blank">
              Forgot Password?
            </Link>
          </ForgotPassword>
          <Button type="submit" btnWidth="full" btnColor="brand">
            Login
          </Button>
          <Divider message="Or" />
          <Link to="/register">
            <Button type="button" btnWidth="full" btnColor="outlineBrand">
              Register
            </Button>
          </Link>
        </Form>
      </FormikProvider>
    </LoginContainer>
  );
};

export default Login;
