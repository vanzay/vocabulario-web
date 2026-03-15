<script lang="ts">
    const {name, value, valueColor = "#444"} = $props();
</script>

<div class="info_row">
    <div class="info_legend">
        <span class="txt_background">{name}:</span>
    </div>
    <div class="info_value" style:color={valueColor}>{value}</div>
</div>

<style>
    .info_row {
        height: 13px;
        margin-bottom: 12px;
        border-bottom: 1px dotted #e0e0e0;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 12px;
        line-height: 16px;
    }

    .info_legend {
        display: block;
        width: 63%;
        float: left;
        color: #888;
    }

    .info_value {
        padding-left: 5px;
        float: right;
        background-color: #fff;
        font-weight: 400;
        text-align: right;
    }

    .txt_background {
        display: inline-block;
        padding-right: 5px;
        background-color: #fff;
    }
</style>