<script lang="ts">
    import {t} from "$lib/i18n";
    import {checkPassword} from "$lib/auth";
    import {Form, Label, PasswordInput, SubmitButton} from "$lib/components/form";

    const {form, data} = $props();

    let password = $state("");
    let submitted = $state(false);

    const checkForm = () => {
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
        action="?/change-password"
        bind:submitted={submitted}
        errorMessage={form?.message}
        checkHandler={checkForm}>
    <Label forId="password" title={t("label.password")}/>
    <PasswordInput
            id="password"
            name="password"
            bind:value={password}
            maxLength="64"
            readonly={submitted}
            required="required"/>

    <input type="hidden" name="uid" value={data.uid}/>
    <input type="hidden" name="token" value={data.token}/>

    {#snippet footer()}
        <SubmitButton value={t("action.change.password")} disabled={submitted}/>
    {/snippet}
</Form>
