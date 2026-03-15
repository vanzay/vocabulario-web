<script lang="ts">
    const {forId, title} = $props();
</script>

<label
        class="field_label"
        for={forId}
        title={title}>
    {title}
</label>

<style>
    .field_label {
        margin-bottom: 2px;
        padding-left: 4px;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 12px;
        font-weight: 700;
        line-height: 16px;
    }
</style>