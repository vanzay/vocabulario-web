<script lang="ts">
    import {page} from "$app/state";
    import {PUBLIC_MAX_FILE_SIZE, PUBLIC_SUPPORTED_FORMATS} from "$env/static/public";
    import {t} from "$lib/i18n";
    import {getShelfAPI} from "$lib/api/shelf";
    import {FileButton, Form, Label, SubmitButton, TextInput} from "$lib/components/form";
    import Modal from "$lib/components/Modal.svelte";
    import PulseLoader from "$lib/components/PulseLoader.svelte";

    const {open, closeHandler, successUploadHandler} = $props();
    const supportedFormats = PUBLIC_SUPPORTED_FORMATS.split(",").map(f => f.toUpperCase()).join(", ");
    const accessToken = $derived(page.data.accessToken);

    let submitted = $state(false);
    let title = $state("");
    let files: FileList | null = $state(null);

    const checkForm = () => {
        if (!files || !files.length) {
            return t("file.cant.be.empty");
        }

        if (!isFileFormatSupported(files[0].name)) {
            return t("wrong.file.type", {"formats": supportedFormats});
        }

        const maxSize = parseInt(PUBLIC_MAX_FILE_SIZE);
        if (typeof FileReader !== "undefined" && files[0].size > maxSize) {
            return t("max.file.size", {"maxSize": maxSize / (1024 * 1024)});
        }

        return null;
    }

    const isFileFormatSupported = (filename: string) => {
        const filenameParts = filename.match(/^.+\.(.+)$/);
        if (filenameParts && filenameParts.length === 2) {
            const ext = filenameParts[1].toLowerCase();
            return PUBLIC_SUPPORTED_FORMATS.split(",").includes(ext);
        }
        return false;
    }

    const submit = async () => {
        const shelfAPI = getShelfAPI({accessToken});
        const book = await shelfAPI.uploadBook(title, files[0]);
        successUploadHandler(book);
        title = "";
        files = null;
    }
</script>

{#if open}
    <Modal closeHandler={closeHandler}>
        <Form
                action=""
                title={t("shelf.upload.title")}
                bind:submitted={submitted}
                checkHandler={checkForm}
                submitHandler={submit}>
            <Label forId="title" title={t("label.book.title")}/>
            <TextInput
                    id="title"
                    bind:value={title}
                    readonly={submitted}
                    maxLength="128"/>

            <!--<Label forId="author" title={t("label.book.author")}/>-->
            <!--<TextInput id="author"/>-->

            <!--<input id="translated" type="checkbox" value="1"/>-->
            <!--<Label forId="translated" title={t("label.book.is.translation")}/>-->

            <!--<Label forId="cover_url" title={t("label.book.cover.url")}/>-->
            <!--<TextInput id="cover_url" placeholder="http://"/>-->

            <!--<Label forId="content_url" title={t("label.book.content.url")}/>-->
            <!--<TextInput id="content_url" placeholder="http://"/>-->

            <!--<Label forId="audio_content_url" title={t("label.book.audio.content.url")}/>-->
            <!--<TextInput id="audio_content_url" placeholder="http://"/>-->

            <Label forId="content" title={t("label.book.content", {"formats": supportedFormats})}/>
            <!--<Hint text="Укажите URL файла:"/>-->
            <!--<TextInput id="URL" placeholder="http://"/>-->
            <!--<Hint text="Или загрузите текст с вашего компьютера"/>-->
            <div class="file_chooser">
                <FileButton
                        id="content"
                        disabled={submitted}
                        bind:files={files}>
                    <span>{t("action.choose.file")}</span>
                </FileButton>
                {#if files && files.length > 0}
                    {files[0].name}
                {/if}
            </div>

            {#if submitted}
                <PulseLoader/>
            {/if}

            {#snippet footer()}
                <SubmitButton value={t("action.upload")} disabled={submitted}/>
            {/snippet}
        </Form>
    </Modal>
{/if}

<style>
    .file_chooser {
        margin-top: 10px;
    }
</style>