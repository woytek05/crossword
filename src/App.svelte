<script lang="ts">
    import CONSTANTS from "./constants";
    import WordInput from "./components/WordInput.svelte";
    import Keyboard from "./components/Keyboard.svelte";
    import { moveUp, moveDown, moveLeft, moveRight, fetchWords, getRandomWord, generateEmptyArray, initializeGame, guessWord, deleteLetter, guessLetter } from "./stores/gameStore";
    const words = fetchWords();

    const handleKeydown = (event) => {
        switch (event.key) {
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "Backspace":
                deleteLetter();
                break;
            case "Enter":
                guessWord();
                break;
            default:
                guessLetter(event.key);
                return; 
        }
    };
</script>

<svelte:window on:keydown={handleKeydown}/>
{#await words}
    <div class="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
        <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"/>    
            </circle>
            <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite" 
                begin="0.2"/>       
            </circle>
            <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.3"/>
            </circle>
        </svg>
    </div>
{:then words}
    <div class="w-full h-screen bg-black text-white mx-auto max-w-10 py-10 flex flex-col items-center">
        {initializeGame()}
        <h1 class="text-4xl mb-2 text-center">Jolka</h1>
        <div class="flex flex-col gap-y-1 max-w-2xl h-full justify-between items-center">
            <div class="grow">
                {#each Array(CONSTANTS.MAX_GUESSES) as _, i}
                    <div class="flex mx-auto space-x-1 mb-1 text-white">
                        <WordInput index={i} />
                    </div>
                {/each}
            </div>
            <Keyboard />
        </div>
    </div>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    svg {
        width: 100px;
        height: 100px;
    }
</style>
