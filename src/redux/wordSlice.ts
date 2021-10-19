import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants/api";
import { ApiResponse } from "../types/apiResponse";
import { Word, WordState } from "../types/word";
import { RootState } from "./store";

const initialState: WordState = {
  words: [],
  filteredWords: [],
  filterValue: "",
  examWords: [],
  examStart: "idle",
  totalQuestionCount: 5,
  currentQuestion: {
    isNext: false,
    questionNumber: 1,
    selectedWord: undefined,
    isFetching: "idle",
    isTrue: false,
  },
  result: [],
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const checkAnswer = createAsyncThunk<
  boolean,
  string,
  {
    state: RootState;
    rejectValue: string;
  }
>("word/check", async (answer, { getState, rejectWithValue }) => {
  const {
    word: { currentQuestion },
  } = getState();
  try {
    const { data } = await axios.request<ApiResponse>({
      method: "GET",
      url: API_URL(currentQuestion.selectedWord?.word as string),
    });

    return data.def.find((item) =>
      item.tr.find(
        (tr) =>
          tr.text.toString().toLowerCase() ===
            answer.toString().toLowerCase() ||
          tr.syn?.find(
            (syn) =>
              syn.text.toString().toLowerCase() ===
              answer.toString().toLowerCase()
          )
      )
    )
      ? true
      : false;
  } catch (error) {
    return rejectWithValue("Error while fetching answer.");
  }
});

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    },
    startExam: (state) => {
      state.examStart = "started";
      state.examWords = state.words;
      state.result = [];
      state.currentQuestion = {
        isFetching: "idle",
        isNext: false,
        isTrue: false,
        questionNumber: 1,
        selectedWord:
          state.examWords[randomIntFromInterval(0, state.examWords.length - 1)],
      };
    },
    setTotalQuestionCount: (state, aciton: PayloadAction<number>) => {
      state.totalQuestionCount = aciton.payload;
    },
    clearExam: (state) => {
      state.examStart = "idle";
      state.result = [];
      state.currentQuestion = {
        isFetching: "idle",
        isNext: false,
        isTrue: false,
        questionNumber: 0,
        selectedWord: undefined,
      };
    },
    nextQuestion: (state) => {
      state.result.push({
        questionNumber: state.currentQuestion.questionNumber,
        word: state.currentQuestion.selectedWord as Word,
        isAnswerTrue: state.currentQuestion.isTrue,
      });

      state.examWords = state.examWords.filter(
        (item) =>
          item.word.toString() !==
          state.currentQuestion.selectedWord?.word.toString()
      );

      if (
        state.examWords.length > 0 &&
        state.totalQuestionCount > state.currentQuestion.questionNumber
      ) {
        state.currentQuestion = {
          isFetching: "idle",
          isNext: false,
          isTrue: false,
          questionNumber: state.currentQuestion.questionNumber + 1,
          selectedWord:
            state.examWords[
              randomIntFromInterval(0, state.examWords.length - 1)
            ],
        };
      } else {
        state.examStart = "finished";
      }
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    setFilteredWords: (state) => {
      state.filteredWords = state.words.filter((item) =>
        item.word.includes(state.filterValue)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAnswer.pending, (state) => {
        state.currentQuestion.isFetching = "pending";
      })
      .addCase(checkAnswer.fulfilled, (state, action) => {
        state.currentQuestion.isFetching = "filled";
        state.currentQuestion.isNext = true;
        state.currentQuestion.isTrue = action.payload;
      })
      .addCase(checkAnswer.rejected, (state, action) => {
        state.currentQuestion.isFetching = "filled";
        console.log(action.payload);
      });
  },
});

export const {
  setWords,
  setTotalQuestionCount,
  startExam,
  nextQuestion,
  clearExam,
  setFilterValue,
  setFilteredWords,
} = wordSlice.actions;

export default wordSlice.reducer;
