<script lang="ts">
    import {goto} from "$app/navigation";
    import {t} from "$lib/i18n";
    import {handleClientError} from "$lib/errors";
    import {getSearchAPI} from "$lib/api/search";
    import {LinkButton} from "$lib/components/form";
    import AutocompleteInput from "$lib/components/search/AutocompleteInput.svelte";
    import ControlLink from "$lib/components/ControlLink.svelte";
    import BookEntry from "$lib/components/shelf/BookEntry.svelte";
    import PulseLoader from "$lib/components/PulseLoader.svelte";

    const {data} = $props();
    const query = $derived(data.query);

    let items = $derived(data.books);
    let autocompleteQuery = $derived(data.query);
    let searchPage = $state(0);
    let loading = $state(false);

    const buildAutocompleteItem = (item: any) => item.title + " " + item.author;
    const handleAutocompleteFinish = async () => await goto("/?q=" + autocompleteQuery, {invalidateAll: true});
    const handleAutocompleteLoadItems = (query: string) => getSearchAPI().getBooksForAutocomplete(query);

    const loadData = async () => {
        let result = [];
        loading = true;
        try {
            const searchAPI = getSearchAPI();
            result = await searchAPI.getBooks(query, searchPage);
        } catch (e) {
            await handleClientError(e);
        }
        loading = false;
        return result;
    }

    const loadMore = async () => {
        searchPage = searchPage + 1;
        const data = await loadData();
        items = [...items, ...data];
    }
</script>

<svelte:head>
    <title>Vocabulario</title>
</svelte:head>

<div class="container">
    <div class="controls">
        <div class="search_form">
            <AutocompleteInput
                    bind:value={autocompleteQuery}
                    loadItems={handleAutocompleteLoadItems}
                    buildItem={buildAutocompleteItem}
                    finishHandler={handleAutocompleteFinish}/>
            <img
                    src="/images/search.png"
                    alt={t("action.find")}
                    class="search_btn"
                    onclick={handleAutocompleteFinish}/>
        </div>
        <LinkButton
                href="/shelf?upload=true"
                type="control">
            <span class="plus_icon">+</span> <span>{t("action.upload.book")}</span>
        </LinkButton>
    </div>

    <!--
    select language automatically after page reloading
    <input type="radio" id="all_lang" value=""/>
    <label forId="all_lang">{t("label.all.languages")}</label>
    {#each languages as item}
        <input type="radio" id={item + "_lang"} value={item}/>
        <label forId={item + "_lang"}>{t("lang.native." + item)}</label>
    {/each}
    -->

    {#each items as item}
        <BookEntry
                book={item}
                showStats={true}/>
    {/each}

    {#if loading}
        <PulseLoader/>
    {:else}
        <div class="link_more">
            <ControlLink onclick={loadMore}>{t("action.show.more")}</ControlLink>
        </div>
    {/if}
</div>

<style>
    .controls {
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .search_form {
        display: inline-block;
        margin-top: 10px;
        width: 70%;
    }

    .search_btn {
        height: 24px;
        margin-left: 10px;
        cursor: pointer;
    }
</style>