<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
</script>

{#if page.status === 404}
    <div class="error-message">{t("page.not.found")}</div>
{:else}
    <div class="error-message">{page.error?.message}</div>
{/if}

<style>
    .error-message {
        margin-top: 15%;
        font-size: 24px;
        text-align: center;
    }
</style>