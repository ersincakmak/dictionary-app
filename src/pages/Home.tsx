/* eslint-disable react-hooks/exhaustive-deps */
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import styled from "styled-components";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { Word, WordList } from "../components/Word";
import { firestore } from "../firebase";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setWords } from "../redux/wordSlice";
import { FaTimes } from "react-icons/fa";

const HomeContaier = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
  overflow: hidden;
`;

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { words } = useAppSelector((state) => state.word);

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

    return () => unSub();
  }, []);

  const handleAddWordBtn = async () => {
    const { isConfirmed, value } = await Swal.fire({
      titleText: "ADD LIST",
      text: "Type Type what you want to add to the word list.",
      icon: "info",
      input: "text",
    });

    if (isConfirmed) {
      try {
        if (words.find((item) => item.word === value) || value === "") {
          return false;
        } else {
          await addDoc(wordsRef, {
            word: value,
          });
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <HomeContaier>
      <Button
        btnWidth="sm"
        btnColor="brand"
        style={{
          alignSelf: "flex-end",
        }}
        onClick={handleAddWordBtn}
      >
        <IoAddSharp />
        Add Word To List
      </Button>

      <WordList>
        {words.map((item) => (
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
