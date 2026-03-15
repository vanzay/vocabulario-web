<script lang="ts">
    import {t} from "$lib/i18n";
</script>

<div class="container footer">
    {t("app.copyright")}
    <div>
        <a href="/about" class="footer_link">{t("app.about")}</a>
        &nbsp;|&nbsp;
        <a href="/help" class="footer_link">{t("app.help")}</a>
    </div>
</div>

<style>
    .footer {
        margin-top: 30px;
        padding: 12px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: #f9f9f9;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .25);
        color: #888;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 10px;
    }

    .footer_link {
        color: #08c;
    }

    .footer_link:hover {
        color: #09f;
    }
</style>