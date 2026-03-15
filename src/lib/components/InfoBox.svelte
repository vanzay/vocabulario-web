<script lang="ts">
    const {children = null, title, description} = $props();
</script>

<div class="container info_box">
    <h1 class="h1 centered">{title}</h1>
    <p class="description">
        {@html description}
    </p>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .info_box {
        margin-top: 20px;
        padding: 30px;
        border: 1px dashed #e0e0e0;
        border-radius: 5px;
        background-color: #f9f9f9;
        box-shadow: inset 0 2px 5px 0 rgba(0, 0, 0, .05);
        text-align: center;
    }

    .h1.centered {
        display: block;
        float: none;
    }

    .description {
        display: block;
        width: 500px;
        margin-right: auto;
        margin-left: auto;
        font-family: Verdana, Geneva, sans-serif;
        color: #888;
        font-size: 12px;
        line-height: 18px;
    }
</style>