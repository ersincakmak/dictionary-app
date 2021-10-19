/* eslint-disable react-hooks/exhaustive-deps */
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Button from "../components/Button";
import Question from "../components/Question";
import Result from "../components/Result";
import SelectBox from "../components/SelectBox";
import { firestore } from "../firebase";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  clearExam,
  setTotalQuestionCount,
  setWords,
  startExam,
} from "../redux/wordSlice";

const ExamContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  gap: 1em;
  width: min(700px, 100%);
  margin-inline: auto;
  overflow: hidden;
`;

const Exam = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { totalQuestionCount, examStart, words } = useAppSelector(
    (state) => state.word
  );

  const dispatch = useAppDispatch();

  const wordsRef = collection(firestore, `users/${user!.uid}/words`);

  useEffect(() => {
    const unSub = onSnapshot(wordsRef, (snapshot) => {
      const data = snapshot.docs.map((item) => {
        return {
          word: item.data().word,
          id: item.id,
        };
      });
      dispatch(setWords([...data]));
    });

    return () => {
      unSub();
      dispatch(clearExam());
    };
  }, []);

  const numbers = [
    words.length,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
  ];

  const options: number[] = numbers
    .map((item) => (item <= words.length ? item : null))
    .filter((n) => n) as number[];

  return (
    <ExamContainer>
      <Helmet>
        <title>WTM | EXAM</title>
      </Helmet>
      {examStart === "idle" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Set Question Number{" "}
            <SelectBox
              selectedValue={totalQuestionCount}
              options={options}
              onClick={(val: number) => dispatch(setTotalQuestionCount(val))}
            />
          </div>
          <Button
            btnWidth="md"
            btnColor="brand"
            onClick={() => dispatch(startExam())}
          >
            Start Exam
          </Button>
        </>
      ) : examStart === "started" ? (
        <Question />
      ) : (
        <>
          <Result />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Set Question Number{" "}
            <SelectBox
              selectedValue={totalQuestionCount}
              options={options}
              onClick={(val: number) => dispatch(setTotalQuestionCount(val))}
            />
          </div>
          <Button
            btnWidth="md"
            btnColor="brand"
            onClick={() => dispatch(startExam())}
          >
            Retake Exam
          </Button>
        </>
      )}
    </ExamContainer>
  );
};

export default Exam;
