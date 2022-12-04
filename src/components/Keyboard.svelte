<script>
    import { loop_guard } from "svelte/internal";
    import { get } from "svelte/store";
    import CONSTANTS from "../constants";
    import { currentLetterIndex, currentWordIndex, setCurrentLetterIndex, setCurrentWordIndex, deleteLetter, guessLetter, guessWord } from "../stores/gameStore";

    const handleClick = (letter) => {
        if (letter === 'ENTER') {
            guessWord();
        } else if (letter === 'DEL') {
            deleteLetter();
        } else {
            guessLetter(letter);
        }

        if ($currentLetterIndex > CONSTANTS.MAX_LETTERS && $currentWordIndex < CONSTANTS.MAX_GUESSES) {
            setCurrentLetterIndex(0);
            setCurrentWordIndex(get(CurrentWordIndex) + 1);
        } 
    };
</script>
<div>
    {#each CONSTANTS.KEYBOARD_ROWS_ARR as row}
        <div class="flex gap-2 justify-center mb-2">
            {#each row as letter}
                <button on:click={() => handleClick(letter)} class="p-2 h-10 rounded-md flex items-center justify-center border-2 border-gray-100">
                    { letter }
                </button>
            {/each}
        </div>
    {/each}
</div>