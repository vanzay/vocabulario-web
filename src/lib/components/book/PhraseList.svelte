<script lang="ts">
    import {t} from "$lib/i18n";
    import {clientAuthAndBack} from "$lib/auth";
    import {page} from "$app/state";
    import PhraseEntry from "./PhraseEntry.svelte";

    const {items, inDictionary} = $props();

    const user = $derived(page.data.user);

    const toggleSelectAll = (e: Event) => {
        if (!user) {
            clientAuthAndBack();
            return;
        }

        const target = e.target as HTMLInputElement;
        items.forEach(item => {
            item.base.checked = target.checked;
        });
    }
</script>

<table class="data-list zebra selectable">
    <thead>
    <tr class="not-selectable">
        <th>
            {#if !inDictionary}
                <input
                        type="checkbox"
                        class="checkbox_input"
                        onchange={toggleSelectAll}/>
            {/if}
        </th>
        <th class="legend_translation">{t("header.phrase.translation")}</th>
        <th class="legend_word">{t("header.phrase.term")}</th>
        <th class="legend_frequency">{t("book.phrase.term.frequency")}</th>
    </tr>
    </thead>
    <tbody>
    {#each items as item}
        <!--key={item.base.phraseId}-->
        <PhraseEntry
                bind:base={item.base}
                phrases={item.phrases}
                groupFrequency={item.groupFrequency}/>
    {/each}
    </tbody>
</table>
