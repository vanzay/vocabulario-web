<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
    import {getLinkWithRequiredAuth} from "$lib/auth";
    import ControlLink from "$lib/components/ControlLink.svelte";
    import LearnBlock from "./LearnBlock.svelte";

    const {book} = $props();
    const user = $derived(page.data.user);
</script>

<LearnBlock
        title={t("book.training")}
        writingLink={getLinkWithRequiredAuth("/training?mode=writing&book=" + book.id, user)}
        listeningLink={getLinkWithRequiredAuth("/training?mode=listening&book=" + book.id, user)}>
    {#snippet footer()}
        <div class="buy_block">
            {#if book.contentUrl}
                <div>
                    <ControlLink href={book.contentUrl}>{t("book.buy.text")}</ControlLink>
                </div>
            {/if}
            {#if book.audioContentUrl}
                <div>
                    <ControlLink href={book.audioContentUrl}>{t("book.buy.audio")}</ControlLink>
                </div>
            {/if}
        </div>
    {/snippet}
</LearnBlock>

<style>
    .buy_block {
        margin-top: 15px;
    }
</style>
