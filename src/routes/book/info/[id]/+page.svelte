<script lang="ts">
    import {t} from "$lib/i18n";
    import {clientAuthAndBack} from "$lib/auth";
    import BookInfo from "$lib/components/book/BookInfo.svelte";
    import BookLearn from "$lib/components/book/BookLearn.svelte";
    import PhrasePanel from "$lib/components/book/PhrasePanel.svelte";
    import TabbedPanel from "$lib/components/TabbedPanel.svelte";
    import Tab from "$lib/components/Tab.svelte";
    import PageHead from "$lib/components/PageHead.svelte";

    const {data} = $props();
    const user = $derived(data.user);
    const book = $derived(data.book);
    const summary = $derived(data.summary);

    const tabs = $derived([
        {
            title: t("book.phrase.tab.new"),
            hint: summary ? (book.uniqueGroups - summary.totalPhrases) : ""
        },
        {
            title: t("book.phrase.tab.added"),
            hint: summary?.totalPhrases || ""
        }
    ]);

    const handleTabChange = (tab: number) => {
        if (!user) {
            clientAuthAndBack();
            return false;
        }
        return true;
    }
</script>

<svelte:head>
    <title>{book.title}</title>
    <meta name="description" content={book.title + " " + book.author + " vocabulary"}/>
    <meta name="title" content={book.title + " " + book.author}/>
</svelte:head>

<PageHead title={book.title}>
    <!--<ControlLink href="/shelf" style="float: left">Вернуться в Справчники</ControlLink>-->
    <h2 class="h2">{book.author}</h2>
</PageHead>

<div class="container book-info-header">
    <BookLearn book={book}/>
    <BookInfo
            book={book}
            summary={summary}/>
</div>

<div class="container">
    <TabbedPanel
            tabs={tabs}
            tabChangeHandler={handleTabChange}>
        {#snippet link(tab)}
            <Tab {...tab}/>
        {/snippet}
        {#snippet content(currentTab)}
            {#if currentTab === 0}
                <PhrasePanel
                        inDictionary={false}
                        toolbar={true}/>
            {/if}
            {#if currentTab === 1}
                <PhrasePanel
                        inDictionary={true}
                        toolbar={false}/>
            {/if}
        {/snippet}
    </TabbedPanel>
</div>

<style>
    .book-info-header {
        margin-top: 30px;
        height: 200px;
    }
</style>