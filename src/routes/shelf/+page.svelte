<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
    import {getShelfAPI} from "$lib/api/shelf";
    import {handleClientError} from "$lib/errors";
    import {LinkButton} from "$lib/components/form";
    import BookEntry from "$lib/components/shelf/BookEntry.svelte";
    import UploadForm from "$lib/components/shelf/UploadForm.svelte";
    import ControlLink from "$lib/components/ControlLink.svelte";
    import InfoBox from "$lib/components/InfoBox.svelte";
    import PageHead from "$lib/components/PageHead.svelte";
    import PulseLoader from "$lib/components/PulseLoader.svelte";

    const {data} = $props();
    const accessToken = $derived(data.accessToken);

    let items = $derived(data.books);
    let shelfPage = $state(0);
    let loading = $state(false);
    let uploadFormOpen = $state(page.url.searchParams.get("upload") === "true");

    const loadData = async () => {
        let result = [];
        loading = true;
        try {
            const shelfAPI = getShelfAPI({accessToken});
            result = await shelfAPI.getBooks(shelfPage);
        } catch (e) {
            await handleClientError(e);
        }
        loading = false;
        return result;
    };

    const loadMore = async () => {
        shelfPage = shelfPage + 1;
        const data = await loadData();
        items = [...items, ...data];
    }

    const handleSuccessUpload = (book: any) => {
        closeUploadForm();
        if (!items) {
            items = [book];
        } else {
            items = [book, ...items];
        }
    }

    const openUploadForm = () => {
        uploadFormOpen = true;
    }

    const closeUploadForm = () => {
        uploadFormOpen = false;
    }
</script>

<svelte:head>
    <title>{t("shelf.list.title")} - Vocabulario</title>
</svelte:head>

<UploadForm
        open={uploadFormOpen}
        closeHandler={closeUploadForm}
        successUploadHandler={handleSuccessUpload}/>

{#if items && !items.length}
    <InfoBox
            title={t("shelf.list.title")}
            description={t("shelf.intro")}>
        <LinkButton onclick={openUploadForm}>
            <span class="plus_icon">+</span> <span>{t("action.upload.book")}</span>
        </LinkButton>
        <span>&nbsp;{t("or")}&nbsp;</span>
        <LinkButton href="/">
            <span class="plus_icon">&#x2315;</span> <span>{t("action.find.book")}</span>
        </LinkButton>
    </InfoBox>
{/if}

{#if items && items.length}
    <PageHead title={t("shelf.list.title")}>
        <LinkButton
                onclick={openUploadForm}
                type="control">
            <span class="plus_icon">+</span> <span>{t("action.upload.book")}</span>
        </LinkButton>
        <!--<ControlLink href="/shelf/edit" style="float: right">Rename or delete</ControlLink>-->
    </PageHead>

    <div class="container">
        {#each items as item}
            <!--key={item.id}-->
            <BookEntry {...item} showProgress={true}/>
        {/each}

        {#if loading}
            <PulseLoader/>
        {:else}
            <div class="link_more">
                <ControlLink onclick={loadMore}>{t("action.show.more")}</ControlLink>
            </div>
        {/if}
    </div>
{/if}
