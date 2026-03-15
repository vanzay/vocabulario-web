<script>
    const {text} = $props();
</script>

<div class="form_hint">{text}</div>

<style>
    .form_hint {
        display: block;
        margin-top: 4px;
        margin-bottom: 4px;
        padding-right: 4px;
        padding-left: 4px;
        font-family: Verdana, Geneva, sans-serif;
        color: #666;
        font-size: 11px;
        line-height: 16px;
    }
</style>