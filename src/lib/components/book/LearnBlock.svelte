<script lang="ts">
    import {t} from "$lib/i18n";
    import {LinkButton} from "$lib/components/form";

    const {title, writingLink, listeningLink, footer = null} = $props();
</script>

<div class="learn_block">
    <div class="learn_header">{title}</div>
    <div class="learn_control_block">
        <LinkButton
                href={writingLink}
                type="learn">
            {t("book.train.writing")}
        </LinkButton>
    </div>
    <div class="learn_control_block">
        <LinkButton
                href={listeningLink}
                type="learn">
            {t("book.train.listening")}
        </LinkButton>
    </div>
    {#if footer}
        <!--{#if user}-->
        <!--  <div class="learn_description">Последнее занятие: 7 дней назад<br/>(Воскресенье, 23 сентября)</div>*/}-->
        <!--{/if}-->
        {@render footer()}
    {/if}
</div>

<style>
    .learn_block {
        width: 39%;
        height: 100%;
        padding: 20px;
        float: left;
        border: 1px solid #f0e0d0;
        border-radius: 5px;
        background-color: #fff6c6;
        text-align: center;
    }

    .learn_header {
        display: inline-block;
        margin-bottom: 2px;
        font-size: 18px;
        line-height: 24px;
    }

    .learn_control_block {
        margin-top: 5px;
        margin-bottom: 10px;
    }
</style>
