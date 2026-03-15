<script lang="ts">
    import {onMount} from "svelte";

    const {children, closeHandler} = $props();

    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.className.includes("fade")) {
            closeHandler();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            closeHandler();
        }
    };

    onMount(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });
</script>

<div
        class="fade"
        onclick={handleClick}>
    {@render children()}
</div>

<style>
    .fade {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        overflow: hidden;
        background-color: rgba(34, 34, 34, .8);
    }
</style>