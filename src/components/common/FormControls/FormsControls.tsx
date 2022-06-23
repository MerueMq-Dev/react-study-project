import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import styles from "./FormsControls.module.css";
import { ValidatorType } from "../../../utils/validators/validators";
import React from "react";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
  children?: React.ReactNode;
};

export const FormControl: React.FC<FormControlPropsType> = ({
  meta,
  children,
}) => {
  const hasError = meta.error && meta.touched;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children} </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  //const { input, meta, child, ...resProps } = props;
  const { input, meta, ...resProps } = props;
  return (
    <FormControl {...props}>
      {" "}
      <textarea {...input} {...resProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  //const { input, meta, child, ...resProps } = props;
  const { input, meta, ...resProps } = props;
  return (
    <FormControl {...props}>
      {" "}
      <input {...input} {...resProps} />
    </FormControl>
  );
};



export function createField<FormKeyType extends string>(
  placeholder: string | null,
  name: FormKeyType,
  validators: ValidatorType[],
  component: React.FC<WrappedFieldProps>,
  props = {},
  text: string = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{" "}
      {text}
    </div>
  );
}

export type GetStringKeys<T> = Extract<keyof T, string>; 