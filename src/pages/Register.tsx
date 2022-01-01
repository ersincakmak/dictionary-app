/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import Button from '../components/Button'
import Divider from '../components/Divider'
import Form from '../components/Form/Form'
import FomrText from '../components/Form/FormText'
import { clearError, register } from '../redux/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { FormikRegisterValues } from '../types/credentials'

const RegisterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
    font-size: 40px;
    margin-bottom: 0.625rem;
  }
`

const ErrorMessage = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.colors.error};
  color: white;
  border-radius: 0.3125rem; // 5px
`

const Register = () => {
  const dispatch = useAppDispatch()

  const { error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [])

  const formik = useFormik<FormikRegisterValues>({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      fullname: yup.string().min(3).required().label('Full Name'),
      email: yup.string().email().required().label('Email Address'),
      password: yup.string().min(6).required().label('Password'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must be match.')
        .required()
        .label('Confirm Password'),
    }),
    onSubmit: async (values) => {
      await dispatch(
        register({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        })
      )
    },
  })

  return (
    <RegisterContainer>
      <Helmet>
        <title>WTM | REGISTER</title>
      </Helmet>
      <FormikProvider value={formik}>
        <Form noValidate={true} onSubmit={formik.handleSubmit}>
          <h1>REGISTER</h1>
          {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}
          <div className="inputs">
            <FomrText
              label="Full Name"
              props={{
                name: 'fullname',
                placeholder: 'Type your full name',
                autoComplete: 'on',
                type: 'text',
                tabIndex: 1,
              }}
            />
            <FomrText
              label="Email"
              props={{
                name: 'email',
                placeholder: 'Type your email address',
                autoComplete: 'on',
                type: 'email',
                tabIndex: 2,
              }}
            />
            <FomrText
              label="Password"
              props={{
                name: 'password',
                placeholder: 'Type your password',
                autoComplete: 'off',
                type: 'password',
                tabIndex: 3,
              }}
            />
            <FomrText
              label="Confirm Password"
              props={{
                name: 'confirmPassword',
                placeholder: 'Confirm your password',
                autoComplete: 'off',
                type: 'password',
                tabIndex: 4,
              }}
            />
          </div>
          <Button type="submit" btnWidth="full" btnColor="brand">
            Register
          </Button>
          <Divider message="Or" />
          <Link to="/login">
            <Button type="button" btnWidth="full" btnColor="outlineBrand">
              Login
            </Button>
          </Link>
        </Form>
      </FormikProvider>
    </RegisterContainer>
  )
}

export default Register
