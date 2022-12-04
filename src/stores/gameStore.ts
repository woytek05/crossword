import { get, writable } from "svelte/store";
import { isArrayLiteralExpression } from "typescript";
import CONSTANTS from "../constants";

export const words = writable([]);
export const correctWordsArray = writable([]);
export const cluesArray = writable([]);
export const userGuessesArray = writable([]);
export const currentWordIndex = writable(0);
export const currentLetterIndex = writable(0);

export const initializeGame = async() => {
    generateCorrectWordsArray();
    setUserGuessesArray(generateEmptyArray());
    setCurrentLetterIndex(0);
    setCurrentWordIndex(0);
};

export const fetchWords = async () => {
    const data: Array<any> = await fetch("https://porucznik-zag.github.io/word-api/words.json")
        .then((response) => response.json())
        .then(wait(1500))
        .catch((err) => console.log(err)) as Array<any>;
    words.set(data);
};

export const getRandomWord = () => {
    const randomNum = Math.floor(Math.random() * get(words).length);
    return get(words)[randomNum];
};

export const guessLetter = (letter: string) => {
    if (letter.length > 1) {
        return;
    }

    if (get(currentLetterIndex) <= CONSTANTS.MAX_LETTERS - 1) {
        console.log(get(currentLetterIndex), get(currentWordIndex), "Good");
    }

    userGuessesArray.update((prev) => {
        prev[get(currentWordIndex)][get(currentLetterIndex)] =
            letter.toUpperCase();
        setCurrentLetterIndex(get(currentLetterIndex) + 1);
        return prev;
    });

    if (get(currentLetterIndex) >= CONSTANTS.MAX_LETTERS) {
        setCurrentWordIndex(get(currentWordIndex) + 1);
        setCurrentLetterIndex(0);
    }
};

export const deleteLetter = () => {
    if (get(currentLetterIndex) > 0) {
        userGuessesArray.update((prev) => {
            prev[get(currentWordIndex)][get(currentLetterIndex) - 1] = "";
            setCurrentLetterIndex(get(currentLetterIndex) - 1);
            return prev;
        });
    }
};

export const guessWord = () => {
    if (get(currentLetterIndex) < CONSTANTS.MAX_LETTERS) {
        return;
    }
    const guessesArr = get(userGuessesArray);
    const currentGuessArray = guessesArr[get(currentWordIndex)];
    const guessStr = currentGuessArray.join("");

    // if (!guesses.includes(guessStr.toLowerCase())) {
    //     return;
    // }

    setCurrentWordIndex(get(currentWordIndex) + 1);
    setCurrentLetterIndex(0);
};

export const moveUp = () => {
    if (get(currentWordIndex) > 0) {
        setCurrentWordIndex(get(currentWordIndex) - 1);
    }
};

export const moveDown = () => {
    if (get(currentWordIndex) < CONSTANTS.MAX_GUESSES - 1) {
        setCurrentWordIndex(get(currentWordIndex) + 1);
    }
};

export const moveLeft = () => {
    if (get(currentLetterIndex) > 0) {
        setCurrentLetterIndex(get(currentLetterIndex) - 1);
    } else if (get(currentLetterIndex) <= 0 && get(currentWordIndex) > 0) {
        setCurrentWordIndex(get(currentWordIndex) - 1);
        setCurrentLetterIndex(CONSTANTS.MAX_LETTERS - 1);
    }
};

export const moveRight = () => {
    if (get(currentLetterIndex) < CONSTANTS.MAX_LETTERS - 1) {
        setCurrentLetterIndex(get(currentLetterIndex) + 1);
    } else if (get(currentLetterIndex) >= CONSTANTS.MAX_LETTERS - 1 && get(currentWordIndex) < CONSTANTS.MAX_GUESSES - 1) {
        setCurrentWordIndex(get(currentWordIndex) + 1);
        setCurrentLetterIndex(0);
    }
};

export const generateCorrectWordsArray = () => {
    let words = [];
    let usedWords = [];
    let clues = [];
    for (let i = 0; i < CONSTANTS.MAX_GUESSES; i++) {
        let word_str = "";
        let clue = "";
        let used = false;
        do {
            const word_obj = getRandomWord();
            word_str = word_obj.word;
            clue = word_obj.clue;
            for (const usedWord of usedWords) {
                if (word_str === usedWord) {
                    used = true;
                    break;
                }
            }
        } while (used);
        words.push(word_str);
        clues.push(clue);
        usedWords.push(word_str);
    }
    setCorrectWordsArray(words);
    setCluesArray(clues);
};

export const generateEmptyArray = () => {
    let arr = [];
    for (let i = 0; i < CONSTANTS.MAX_GUESSES; i++) {
        arr.push([]);
        for (let j = 0; j < CONSTANTS.MAX_LETTERS; j++) {
            arr[i].push("");
        }
    }
    return arr;
};

export const setCurrentLetterIndex = (index: number) => {
    currentLetterIndex.set(index);
};

export const setCurrentWordIndex = (index: number) => {
    currentWordIndex.set(index);
};

const setUserGuessesArray = (guesses) => {
    userGuessesArray.set(guesses);
}

const setCorrectWordsArray = (correctWords) => {
    correctWordsArray.set(correctWords);
}

const setCluesArray = (clues) => {
    cluesArray.set(clues);
};

const wait = (ms: number) => {
    return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
};
