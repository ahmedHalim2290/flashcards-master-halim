import { AsyncStorage } from "react-native";
const FLASHCARDS_STORAGE_KEY = "flashcards: decks";

const initialData = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer:
          "React is a declarative, efficient, and flexible JavaScript library for building user interfaces.",
        correctAnswer: "true"
      },
      {
        question: "What is react Component?",
        answer:
          "React Components. Components are independent and reusable bits of code.",
        correctAnswer: "true"
      }
    ]
  },

  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is number in JS?",
        answer:
          "The Number JavaScript object is a wrapper object allowing you to work with numerical values. ",
        correctAnswer: "true"
      },
      {
        question: "What is an array in JS?",
        answer:
          "A function is a JavaScript procedure—a set of statements that performs a task or calculates a value.",
        correctAnswer: "false"
      }
    ]
  }
};

export const getData = () => {
  return initialData;
};

export async function getDecks() {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results === null) {
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  else {
    return JSON.parse(results);
  }
}

export async function addCardToDeck (name,card){
 const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  const results_1 = JSON.parse(results);
  results_1[name].questions.push(card);
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results_1));
  return results_1;

}

export function saveDeck  (title){
   return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  );
};
