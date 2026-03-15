<script lang="ts">
    import {t} from "$lib/i18n";
    import PhraseEntry from "./PhraseEntry.svelte";

    const {items, editHandler} = $props();

    const toggleSelectAll = (e: Event) => {
        const target = e.target as HTMLInputElement;
        items.forEach(item => {
            item.phrase.checked = target.checked;
        });
    }
</script>

<table class="data-list zebra selectable">
    <thead>
    <tr class="not-selectable">
        <th>
            <input
                    type="checkbox"
                    class="checkbox_input"
                    onchange={toggleSelectAll}/>
        </th>
        <th class="legend_translation">{t("header.phrase.translation")}</th>
        <th class="legend_word">{t("header.phrase.term")}</th>
        <th class="legend_frequency">{t("dictionary.progress")}</th>
    </tr>
    </thead>
    <tbody>
    {#each items as item}
        <!--key={item.phrase.id}-->
        <PhraseEntry
                {...item}
                editHandler={editHandler}/>
    {/each}
    </tbody>
</table>
