<script lang="ts">
    const {children, title} = $props();
</script>

<div class="info_block">
    <div class="info_block_head">
        <span class="info_icon">i</span>
        <span>{title}</span>
    </div>
    {@render children()}
</div>

<style>
    .info_block {
        width: 59%;
        height: 100%;
        padding: 20px;
        float: right;
        border: 1px dashed silver;
        border-radius: 5px;
    }

    .info_block_head {
        display: block;
        margin-top: -29px;
        margin-bottom: 9px;
        margin-left: -8px;
        padding-right: 8px;
        padding-left: 8px;
        float: left;
        background-color: #fff;
        font-family: Verdana, Geneva, sans-serif;
        color: #888;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
    }

    .info_icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border-radius: 10px;
        background-color: #888;
        color: #fff;
        text-align: center;
    }
</style>