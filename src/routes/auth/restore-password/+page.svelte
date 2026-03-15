<script lang="ts">
    import {t} from "$lib/i18n";
    import {checkEmail} from "$lib/auth";
    import {EmailInput, Form, Label, SubmitButton} from "$lib/components/form";
    import InfoBox from "$lib/components/InfoBox.svelte";

    const {form} = $props();

    let email = $state("");
    let submitted = $state(false);

    const checkForm = () => {
        if (!checkEmail(email)) {
            return t("invalid.email");
        }
        return null;
    }
</script>

<svelte:head>
    <title>Vocabulario</title>
</svelte:head>

{#if form?.success}
    <InfoBox
            title={t("account.access")}
            description={t("forgot.password.sent", {email: form?.email})}/>
{:else}
    <Form
            action="?/restore"
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

        {#snippet footer()}
            <SubmitButton value={t("action.restore")} disabled={submitted}/>
        {/snippet}
    </Form>
{/if}
