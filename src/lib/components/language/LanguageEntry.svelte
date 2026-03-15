<script lang="ts">
    import {t} from "$lib/i18n";

    const {iso2} = $props();
    const nativeName = $derived(t("lang.native." + iso2));
</script>

<a
        class="dict-lang"
        href={"/dictionary/terms?lang=" + iso2}>
    <img
            src={"/images/flag_" + iso2 + ".png"}
            alt={nativeName}
            title={nativeName}/>
</a>

<style>
    .dict-lang {
        display: inline-table;
        width: 20%;
        margin: 15px 30px 15px 0;
    }
</style>