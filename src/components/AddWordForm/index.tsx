import { FieldArray, FormikProvider, useFormik } from "formik";
import React from "react";
import { FormikAddWordValues } from "../../types/credentials";
import Modal from "../Modal";
import * as yup from "yup";
import Form from "../Form/Form";
import FomrText from "../Form/FormText";
import styled from "styled-components";
import { TiTimes } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import Button from "../Button";
import { useAppSelector } from "../../redux/store";
import { collection, doc, writeBatch } from "firebase/firestore";
import { firestore } from "../../firebase";

const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;

const FormArray = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4em;

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    position: sticky;
    bottom: 1em;
    margin-top: 1em;
  }
`;

const FormHeader = styled.div`
  background-color: ${(props) => props.theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  position: sticky;
  top: 0;
  z-index: 999;
`;

interface Props {
  isModalActive: boolean;
  closeModal: () => void;
}

const AddWordForm: React.FC<Props> = ({ isModalActive, closeModal }) => {
  const { user } = useAppSelector((state) => state.auth);

  const wordsRef = collection(firestore, `users/${user!.uid}/words`);

  const formik = useFormik<FormikAddWordValues>({
    initialValues: {
      words: [""],
    },
    validationSchema: yup.object().shape({
      words: yup.array().of(yup.string().required().label("Word")).required(),
    }),
    onSubmit: async (values) => {
      const batch = writeBatch(firestore);

      if (values.words.length) {
        values.words.forEach((item) => {
          const docRef = doc(wordsRef);
          batch.set(docRef, {
            word: item,
          });
        });
      }

      await batch.commit();
      formik.resetForm();
      closeModal();
    },
  });

  const { values } = formik;

  return (
    <Modal isModalActive={isModalActive}>
      <FormikProvider value={formik}>
        <Form
          noValidate={true}
          onSubmit={formik.handleSubmit}
          style={{
            width: "100%",
          }}
        >
          <FieldArray
            name="words"
            render={(arrayHelpers) => (
              <>
                <FormHeader>
                  <h2
                    style={{
                      position: "sticky",
                      top: "1em",
                    }}
                  >
                    Words
                  </h2>
                  <div className="closeModal" onClick={() => closeModal()}>
                    <FaTimes />
                  </div>
                </FormHeader>
                <FormArray>
                  {values.words && values.words.length > 0
                    ? values.words.map((_, index) => (
                        <Field key={index}>
                          <Button
                            btnWidth="xs"
                            btnColor="red"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            <TiTimes />
                          </Button>
                          <FomrText
                            label=""
                            props={{
                              name: `words.${index}`,
                              placeholder:
                                "Type what you want to add wish list",
                              type: "text",
                              autoComplete: "off",
                            }}
                          />
                        </Field>
                      ))
                    : null}
                  <div className="buttons">
                    <Button
                      btnWidth="sm"
                      btnColor="brand"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add a Word
                    </Button>
                    <Button btnWidth="full" btnColor="brand" type="submit">
                      Add All Words to List
                    </Button>
                  </div>
                </FormArray>
              </>
            )}
          />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddWordForm;
