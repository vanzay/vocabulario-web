<script lang="ts">
    import {onMount} from "svelte";

    let {value = $bindable(), color, readOnly, keyDownHandler} = $props();

    let inputElement: HTMLInputElement | null = $state(null);

    onMount(() => {
        inputElement.focus();
    });
</script>

<input
        bind:this={inputElement}
        readOnly={readOnly}
        bind:value={value}
        class="word_input"
        style:color={color}
        onkeydown={keyDownHandler}/>

<style>
    .word_input {
        display: block;
        width: 70%;
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