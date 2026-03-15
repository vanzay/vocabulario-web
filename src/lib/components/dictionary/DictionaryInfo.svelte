<script lang="ts">
    import {t} from "$lib/i18n";
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import InfoRow from "$lib/components/book/InfoRow.svelte";
    import InfoBlock from "$lib/components/book/InfoBlock.svelte";

    const {knownPhrases, unknownPhrases, totalPhrases} = $props();
    const progress = $derived(Math.round(knownPhrases * 100 / (totalPhrases === 0 ? 1 : totalPhrases)));
    const progressLevel = $derived(progress >= 75 ? "#1a3" : (progress >= 50 ? "#a91" : "#a31"));
</script>

<InfoBlock title={t("label.dictionary.info")}>
    <InfoRow
            name={t("dictionary.info.total.phrases")}
            value={totalPhrases}/>
    <InfoRow
            name={t("dictionary.info.familiar.phrases")}
            value={knownPhrases}/>
    <InfoRow
            name={t("dictionary.info.unfamiliar.phrases")}
            value={unknownPhrases}/>
    <InfoRow
            name={t("label.progress")}
            value={`${progress}%`}
            valueColor={progressLevel}/>
    <div class="progress_bar_row">
        <ProgressBar
                progress={progress}
                fillColor={progressLevel}/>
    </div>
</InfoBlock>

<style>
    .progress_bar_row {
        width: 100%;
        margin-top: 16px;
    }
</style>
