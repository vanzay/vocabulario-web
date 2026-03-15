<script lang="ts">
    const props = $props();
    const {phrase, translation, memoryProgress, auditionProgress, onStudying, editHandler} = $derived(props);

    const togglePhrase = (e: Event) => {
        if (e.type === "change") {
            return;
        }

        const target = e.target as HTMLElement;
        if (target.className.includes("term_link")) {
            editHandler(props);
            return;
        }

        phrase.checked = !phrase.checked;
    }
</script>

<tr
        class="phrase_row highlighted"
        class:familiar-phrase={!onStudying}
        class:unfamiliar-phrase={onStudying}
        onclick={togglePhrase}>
    <td>
        <input
                type="checkbox"
                class="checkbox_input word_check"
                checked={phrase.checked}
                onchange={togglePhrase}/>
    </td>
    <td class="translation">
        <span>{translation || "-"}</span>
    </td>
    <td>
        <div class:base-form={phrase.baseForm}>
            <span class="term_link">{phrase.term}</span>
        </div>
    </td>
    <td class="frequency numeric">
        {#if onStudying}
            <span>{memoryProgress + "% / " + auditionProgress + "%"}</span>
        {/if}
    </td>
</tr>

<style>
    .phrase_row {
        font-family: Verdana, Geneva, sans-serif;
        line-height: 29px;
    }

    .familiar-phrase {
        color: #396;
    }

    .unfamiliar-phrase {
        color: #EB464D;
    }

    .translation {
        width: 49%;
        font-size: 12px;
    }

    .base-form {
        font-size: 12px;
        font-weight: bold;
    }

    .term_link {
        text-decoration: underline;
    }

    .frequency {
        width: 10%;
        color: #888;
        font-size: 12px;
    }

    .numeric {
        text-align: right;
    }
</style>