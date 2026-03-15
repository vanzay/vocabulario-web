<script lang="ts">
    import {onMount} from "svelte";
    import {page} from "$app/state";
    import {invalidateAll} from "$app/navigation";
    import {getBookAPI} from "$lib/api/book";
    import {getDictionaryAPI} from "$lib/api/dictionary";
    import {t} from "$lib/i18n";
    import {clientAuthAndBack} from "$lib/auth";
    import {handleClientError} from "$lib/errors";
    import {Button} from "$lib/components/form";
    import PulseLoader from "$lib/components/PulseLoader.svelte";
    import ControlLink from "$lib/components/ControlLink.svelte";
    import PhraseList from "./PhraseList.svelte";

    const {inDictionary, toolbar} = $props();
    const user = $derived(page.data.user);
    const accessToken = $derived(page.data.accessToken);
    const bookId = $derived(page.data.book.id);

    let submitted = $state(false);
    let loading = $state(false);
    let offset = $state(0);
    let items: Array<any> = $state([]);

    const loadData = async () => {
        let result = [];
        loading = true;
        try {
            const bookAPI = getBookAPI({accessToken});
            result = await bookAPI.getPhrases(bookId, inDictionary, page.data.locale, offset);
        } catch (e) {
            await handleClientError(e);
        }
        loading = false;
        return result;
    };

    const loadMore = async () => {
        offset = items.length;
        const data = await loadData();
        items.push(...data);
    }

    const updateUserVocabulary = async (onStudying: boolean) => {
        if (!user) {
            await clientAuthAndBack();
            return;
        }

        if (submitted) {
            return;
        }

        const idList = items
            .filter(item => item.base.checked)
            .map(item => item.base.phraseId);
        if (!idList.length) {
            return;
        }

        submitted = true;

        try {
            const dictionaryAPI = getDictionaryAPI({accessToken});
            await dictionaryAPI.addPhrases(bookId, onStudying, idList);
            items = items.filter(item => !idList.includes(item.base.phraseId));
            await invalidateAll();  // to refresh book statistics
        } catch (e) {
            await handleClientError(e);
        }

        submitted = false;
    }

    onMount(async () => {
        const data = await loadData();
        items.push(...data);
    });
</script>

<div class="table_controls">
    {#if toolbar}
        <Button
                onclick={() => updateUserVocabulary(false)}
                disabled={submitted || loading}>
            {t("action.add.familiar")}
        </Button>
        <Button
                onclick={() => updateUserVocabulary(true)}
                disabled={submitted || loading}>
            {t("action.add.unfamiliar")}
        </Button>
    {/if}
</div>

<PhraseList
        items={items}
        inDictionary={inDictionary}/>

{#if loading}
    <PulseLoader/>
{:else if items.length}
    <div class="link_more">
        <ControlLink onclick={loadMore}>{t("action.show.more")}</ControlLink>
    </div>
{/if}

<style>
    .table_controls {
        margin: 20px 0;
    }
</style>