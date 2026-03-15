<script lang="ts">
    const {disabled = false, ...props} = $props();
</script>

<input
        class="btn"
        class:btn-disabled={disabled}
        type="submit"
        {...props}
/>
