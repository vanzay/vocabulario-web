<script lang="ts">
    import {onMount} from "svelte";

    let {value = $bindable(), length, color, readOnly, keyDownHandler} = $props();

    let letterInputElements = $state(new Array<HTMLInputElement>(length));

    const buildValueFromLetters = () => {
        let result = "";
        for (let element of letterInputElements) {
            if (element) {
                result += element.value;
            }
        }
        return result;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        const letterIndex = +target.dataset["index"];
        if (e.key.length === 1) {
            e.preventDefault();
            letterInputElements[letterIndex].value = e.key;
            if (letterIndex + 1 < length) {
                letterInputElements[letterIndex + 1].focus();
            }
            value = buildValueFromLetters();
        } else if (e.key === "Backspace") {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            target.value = "";
            if (letterIndex > 0) {
                letterInputElements[letterIndex - 1].focus();
            }
            value = buildValueFromLetters();
        } else {
            keyDownHandler(e);
        }
    }

    onMount(() => {
        letterInputElements[0].focus();
    });
</script>

<div>
    {#each {length}, index}
        <!--key={index}-->
        <span class="letter">
            <input bind:this={letterInputElements[index]}
                   class="word_input"
                   style:color={color}
                   readOnly={readOnly}
                   data-index={index}
                   maxLength="1"
                   onkeydown={handleKeyDown}/>
        </span>
    {/each}
</div>

<style>
    .letter {
        display: inline-block;
        height: 40px;
        width: auto;
        min-width: 40px;
        margin: 3px;
    }

    .word_input {
        display: block;
        width: 40px;
        height: 40px;
        margin-right: auto;
        margin-bottom: 0;
        margin-left: auto;
        padding-top: 6px;
        padding-bottom: 8px;
        border: 1px solid silver;
        border-radius: 5px;
        box-shadow: 0 1px 0 0 hsla(0, 0%, 100%, .5), inset 0 2px 5px 0 rgba(0, 0, 0, .1);
        color: #333333;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
    }

    .word_input:focus {
        outline: 0;
        border-color: #09f;
        box-shadow: 0 0 3px 0 rgba(0, 153, 255, .5), 0 1px 0 0 hsla(0, 0%, 100%, .5), inset 0 2px 5px 0 rgba(0, 0, 0, .1);
    }

    .word_input[readonly] {
        cursor: not-allowed;
        background-color: #eee;
    }
</style>