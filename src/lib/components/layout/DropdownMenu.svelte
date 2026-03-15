<script lang="ts">
    import DropdownIcon from "./DropdownIcon.svelte";

    const {items, icon, title} = $props();

    let menuOpened = $state(false);

    const handleItem = (item: any) => {
        menuOpened = false;
        item.handler();
    }
</script>

<div class="nav_dropdown">
    <div
            class="nav_dropdown_toggle"
            onclick={() => menuOpened = !menuOpened}>
        <div class="avatar">{icon}</div>
        <div class="username">{title}</div>
        <div class="dropdown-toggle-icon">
            <DropdownIcon/>
        </div>
    </div>
    {#if menuOpened}
        <nav class="nav_dropdown_list">
            <div class="nav_dropdown_list_arr"></div>
            <div class="nav_dropdown_visible">
                <!--<span class="nav_dropdown_link">Settings</span>-->
                {#each items as item}
                <span
                        class="nav_dropdown_link"
                        onclick={() => handleItem(item)}>
                    {item.title}
                </span>
                {/each}
            </div>
        </nav>
    {/if}
</div>

<style>
    .nav_dropdown {
        display: inline-block;
        position: relative;
    }

    .nav_dropdown_toggle {
        vertical-align: top;
        white-space: nowrap;
        cursor: pointer;
        padding: 10px 0 10px 20px;
        font-family: Verdana, Geneva, sans-serif;
        color: #08c;
    }

    .nav_dropdown_toggle:hover {
        color: #09f;
    }

    .nav_dropdown_list {
        position: absolute;
        padding-top: 2px;
        padding-left: 30px;
        min-width: 100%;
    }

    .nav_dropdown_link {
        cursor: pointer;
        display: block;
        padding: 8px 20px;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 12px;
        white-space: nowrap;
        color: #222222;
        line-height: 18px;
    }

    .nav_dropdown_link:hover {
        color: #666;
    }

    .nav_dropdown_visible {
        padding-top: 2px;
        padding-bottom: 2px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .15);
    }

    .nav_dropdown_list_arr {
        display: block;
        width: 1px;
        height: 1px;
        margin-right: auto;
        margin-bottom: -2px;
        margin-left: auto;
        border-style: solid;
        border-width: 0 10px 10px;
        border-color: transparent transparent #e0e0e0;
    }

    .dropdown-toggle-icon {
        float: right;
        margin: 7px 0 7px 7px;
    }

    .avatar {
        width: 24px;
        height: 24px;
        margin: 2px 6px 0 1px;
        float: left;
        border-radius: 15px;
        background-color: #1a3;
        color: #fff;
        font-size: 10px;
        line-height: 24px;
        font-weight: 400;
        text-align: center;
    }

    .username {
        display: inline-block;
        font-weight: 400;
        font-size: 12px;
        line-height: 28px;
    }
</style>