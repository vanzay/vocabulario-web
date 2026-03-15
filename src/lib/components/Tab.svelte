<script lang="ts">
    const {title, hint} = $props();
</script>

<span>{title}</span>&nbsp;
<span class="small_txt">{hint}</span>

<style>
    .small_txt {
        display: inline-block;
        padding-bottom: 1px;
        color: #888;
        font-size: 10px;
        line-height: 18px;
        font-weight: 400;
    }
</style>
