const LETTER_STATES = {
    NOT_FOUND: "NOT_FOUND",
    CORRECT_SPOT: "CORRECT_SPOT",
    WRONG_SPOT: "WRONG_SPOT",
    AVAILABLE: "AVAILABLE",
};
Object.freeze(LETTER_STATES);

const ALPHABET = ["A", "Ą", "B", "C", "Ć", "D", "E",
                "Ę", "F", "G", "H", "I", "J", "K", 
                "L", "Ł", "M", "N", "Ń", "O", "Ó",
                "P", "Q", "R", "S", "Ś", "T", "U", 
                "V", "W", "X", "Y", "Z", "Ż", "Ź"];
Object.freeze(ALPHABET);

const KEYBOARD_ROWS_ARR = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
    ['Ą', 'Ć', 'Ę', "Ł", "Ń", 'Ó', 'Ś', "Ź", "Ż"]
];
Object.freeze(KEYBOARD_ROWS_ARR);

const MAX_LETTERS = 5;
const MAX_GUESSES = 5;

export default {
    LETTER_STATES,
    ALPHABET,
    KEYBOARD_ROWS_ARR,
    MAX_LETTERS,
    MAX_GUESSES,
};
