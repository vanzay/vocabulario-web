<script lang="ts">
    const {tabs, link, tabChangeHandler, content} = $props();

    let current = $state(0);

    const changeTab = (tab: number) => {
        if (current === tab) {
            return;
        }

        if (!tabChangeHandler(tab)) {
            return;
        }

        current = tab;
    }
</script>

<div class="tabs_menu">
    {#each tabs as tab, i}
        <span class="tab_link"
              class:current={current === i}
              onclick={() => changeTab(i)}>
            {@render link(tab)}
        </span>
    {/each}
</div>
<div class="tab-content">
    {@render content(current)}
</div>

<style>
    .tabs_menu {
        margin-top: 35px;
        background-image: -webkit-linear-gradient(180deg, #fff, transparent 10%, hsla(0, 0%, 100%, 0) 90%, #fff), -webkit-linear-gradient(270deg, #fff, #f9f9f9 90%, #f0f0f0);
        background-image: linear-gradient(270deg, #fff, transparent 10%, hsla(0, 0%, 100%, 0) 90%, #fff), linear-gradient(180deg, #fff, #f9f9f9 90%, #f0f0f0);
        text-align: center;
    }

    .tab_link {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        margin-right: 2px;
        margin-left: 2px;
        padding: 5px 30px 4px;
        border-style: solid;
        border-width: 1px;
        border-color: #e0e0e0 #e0e0e0 #c9c9c9;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-image: -webkit-linear-gradient(90deg, #e9e9e9, #f9f9f9);
        background-image: linear-gradient(0deg, #e9e9e9, #f9f9f9);
        box-shadow: inset 0 1px 0 0 #fff, inset 0 -1px 0 0 rgba(0, 0, 0, .02), 0 -1px 1px 0 rgba(0, 0, 0, .05);
        color: #222222;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 12px;
        text-align: center;
        text-decoration: none;
    }

    .tab_link.current {
        margin-top: -6px;
        padding-top: 8px;
        padding-bottom: 8px;
        border-bottom-style: none;
        background-color: #fff;
        background-image: none;
        box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, .03);
        font-size: 13px;
        line-height: 19px;
        font-weight: 700;
    }

    .tab-content {
        display: block;
        overflow: hidden;
    }
</style>