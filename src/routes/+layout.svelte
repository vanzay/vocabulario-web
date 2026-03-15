<script lang="ts">
    import favicon from "$lib/assets/favicon.png";
    import "$lib/assets/app.css";
    import NProgress from "nprogress";
    import "nprogress/nprogress.css";
    import {afterNavigate, beforeNavigate} from "$app/navigation";
    import Header from "$lib/components/layout/Header.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";
    import Notifications from "$lib/components/layout/Notifications.svelte";

    const {children} = $props();

    NProgress.configure({showSpinner: false});

    beforeNavigate(async () => {
        NProgress.start();
    });

    afterNavigate(async () => {
        NProgress.done();
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
</svelte:head>

<div class="app_root">
    <Notifications/>
    <Header/>
    <div class="content">
        {@render children()}
    </div>
    <Footer/>
</div>
