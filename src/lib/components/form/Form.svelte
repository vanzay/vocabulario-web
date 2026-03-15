<script lang="ts">
    import type {ActionResult} from "@sveltejs/kit";
    import {applyAction, deserialize} from "$app/forms";
    import {invalidateAll} from "$app/navigation";
    import {handleClientError} from "$lib/errors";

    let {
        submitted = $bindable(),
        action,
        children,
        footer,
        title = null,
        errorMessage = null,
        checkHandler = null,
        submitHandler = null
    } = $props();

    async function handleNativeSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        const data = new FormData(event.currentTarget, event.submitter);

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data
        });

        const result: ActionResult = deserialize(await response.text());

        if (result.type === "success") {
            await invalidateAll();
        }

        await applyAction(result);
    }

    async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        event.preventDefault();

        if (submitted) {
            return;
        }

        const error = checkHandler && checkHandler();
        if (error) {
            errorMessage = error;
            return;
        }

        errorMessage = null;
        submitted = true;

        if (submitHandler) {
            try {
                await submitHandler();
            } catch (e) {
                await handleClientError(e);
            }
        } else {
            await handleNativeSubmit(event);
        }

        submitted = false;
    }
</script>

<div class="form-upload">
    {#if title}
        <h3 class="form-head">{title}</h3>
    {/if}

    {#if errorMessage}
        <div class="form-error">
            {errorMessage}
        </div>
    {/if}

    <form
            method="POST"
            action={action}
            onsubmit={handleSubmit}>
        {@render children()}

        {#if footer}
            <div class="form_bottom">
                {@render footer()}
            </div>
        {/if}
    </form>
</div>

<style>
    .form-upload {
        display: block;
        width: 440px;
        margin: 10% auto 0;
        padding: 15px 20px 6px;
        border: 1px solid #f9f9f9;
        border-radius: 10px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 7px 0 rgba(0, 0, 0, .2);
    }

    .form-head {
        margin-top: 0;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px dotted silver;
        font-weight: 400;
        text-align: center;
    }

    .form-error {
        margin: 10px 0;
        padding: 10px;
        background-color: #ffdede;
        text-align: center;
    }

    .form_bottom {
        height: 60px;
        margin-top: 25px;
        padding-top: 10px;
        border-top: 1px dotted silver;
        text-align: center;
    }
</style>