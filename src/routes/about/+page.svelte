<script lang="ts">
    import {t} from "$lib/i18n";
    import PageHead from "$lib/components/PageHead.svelte";
</script>

<svelte:head>
    <title>{t("about.title")} - Vocabulario</title>
</svelte:head>

<div class="container">
    <PageHead title={t("about.title")}/>

    {@html t("about.text")}
</div>
