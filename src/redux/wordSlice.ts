import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Word, WordState } from '../types/word'

const initialState: WordState = {
  words: [],
  filteredWords: [],
  filterValue: '',
  examWords: [],
  examStart: 'idle',
  totalQuestionCount: 5,
  currentQuestion: {
    isNext: false,
    questionNumber: 1,
    selectedWord: undefined,
    isTrue: false,
  },
  result: [],
}

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload
    },
    startExam: (state) => {
      state.examStart = 'started'
      state.examWords = state.words
      state.result = []
      state.currentQuestion = {
        isNext: false,
        isTrue: false,
        questionNumber: 1,
        selectedWord:
          state.words[randomIntFromInterval(0, state.examWords.length - 1)],
      }
    },
    setTotalQuestionCount: (state, aciton: PayloadAction<number>) => {
      state.totalQuestionCount = aciton.payload
    },
    checkAnswer: (state, action: PayloadAction<string>) => {
      state.currentQuestion = {
        ...state.currentQuestion,
        isTrue: !!state.currentQuestion.selectedWord?.word.tr
          .toLowerCase()
          .includes(action.payload.toLowerCase()),
        isNext: true,
      }
    },
    clearExam: (state) => {
      state.examStart = 'idle'
      state.result = []
      state.currentQuestion = {
        isNext: false,
        isTrue: false,
        questionNumber: 0,
        selectedWord: undefined,
      }
    },
    nextQuestion: (state, action: PayloadAction<string>) => {
      state.result.push({
        questionNumber: state.currentQuestion.questionNumber,
        word: state.currentQuestion.selectedWord as Word,
        isAnswerTrue: state.currentQuestion.isTrue,
        userAnswer: action.payload,
      })

      state.examWords = state.examWords.filter(
        (item) => item.word.tr !== state.currentQuestion.selectedWord?.word.tr
      )

      if (
        state.examWords.length > 0 &&
        state.totalQuestionCount > state.currentQuestion.questionNumber
      ) {
        state.currentQuestion = {
          isNext: false,
          isTrue: false,
          questionNumber: state.currentQuestion.questionNumber + 1,
          selectedWord:
            state.examWords[
              randomIntFromInterval(0, state.examWords.length - 1)
            ],
        }
      } else {
        state.examStart = 'finished'
      }
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload
    },
    setFilteredWords: (state) => {
      state.filteredWords = state.words.filter(
        (item) =>
          item.word.en.includes(state.filterValue) ||
          item.word.tr.includes(state.filterValue)
      )
    },
  },
})

export const {
  setWords,
  setTotalQuestionCount,
  startExam,
  nextQuestion,
  clearExam,
  checkAnswer,
  setFilterValue,
  setFilteredWords,
} = wordSlice.actions

export default wordSlice.reducer
