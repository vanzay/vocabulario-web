<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
    import {clientAuthAndBack} from "$lib/auth";
    import type {User} from "$lib/api/user";
    import NavigationItem from "./NavigationItem.svelte";
    import DropdownMenu from "./DropdownMenu.svelte";

    const user = $derived(page.data.user);
    const username = $derived(getUserName(user));
    const path = $derived(page.url.pathname);

    function getUserName(user?: User): string {
        if (!user) {
            return "";
        }
        const indexOfAtSign = user.email.indexOf("@");
        return indexOfAtSign > 0 ? user.email.substring(0, indexOfAtSign) : user.email;
    }

    const logout = async () => {
        await fetch("/auth/logout");
        await clientAuthAndBack();
    }

    const menuItems = [
        // {
        //     title: "Settings",
        //     handler: () => {
        //     }
        // },
        {
            title: t("action.logout"),
            handler: logout
        },
    ];
</script>

<div class="navbar">
    <div class="container">
        <nav class="nav_menu">
            <NavigationItem
                    link="/"
                    current={path === "/"}
                    title={t("app.navi.materials")}/>
            {#if user}
                <NavigationItem
                        link="/shelf"
                        current={path === "/shelf"}
                        title={t("app.navi.shelf")}/>
                <NavigationItem
                        link="/dictionary"
                        current={path.startsWith("/dictionary")}
                        title={t("app.navi.dictionary")}/>
            {/if}
            <NavigationItem
                    link="/help"
                    current={path === "/help"}
                    title={t("app.navi.help")}/>
            {#if user}
                <DropdownMenu
                        items={menuItems}
                        icon={username.at(0)?.toUpperCase()}
                        title={username}/>
            {:else}
                <!--<NavigationItem link="/auth/sign-up" title={t("action.register")}/>-->
                <NavigationItem
                        link="/auth/sign-in"
                        current={path === "/auth/sign-in"}
                        title={t("action.login")}/>
            {/if}
        </nav>

        <a href="/">
            <div class="nav_logo">{t("app.title")}</div>
        </a>
        <div class="nav_slogan">{t("app.tagline")}</div>
    </div>
</div>

<style>
    .navbar {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: 48px;
        z-index: 1000;
        background: #dddddd;
        background-image: -webkit-linear-gradient(90deg, #e9e9e9, #fff);
        background-image: linear-gradient(0deg, #e9e9e9, #fff);
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .25), inset 0 -1px 0 0 #f0f0f0;
        color: #fff;
    }

    .nav_logo {
        margin-top: 8px;
        float: left;
        color: #333;
        font-family: Georgia, Times, 'Times New Roman', serif;
        font-size: 15px;
        font-weight: 700;
        line-height: 20px;
        text-decoration: none;
    }

    .nav_slogan {
        float: left;
        clear: left;
        color: #888;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 10px;
        line-height: 15px;
    }

    .nav_menu {
        float: right
    }
</style>