<script lang="ts">
    const {base, phrases, style} = $props();
</script>

<!-- TODO clean zebra style for tooltip -->
<table
        class="tooltip-data"
        style={style}>
    <tbody>
    {#if base.frequency}
        <!--key={base.phraseId + base.term}-->
        <tr>
            <td class="tooltip-word">{base.term}</td>
            <td class="tooltip-frequency">{base.frequency}</td>
        </tr>
    {/if}
    {#each phrases as item}
        {#if !!item.frequency}
            <!--key={item.phraseId + item.term}-->
            <tr>
                <td class="tooltip-word">{item.term}</td>
                <td class="tooltip-frequency">{item.frequency}</td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>

<style>
    .tooltip-data {
        position: fixed;
        transform: translateX(15px);
        border: #c5c5c5 solid 1px;
        border-radius: 3px;
        background-color: white;
        padding: 8px;
        font-family: Verdana, Geneva, sans-serif;
    }

    .tooltip-word {
        padding-right: 25px;
    }

    .tooltip-frequency {
        font-size: 11px;
        color: #888;
    }
</style>