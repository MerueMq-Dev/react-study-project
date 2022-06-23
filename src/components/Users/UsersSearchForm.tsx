import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { getFilter } from "../../redux/selectors/usersSelectors";
import { FilterType } from "../../types/types";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FriendFormType =  "true" | "false" | "null";
type FormType = {
    term: string
    friend: FriendFormType
}

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
        term: values.term,
        friend: values.friend === "null" ? null : values.friend === "true" ? true : false  
    }
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  const filter = useSelector(getFilter);
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term:filter.term, friend: (String(filter.friend)) as FriendFormType}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field as="select"  name="friend">
             <option value="null">All</option>
             <option value="true">Only followed</option>
             <option value="false">Only unfollowed</option>
           </Field>
           <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
