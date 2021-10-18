/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import styled from "styled-components";
import * as yup from "yup";
import Button from "../components/Button";
import Form from "../components/Form/Form";
import FomrText from "../components/Form/FormText";
import { clearError, sendResetPasswordMail } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { FormikForgotPasswordValues } from "../types/credentials";

const ForgotPasswordContainer = styled.div`
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

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const formik = useFormik<FormikForgotPasswordValues>({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required().label("Email Address"),
    }),
    onSubmit: async (values) => {
      dispatch(
        sendResetPasswordMail({
          email: values.email,
        })
      );
    },
  });

  return (
    <ForgotPasswordContainer>
      <FormikProvider value={formik}>
        <Form noValidate={true} onSubmit={formik.handleSubmit}>
          <h1>Reset Password</h1>
          {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}
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
          </div>
          <Button type="submit" btnWidth="full" btnColor="brand">
            Send Mail
          </Button>
        </Form>
      </FormikProvider>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
