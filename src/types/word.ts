export interface WordState {
  words: Word[]
  filteredWords: Word[]
  filterValue: string
  examStart: 'idle' | 'started' | 'finished'
  totalQuestionCount: number
  examWords: Word[]
  currentQuestion: CurrentQuestion
  result: Result[]
}

export interface Word {
  word: WordObject
  id: string
}

export interface WordObject {
  en: string
  tr: string
}

export interface CurrentQuestion {
  questionNumber: number
  selectedWord: Word | undefined
  isNext: boolean
  isTrue: boolean
}

export interface Result {
  questionNumber: number
  word: Word
  userAnswer: string
  isAnswerTrue: boolean
}
