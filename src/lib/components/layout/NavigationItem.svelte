<script lang="ts">
    const {link, current = false, title} = $props();
</script>

<a
        href={link}
        class="nav_link"
        class:current={current}>
    {title}
</a>

<style>
    .nav_link {
        max-width: 100%;
        margin: 0 20px;
        padding: 15px 0;
        float: left;
        font-family: Verdana, Geneva, sans-serif;
        color: #08c;
        font-size: 12px;
        line-height: 18px;
        text-decoration: none;
    }

    .nav_link:hover {
        color: #09f;
    }

    .nav_link.current {
        padding-bottom: 13px;
        border-bottom: 2px solid #444;
        color: #444;
    }
</style>
