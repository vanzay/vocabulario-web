<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
    import {checkEmail, checkPassword} from "$lib/auth";
    import {EmailInput, Form, Label, PasswordInput, SubmitButton} from "$lib/components/form";

    const {form} = $props();

    let email = $state("");
    let password = $state("");
    let submitted = $state(false);

    const checkForm = () => {
        if (!checkEmail(email)) {
            return t("invalid.email");
        }
        if (!checkPassword(password)) {
            return t("invalid.password");
        }
        return null;
    }
</script>

<svelte:head>
    <title>Vocabulario</title>
</svelte:head>

<Form
        action="?/register"
        bind:submitted={submitted}
        errorMessage={form?.message}
        checkHandler={checkForm}>
    <Label forId="email" title={t("label.username")}/>
    <EmailInput
            id="email"
            name="email"
            bind:value={email}
            maxLength="64"
            readonly={submitted}
            required="required"/>

    <Label forId="password" title={t("label.password")}/>
    <PasswordInput
            id="password"
            name="password"
            bind:value={password}
            maxLength="64"
            readonly={submitted}
            required="required"/>

    <input type="hidden" name="lang_iso2" value={page.data.locale}/>
    <input type="hidden" name="next" value={form?.nextLocation ?? page.url.searchParams.get("next")}/>

    {#snippet footer()}
        <SubmitButton value={t("action.register")} disabled={submitted}/>
    {/snippet}
</Form>
