<script lang="ts">
    import {slide} from "svelte/transition";

    const {message} = $props();
</script>

<div class="notification" in:slide|global out:slide|global>
    {message}
</div>

<style>
    .notification {
        margin: 10px 0;
        padding: 10px;
        background-color: #ffdede;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 2px 7px 0 rgba(0, 0, 0, .2);
        width: 100%;
    }
</style>