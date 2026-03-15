<script lang="ts">
    import {t} from "$lib/i18n";
    import {LinkButton} from "$lib/components/form";
    import LanguageEntry from "$lib/components/language/LanguageEntry.svelte";
    import InfoBox from "$lib/components/InfoBox.svelte";
    import PageHead from "$lib/components/PageHead.svelte";

    const {data} = $props();
    const languages = $derived(data.languages);
</script>

<svelte:head>
    <title>{t("dictionary.title")} - Vocabulario</title>
</svelte:head>

{#if languages && !languages.length}
    <InfoBox
            title={t("dictionary.title")}
            description={t("dictionary.empty")}>
        <LinkButton href="/shelf">{t("dictionary.add.from.book")}</LinkButton>
    </InfoBox>
{/if}

{#if languages && languages.length}
    <PageHead title={t("dictionary.title")}/>

    <div class="container">
        {#each languages as language}
            <!--key={language}-->
            <LanguageEntry iso2={language}/>
        {/each}
    </div>
{/if}
