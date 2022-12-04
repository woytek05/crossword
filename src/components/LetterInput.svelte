<script lang="ts">
    export let letter;
    export let letterIndex;
    export let wordIndex;
    import { correctWordsArray, currentLetterIndex, currentWordIndex } from "../stores/gameStore";
    import { fade } from "svelte/transition";

    $: borderClass = () => {
        if ($currentLetterIndex === letterIndex && $currentWordIndex === wordIndex) {
            return "border-red-600";
        } else {
            return "border-gray-600";
        }
    }

    $: backgroundClass = () => {
        const showResults = wordIndex < $currentWordIndex;
        if (showResults && letter === $correctWordsArray[wordIndex][letterIndex]) {
            return "bg-green-500";
        } else {
            return "bg-transparent";
        }
    }
</script>

<div class={`w-14 h-14 flex items-center justify-center border-2 ${borderClass()} ${backgroundClass()}`} in:fade={{ delay: 100 * letterIndex}}>
    <span class="text-4xl font-bold">{ letter }</span>
</div>
