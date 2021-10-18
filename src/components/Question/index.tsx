import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { checkAnswer, nextQuestion } from "../../redux/wordSlice";
import Button from "../Button";

const Input = styled.input`
  padding: 0.7em 1em;
  width: min(25rem, 100%); // 400px
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 5px;
  font-size: 1rem; // 16px
  color: ${(props) => props.theme.colors.text};
  background-color: transparent;
`;

const AnswerMessage = styled.div<{
  answer: boolean;
}>`
  color: ${(props) =>
    props.answer === false
      ? props.theme.colors.error
      : props.theme.colors.success};
  font-weight: 600;
`;

const QuestionHeader = styled.div`
  font-size: 1.5rem; // 24px
`;

const Question = () => {
  const [answer, setanswer] = useState("");

  const { currentQuestion } = useAppSelector((state) => state.word);

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLInputElement>(null);

  const nextQuestionFunction = () => {
    dispatch(nextQuestion());
    setanswer("");
    ref.current?.focus();
  };

  const checkAnswerFunction = async () => {
    switch (currentQuestion.isNext) {
      case true:
        nextQuestionFunction();
        break;

      default:
        if (answer.trim().length) {
          await dispatch(checkAnswer(answer.trim()));
        }
        break;
    }
  };

  return (
    <>
      <QuestionHeader>
        Question {currentQuestion.questionNumber} :{" "}
        {currentQuestion.selectedWord?.word}
      </QuestionHeader>
      <Input
        ref={ref}
        type="text"
        placeholder="Your answer"
        value={answer}
        onInput={(e) => setanswer(e.currentTarget.value)}
        onKeyPress={async (e) =>
          e.key === "Enter" && (await checkAnswerFunction())
        }
      />

      {currentQuestion.isFetching === "filled" ? (
        currentQuestion.isTrue ? (
          <AnswerMessage answer={true}>Your answer is TRUE</AnswerMessage>
        ) : (
          <AnswerMessage answer={false}>Your answer is WRONG</AnswerMessage>
        )
      ) : null}
      <Button
        btnWidth="sm"
        btnColor="outlineBrand"
        onClick={async () => await checkAnswerFunction()}
      >
        {currentQuestion.isNext ? "Next Question" : "Check Answer"}
      </Button>
    </>
  );
};

export default Question;
