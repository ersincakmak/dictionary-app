import { FieldHookConfig, useField } from "formik";
import React from "react";
import { Container, Label, Error, Input } from "./Assets";

interface TextInputProps {
  label: string;
  props: FieldHookConfig<string>;
}

const FomrText: React.FC<TextInputProps> = ({ label, props }) => {
  const [field, meta] = useField(props);

  return (
    <Container>
      <Label htmlFor={props.name}>{label}</Label>

      <Input
        {...field}
        placeholder={props.placeholder}
        id={props.name}
        type={props.type}
        autoComplete={props.autoComplete}
        error={meta.touched && meta.error ? true : false}
      />

      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Container>
  );
};

export default FomrText;
