<script lang="ts">
    const {children = null, title} = $props();
</script>

<div class="container w-clearfix page_head">
    <h1 class="h1 page_title">{title}</h1>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .page_head {
        display: table;
        margin-top: 20px;
        border-bottom: 1px solid #e0e0e0;
    }

    .h1.page_title {
        width: 70%;
        margin-bottom: 10px;
        font-size: 24px;
    }
</style>
