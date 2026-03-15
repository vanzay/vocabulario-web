<script lang="ts">
    import {page} from "$app/state";
    import {onMount} from "svelte";
    import {t} from "$lib/i18n";
    import {getDictionaryAPI} from "$lib/api/dictionary";
    import {handleClientError} from "$lib/errors";
    import {Button} from "$lib/components/form";
    import PulseLoader from "$lib/components/PulseLoader.svelte";
    import ControlLink from "$lib/components/ControlLink.svelte";
    import PhraseList from "./PhraseList.svelte";
    import PhraseForm from "./PhraseForm.svelte";

    const {changeHandler} = $props();
    const accessToken = $derived(page.data.accessToken);
    const langIso2 = $derived(page.data.language);

    let submitted = $state(false);
    let loading = $state(false);
    let items: Array<any> = $state([]);
    let phraseToEdit: any = $state(null);
    let term = $state("");
    let onStudying = $state(false);
    let dataPage = $state(0);

    const loadData = async () => {
        let result = [];
        loading = true;
        try {
            const dictionaryAPI = getDictionaryAPI({accessToken});
            result = await dictionaryAPI.getPhrases({langIso2, term, onStudying, page: dataPage});
        } catch (e) {
            await handleClientError(e);
        }
        loading = false;
        return result;
    }

    const updateItems = (data: Array<any>) => {
        if (dataPage == 0) {
            items = data;
        } else {
            items.push(...data);
        }
    }

    onMount(async () => {
        const data = await loadData();
        updateItems(data);
    });

    const changeOnStudying = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        onStudying = target.checked;
        dataPage = 0;
        items = [];
        const data = await loadData();
        updateItems(data);
    }

    const changeTerm = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        term = target.value;
        dataPage = 0;
        items = [];
        const data = await loadData();
        updateItems(data);
    }

    const loadMore = async () => {
        dataPage = dataPage + 1;
        const data = await loadData();
        updateItems(data);
    }

    const updateOnStudying = async (onStudying: boolean) => {
        const dictionaryAPI = getDictionaryAPI({accessToken});
        await submit(async (selectedItems) => {
            const idList = selectedItems.map(item => item.id);
            await dictionaryAPI.updateStudyingStatus(onStudying, idList);
            selectedItems.forEach(item => item.onStudying = onStudying);
        });
    }

    const removeFromVocabulary = async () => {
        const dictionaryAPI = getDictionaryAPI({accessToken});
        await submit(async (selectedItems) => {
            const idList = selectedItems.map(item => item.id);
            await dictionaryAPI.removePhrases(idList);
            // TODO offset issue for loadMore
            items = items.filter(item => !idList.includes(item.id));
        });
    }

    const exportToCsv = async () => {
        const dictionaryAPI = getDictionaryAPI({accessToken});
        await submit(async (selectedItems) => {
            const idList = selectedItems.map(item => item.id);
            await dictionaryAPI.exportPhrases("csv", idList);
        });
    }

    const submit = async (handler: (items: Array<any>) => Promise<void>) => {
        if (submitted) {
            return;
        }

        const selectedItems = items.filter(item => item.phrase.checked);
        if (!selectedItems.length) {
            return;
        }

        submitted = true;

        try {
            await handler(selectedItems);
            changeHandler();
        } catch (e) {
            await handleClientError(e);
        }

        submitted = false;
    }

    const handleSuccessEdit = (translation: string) => {
        for (let item of items) {
            if (item.id === phraseToEdit.id) {
                item.translation = translation;
                break;
            }
        }
        closeEditForm();
    }

    const openEditForm = (phrase: any) => {
        phraseToEdit = phrase;
    }

    const closeEditForm = () => {
        phraseToEdit = null;
    }
</script>

<div class="container">
    <div class="table_controls">
        <Button
                onclick={() => updateOnStudying(true)}
                disabled={submitted || loading}>
            {t("dictionary.move.to.studying")}
        </Button>
        <Button
                onclick={() => updateOnStudying(false)}
                disabled={submitted || loading}>
            {t("dictionary.move.to.familiar")}
        </Button>
        <Button
                onclick={removeFromVocabulary}
                disabled={submitted || loading}>
            {t("dictionary.remove.words")}
        </Button>
        <Button
                onclick={exportToCsv}
                disabled={submitted || loading}>
            {t("dictionary.export.to.csv")}
        </Button>
    </div>
    <div class="table_controls">
        <div class="table_checkbox limited">
            <input
                    id="on_studying"
                    type="checkbox"
                    class="checkbox_input"
                    disabled={submitted || loading}
                    onchange={changeOnStudying}/>
            <label for="on_studying" class="checkbox_label">{t("label.show.only.on_studying")}</label>
        </div>
        <input
                type="text"
                placeholder={t("dictionary.search.term")}
                class="input search"
                disabled={submitted || loading}
                maxLength="50"
                onchange={changeTerm}/>
    </div>

    {#if items.length}
        <PhraseList
                items={items}
                editHandler={openEditForm}/>
    {/if}

    {#if loading}
        <PulseLoader/>
    {:else}
        <div class="link_more">
            <ControlLink onclick={loadMore}>{t("action.show.more")}</ControlLink>
        </div>
    {/if}
</div>

<PhraseForm
        userPhrase={phraseToEdit}
        closeHandler={closeEditForm}
        successEditHandler={handleSuccessEdit}/>

<style>
    .search {
        width: 50%;
    }

    .table_controls {
        margin: 20px 0 10px 0;
    }

    .table_checkbox {
        padding-top: 5px;
        padding-right: 5px;
        float: left;
    }

    .table_checkbox.limited {
        width: 20%;
    }
</style>