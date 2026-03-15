<script lang="ts">
    import Button from "./Button.svelte";

    let {files = $bindable(), disabled = false, children, ...props} = $props();
</script>

<Button
        type=""
        disabled={disabled}>
    <label class="file_label">
        <input
                bind:files={files}
                type="file"
                {...props}/>
        {@render children()}
    </label>
</Button>

<style>
    .file_label {
        cursor: pointer;
    }

    input[type="file"] {
        position: fixed;
        top: -1000px;
    }
</style>