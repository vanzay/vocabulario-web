<script lang="ts">
    const {children, type = "", disabled = false, ...props} = $props();
</script>

<a
        class={`btn ${type}`}
        class:btn-disabled={disabled}
        {...props}>
    {@render children()}
</a>

<style>
    .btn.control {
        float: right;
    }

    .btn.learn {
        width: 70%;
    }
</style>