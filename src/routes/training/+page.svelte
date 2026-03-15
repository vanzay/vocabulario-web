<script lang="ts">
    import {onMount} from "svelte";
    import {t} from "$lib/i18n";
    import {getTrainingAPI} from "$lib/api/training";
    import {getDictionaryAPI} from "$lib/api/dictionary";
    import {handleClientError} from "$lib/errors";
    import {TrainingLevel} from "$lib/types";
    import {LinkButton} from "$lib/components/form";
    import LetterSet from "$lib/components/training/LetterSet.svelte";
    import SingleInput from "$lib/components/training/SingleInput.svelte";
    import LetterInput from "$lib/components/training/LetterInput.svelte";
    import ControlLink from "$lib/components/ControlLink.svelte";
    import InfoBox from "$lib/components/InfoBox.svelte";
    import PageHead from "$lib/components/PageHead.svelte";

    const {data} = $props();
    const mode = $derived(data.mode);
    const langIso2 = $derived(data.langIso2);
    const bookId = $derived(data.bookId);
    const accessToken = $derived(data.accessToken);
    const title = $derived(mode === "listening" ? t("training.listening.title") : t("training.writing.title"));

    let items: Array<any> = $derived(data.phrases);
    let level = $state(TrainingLevel.Single);
    let hintsCount = $state(0);
    let pronunciation: HTMLAudioElement | null = $state(null);
    let playing = $state(false);
    let answer = $state("");
    let answerHandled = $state(false);

    const loadData = async () => {
        const trainingAPI = getTrainingAPI({accessToken});
        try {
            return await trainingAPI.getPhrases(mode, langIso2, bookId);
        } catch (e) {
            await handleClientError(e);
        }
        return null;
    };

    onMount(() => {
        initPhrase();
    });

    const loadPronunciationUrl = async (phraseId: number) => {
        const dictionaryAPI = getDictionaryAPI({accessToken});  // TODO should be public on the backend side
        try {
            const {url} = await dictionaryAPI.getPronunciation(phraseId);
            return url;
        } catch (e) {
            await handleClientError(e);
        }
        return null;
    }

    const prepareAudio = (url: string) => {
        const audio = new Audio(url);
        audio.addEventListener("ended", () => playing = false);
        return audio;
    }

    const initPhrase = () => {
        if (!items || !items.length) {
            return;
        }

        level = TrainingLevel.Single;
        hintsCount = 0;
        answer = "";
        answerHandled = false;
        pronunciation = null;

        // TODO await?
        loadPronunciationUrl(items[0].phrase.id).then(url => {
            if (url) {
                pronunciation = prepareAudio(url);
                if (mode === "listening") {
                    playPronunciation();
                }
            } else {
                // TODO next phrase? next hint?
            }
        });


        if ((mode === "writing" && items[0].memoryProgress < 50)
            || (mode === "listening" && items[0].auditionProgress < 25)) {
            applyHint(false);
        }

        // TODO run timer (depending on progress), when time is out then increase hintsCount
        // progress [0..25] -> 25
        // progress [25..50] -> 20
        // progress [50..75] -> 15
        // progress [75..100] -> 10
    };

    const playPronunciation = () => {
        if (!pronunciation) {
            return;
        }

        playing = true;
        // TODO for Chrome you cant use .play() and .pause(). You must use .Play() and .Stop().
        pronunciation.play();
    }

    const applyHint = (manual: boolean) => {
        if (answerHandled) {
            return;
        }
        if (manual) {
            hintsCount = hintsCount + 1;
        }
        if (level == TrainingLevel.Single) {
            answer = "";
            level = TrainingLevel.Separated;
        } else if (level == TrainingLevel.Separated) {
            level = pronunciation ? TrainingLevel.Audio : TrainingLevel.Assembled;
        } else if (level == TrainingLevel.Audio) {
            playPronunciation();
        }
    }

    const handleFlow = async () => {
        if (answerHandled) {
            if (items.length > 1) {
                items = items.slice(1);
            } else {
                items = await loadData();
            }
            initPhrase();
        } else {
            await handleAnswer();
        }
    }

    const handleAnswer = async () => {
        answerHandled = true;

        if (mode === "writing") {
            playPronunciation();
        }

        const trainingAPI = getTrainingAPI({accessToken});
        try {
            const data = await trainingAPI.sendAnswer(items[0].phrase.id, answer, mode, hintsCount);
            // TODO data.points
        } catch (e) {
            await handleClientError(e);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Enter":
            case "Escape":
                e.preventDefault();
                handleFlow();
                break;
            case "Tab":
                e.preventDefault();
                applyHint(true);
                break;
        }
    }
