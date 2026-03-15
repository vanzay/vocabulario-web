<script lang="ts">
    const {phrase} = $props();

    const fisherYatesShuffle = (word: string) => {
        const letters = word.split("");
        for (let i = letters.length - 1; i >= 1; i--) {
            let j = randomInt(0, i - 1);    // there is a modification here, rand[0,i] in original algorithm
            let temp = letters[i];
            letters[i] = letters[j];
            letters[j] = temp;
        }
        return letters;
    }

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const shuffledLetters = $derived(fisherYatesShuffle(phrase));
</script>

<div class="letter-set">
    {#each shuffledLetters as letter}
        <!--key={index}-->
        <span class="letter">{letter}</span>
    {/each}
</div>

<style>
    .letter-set {
        font-size: 24px;
        font-family: Verdana, Geneva, sans-serif;
    }

    .letter {
        display: inline-block;
        height: 40px;
        width: auto;
        min-width: 40px;
        margin: 3px;
    }
</style>