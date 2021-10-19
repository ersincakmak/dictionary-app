import { Status } from "./auth";

export interface WordState {
  words: Word[];
  filteredWords: Word[];
  filterValue: string;
  examStart: "idle" | "started" | "finished";
  totalQuestionCount: number;
  examWords: Word[];
  currentQuestion: CurrentQuestion;
  result: Result[];
}

export interface Word {
  word: string;
  id: string;
}

export interface CurrentQuestion {
  questionNumber: number;
  selectedWord: Word | undefined;
  isNext: boolean;
  isFetching: Status;
  isTrue: boolean;
}

export interface Result {
  questionNumber: number;
  word: Word;
  isAnswerTrue: boolean;
}
