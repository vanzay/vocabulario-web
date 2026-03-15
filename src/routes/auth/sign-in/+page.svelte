<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
    import {EmailInput, Form, Label, PasswordInput, SubmitButton} from "$lib/components/form";
    import ControlLink from "$lib/components/ControlLink.svelte";

    const {form} = $props();
    const nextLocation = $derived(form?.nextLocation || page.url.searchParams.get("next"));

    let submitted = $state(false);
</script>

<svelte:head>
    <title>Vocabulario</title>
</svelte:head>

<Form
        action="?/login"
        bind:submitted={submitted}
        errorMessage={form?.message}>
    <Label forId="email" title={t("label.username")}/>
    <EmailInput
            id="email"
            name="email"
            maxLength="64"
            readonly={submitted}
            required="required"/>

    <Label forId="password" title={t("label.password")}/>
    <PasswordInput
            id="password"
            name="password"
            maxLength="64"
            readonly={submitted}
            required="required"/>

    <div class="link_more">
        <ControlLink
                href={"/auth/sign-up" + (nextLocation ? `?next=${encodeURIComponent(nextLocation)}`: "")}>{t("action.register")}</ControlLink>
    </div>
    <div class="link_more">
        <ControlLink href="/auth/restore-password">{t("login.forgot")}</ControlLink>
    </div>

    <input type="hidden" name="next" value={nextLocation}/>

    {#snippet footer()}
        <SubmitButton value={t("action.enter")} disabled={submitted}/>
    {/snippet}
</Form>
