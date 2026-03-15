<script lang="ts">
    import {invalidateAll} from "$app/navigation";
    import {t} from "$lib/i18n";
    import DictionaryInfo from "$lib/components/dictionary/DictionaryInfo.svelte";
    import PhrasePanel from "$lib/components/dictionary/PhrasePanel.svelte";
    import PageHead from "$lib/components/PageHead.svelte";
    import LearnBlock from "$lib/components/book/LearnBlock.svelte";

    const {data} = $props();
    const language = $derived(data.language);
    const dictionary = $derived(data.dictionary);

    const loadData = () => {
        invalidateAll();
    }
</script>

<svelte:head>
    <title>{t("dictionary.title")} - Vocabulario</title>
</svelte:head>

{#if language}
    <PageHead title={t("dictionary.title") + " — " + t("lang.native." + language)}/>
{/if}

<div class="container dictionary-info-header">
    {#if language}
        <LearnBlock
                title={t("book.training")}
                writingLink={"/training?mode=writing&lang=" + language}
                listeningLink={"/training?mode=listening&lang=" + language}>
        </LearnBlock>
    {/if}
    {#if dictionary}
        <DictionaryInfo {...dictionary}/>
    {/if}
</div>

<PhrasePanel changeHandler={loadData}/>

<style>
    .dictionary-info-header {
        margin-top: 30px;
        height: 165px;
    }
</style>