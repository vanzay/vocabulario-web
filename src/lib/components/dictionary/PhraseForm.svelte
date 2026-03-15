<script lang="ts">
    import {page} from "$app/state";
    import {t} from "$lib/i18n";
    import {getDictionaryAPI} from "$lib/api/dictionary";
    import {handleClientError} from "$lib/errors";
    import {Form, Label, SubmitButton, TextInput} from "$lib/components/form";
    import Modal from "$lib/components/Modal.svelte";

    const {userPhrase, successEditHandler, closeHandler} = $props();
    const accessToken = $derived(page.data.accessToken);
    let translation = $derived(userPhrase.translation);
    let submitted = $state(false);

    const submit = async () => {
        try {
            const dictionaryAPI = getDictionaryAPI({accessToken});
            await dictionaryAPI.saveTranslation(userPhrase.id, translation);
            successEditHandler(translation);
        } catch (e) {
            await handleClientError(e);
        }
    }
</script>

{#if userPhrase}
    <Modal closeHandler={closeHandler}>
        <Form
                action=""
                title={userPhrase.phrase.term}
                bind:submitted={submitted}
                submitHandler={submit}>
            <Label forId="translation" title={t("label.translation")}/>
            <TextInput
                    id="translation"
                    name="translation"
                    bind:value={translation}
                    maxLength="64"/>

            {#snippet footer()}
                <SubmitButton value={t("action.save")} disabled={submitted}/>
            {/snippet}
        </Form>
    </Modal>
{/if}