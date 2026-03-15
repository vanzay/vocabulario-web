<script lang="ts">
    const {children, ...props} = $props();
</script>

<a class="control_link" {...props}>
    {@render children()}
</a>

<style>
    .control_link {
        cursor: pointer;
        border-bottom: 1px dotted rgba(0, 136, 204, .5);
        color: #08c;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 12px;
        line-height: 18px;
        text-decoration: none;
    }

    .control_link:hover {
        border-bottom-color: #09f;
        color: #09f;
    }
</style>