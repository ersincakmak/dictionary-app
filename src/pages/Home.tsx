/* eslint-disable react-hooks/exhaustive-deps */
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTimes } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import styled from "styled-components";
import AddWordForm from "../components/AddWordForm";
import Button from "../components/Button";
import SearchBar from "../components/Search";
import { Word, WordList } from "../components/Word";
import { firestore } from "../firebase";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setFilteredWords, setWords } from "../redux/wordSlice";

const HomeContaier = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
  overflow: hidden;
`;

const Home = () => {
  const [isModalActive, setisModalActive] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { filterValue, filteredWords } = useAppSelector((state) => state.word);

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
      dispatch(setFilteredWords());
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    dispatch(setFilteredWords());
  }, [filterValue]);

  return (
    <HomeContaier>
      <Helmet>
        <title>WTM | HOME</title>
      </Helmet>
      <Button
        btnWidth="sm"
        btnColor="brand"
        style={{
          alignSelf: "flex-end",
        }}
        onClick={() => setisModalActive(true)}
      >
        <IoAddSharp />
        Add Word To List
      </Button>
      <AddWordForm
        isModalActive={isModalActive}
        closeModal={() => setisModalActive(false)}
      />
      <SearchBar />
      <WordList>
        {filteredWords.map((item) => (
          <Word key={item.id}>
            <span>{item.word}</span>
            <Button
              btnWidth="xs"
              btnColor="red"
              onClick={() => {
                deleteDoc(doc(wordsRef, item.id));
              }}
            >
              <FaTimes />
            </Button>
          </Word>
        ))}
      </WordList>
    </HomeContaier>
  );
};

export default Home;