</script>

<svelte:head>
    <title>{title} - Vocabulario</title>
</svelte:head>

{#if items && !items.length}
    <InfoBox
            title={title}
            description={t("training.take.break")}>
        <LinkButton href="/shelf">
            {t("training.try.another.book")}
        </LinkButton>
    </InfoBox>
{/if}

{#if items && items.length}
    <PageHead title={title}>
        <!--<h2 class="h2">Оставшееся время занятия: 24:35</h2>-->
    </PageHead>

    <div class="training-block">
        {#if mode === "writing"}
            <div class="translation-quest">{items[0].translation || "-"}</div>
        {:else if mode === "listening"}
            <div class="translation-quest">
                <img
                        src="/images/audio.png"
                        alt="&#x25B6;"
                        class="audio-play-btn"
                        style:opacity={playing ? 1 : 0.5}
                        onclick={playPronunciation}/>
            </div>
        {/if}

        <div class="answer-placeholder">
            {#if answerHandled && items[0].phrase.term !== answer}
                <div class="correct-answer">{items[0].phrase.term}</div>
            {/if}
            {#if !(answerHandled && items[0].phrase.term !== answer) && ![TrainingLevel.Single, TrainingLevel.Separated].includes(level)}
                <LetterSet phrase={items[0].phrase.term}/>
            {/if}
        </div>

        {#if level === TrainingLevel.Single}
            {#key items[0]}
                <SingleInput
                        readOnly={answerHandled}
                        bind:value={answer}
                        color={answerHandled ? (items[0].phrase.term === answer ? "#6C9" : "#FC575E") : ""}
                        keyDownHandler={handleKeyDown}/>
            {/key}
        {:else}
            {#key items[0]}
                <LetterInput
                        length={items[0].phrase.term.length}
                        readOnly={answerHandled}
                        bind:value={answer}
                        color={answerHandled ? (items[0].phrase.term === answer ? "#6C9" : "#FC575E") : ""}
                        keyDownHandler={handleKeyDown}/>
            {/key}
        {/if}

        <div class="learn_description study">&nbsp;</div>

        <ControlLink onclick={() => applyHint(true)}>
            <span class="shortcut">Tab</span>&nbsp;{t("training.hint")}
        </ControlLink>

        <div class="spacer"></div>

        <ControlLink onclick={handleFlow}>
            <span class="shortcut">Enter</span>&nbsp;{t("training.check.answer")}
        </ControlLink>

        <div class="spacer"></div>

        <ControlLink onclick={handleFlow}>
            <span class="shortcut">Esc</span>&nbsp;{t("training.skip")}
        </ControlLink>
    </div>
{/if}

<style>
    .training-block {
        display: block;
        width: 700px;
        margin: 20px auto 0 auto;
        border: 1px solid #f0e0d0;
        background-color: #fff6c6;
        border-radius: 5px;
        text-align: center;
        padding: 20px 20px 30px;
    }

    .training-block .translation-quest {
        margin-bottom: 20px;
        font-size: 24px;
        line-height: 32px;
    }

    .training-block .audio-play-btn {
        height: 32px;
        cursor: pointer;
        opacity: 0.5;
    }

    .training-block .answer-placeholder {
        height: 30px;
        margin-bottom: 20px;
    }

    .training-block .correct-answer {
        color: #6C9;
        font-size: 24px;
    }

    .learn_description {
        margin-top: 10px;
        font-family: Verdana, Geneva, sans-serif;
        color: #888;
        font-size: 11px;
        line-height: 16px;
    }

    .learn_description.study {
        margin-bottom: 20px;
    }

    .spacer {
        display: inline-block;
        width: 1px;
        height: 20px;
        margin-right: 12px;
        margin-bottom: -6px;
        margin-left: 12px;
        background-color: #f0e0d0;
        font-size: 12px;
        line-height: 16px;
    }

    .shortcut {
        cursor: pointer;
        display: inline-block;
        height: 18px;
        margin-right: 2px;
        padding-right: 5px;
        padding-left: 5px;
        border-bottom: 1px solid silver;
        border-radius: 3px;
        background-color: #e0e0e0;
        color: #444;
        font-size: 10px;
    }
</style>