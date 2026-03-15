<script lang="ts">
    import {t} from "$lib/i18n";
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import InfoBlock from "./InfoBlock.svelte";
    import InfoRow from "./InfoRow.svelte";

    const {book, summary} = $props();
    const comfort = $derived(summary?.comfort || 0);
    const comfortLevel = $derived(comfort >= 75 ? "#1a3" : (comfort >= 50 ? "#a91" : "#a31"));
</script>

<InfoBlock title={t("label.book.info")}>
    <InfoRow
            name={t("book.info.language")}
            value={t("lang.native." + book.language)}/>
    <InfoRow
            name={t("book.info.total.phrases")}
            value={book.totalWords}/>
    <InfoRow
            name={t("book.info.unique.phrases")}
            value={book.uniqueGroups}/>    <!--{book.uniqueWords}-->
    <InfoRow
            name={t("book.info.in.vocabulary")}
            value={summary?.totalPhrases || "?"}/>
    <InfoRow
            name={t("book.info.unfamiliar")}
            value={summary ? (summary.totalPhrases - summary.knownPhrases) : "?"}/>
    <InfoRow
            name={t("label.reading.comfort")}
            value={summary ? `${comfort}%` : "?"}
            valueColor={comfortLevel}/>
    <div class="progress_bar_row">
        <ProgressBar
                progress={comfort}
                fillColor={comfortLevel}/>
    </div>
</InfoBlock>

<style>
    .progress_bar_row {
        width: 100%;
        margin-top: 16px;
    }
</style>
