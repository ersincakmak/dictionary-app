import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/store";

const ResultContainer = styled.div`
  display: flex;
  height: max-content;
  max-height: 100%;
  flex-direction: column;
  gap: 1em;
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.colors.text};
  border-radius: 5px;
  padding: 1em;
  width: 100%;

  h1 {
    text-align: center;
    font-size: 2rem; // 32px
  }
`;

const List = styled.div`
  display: flex;
  height: max-content;
  max-height: 100%;
  overflow: auto;

  flex-direction: column;
  gap: 0.5em;

  .header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 600;
    font-size: 1.125rem; // 18px
    .word {
      flex: 1;
    }
    .answer {
      width: 7.8125rem; // 125px
      text-align: center;
    }
  }

  .row {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.2em;
    padding-bottom: 1em;

    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colors.text};
    }

    .word {
      flex: 1;
    }
    .answer {
      width: 7.8125rem; // 125px
      text-align: center;
    }
  }
`;

const Answer = styled.span<{
  answer: boolean;
}>`
  color: ${(props) =>
    props.answer ? props.theme.colors.success : props.theme.colors.error};
`;

const Result = () => {
  const { result } = useAppSelector((state) => state.word);

  return (
    <ResultContainer>
      <h1>Your Result</h1>

      <List>
        <ul className="header">
          <li className="word">Question Word</li>
          <li className="answer">Your Answer</li>
        </ul>

        {result.map((item) => (
          <ul className="row">
            <li className="word">
              {item.questionNumber}. Question : {item.word.word}
            </li>
            <li className="answer">
              {item.isAnswerTrue ? (
                <Answer answer={true}>TRUE</Answer>
              ) : (
                <Answer answer={false}>FALSE</Answer>
              )}
            </li>
          </ul>
        ))}
      </List>
    </ResultContainer>
  );
};

export default Result;
