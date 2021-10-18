export const API_URL = (word: string) =>
  `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.REACT_APP_dictionaryApiKey}&lang=en-tr&text=${word}`;
