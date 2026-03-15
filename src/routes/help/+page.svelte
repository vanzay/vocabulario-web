<script lang="ts">
    import {t} from "$lib/i18n";
    import PageHead from "$lib/components/PageHead.svelte";
</script>

<svelte:head>
    <title>{t("help.title")} - Vocabulario</title>
</svelte:head>

<div class="container">
    <PageHead title={t("help.title")}/>

    {@html t("help.text")}
</div>
