<script lang="ts">
    import {page} from "$app/state";
    import {clientAuthAndBack} from "$lib/auth";
    import Tooltip from "./Tooltip.svelte";

    const {base = $bindable(), phrases, groupFrequency} = $props();
    const user = $derived(page.data.user);

    let tooltipStyle: string | null = $state(null);

    const togglePhrase = (e: Event) => {
        if (!user) {
            clientAuthAndBack();
            return;
        }

        if (e.type === "change" || base.onStudying != null) {
            return;
        }

        base.checked = !base.checked;
    }

    const showTooltip = (e: MouseEvent) => {
        const target = e.target as HTMLTableCellElement;
        const rect = target.getBoundingClientRect();
        tooltipStyle = `top: ${Math.round(rect.top)}px`;
    }

    const hideTooltip = () => {
        tooltipStyle = null;
    }
</script>

<tr
        class="phrase_row highlighted"
        class:not-selectable={base.onStudying != null}
        onclick={togglePhrase}>
    <td>
        {#if base.onStudying == null}
            <input
                    type="checkbox"
                    class="checkbox_input word_check"
                    checked={!!base.checked}
                    onchange={togglePhrase}/>
        {:else}
            <span>&nbsp;</span>
        {/if}
    </td>
    <td class="translation">
        {#if base.userTranslation || base.translation}
            <span>{base.userTranslation || base.translation}</span>
        {:else}
            <span>-</span>
        {/if}
    </td>
    <td>
        <div class="base-form">{base.term}</div>
    </td>
    <td
            class="frequency numeric"
            onmouseenter={showTooltip}
            onmouseleave={hideTooltip}>
        {groupFrequency}
    </td>
    <td>
        {#if tooltipStyle}
            <Tooltip
                    base={base}
                    phrases={phrases}
                    style={tooltipStyle}/>
        {/if}
    </td>
</tr>

<style>
    .phrase_row {
        font-family: Verdana, Geneva, sans-serif;
        line-height: 29px;
    }

    .translation {
        width: 49%;
        font-size: 12px;
    }

    .base-form {
        font-size: 12px;
        font-weight: bold;
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
