<script lang="ts">
    import {t} from "$lib/i18n";
    import ProgressBar from "$lib/components/ProgressBar.svelte";

    const {book, showStats = false, showProgress = false, totalPhrases = 0, comfort = 0} = $props();
</script>

<div class="book_my">
    {#if book.coverUrl}
        <a href={"/book/info/" + book.id}>
            <div class="book-cover">
                <img src={book.coverUrl} alt={book.title}/>
            </div>
        </a>
    {:else}
        <div class="paper">
            <a href={"/book/info/" + book.id} class="cover">
                <div class="title_block">
                    <div class="title">{book.title.length > 60 ? book.title.substring(0, 50) + "..." : book.title}</div>
                </div>
                <div class="author">{book.author}</div>
            </a>
        </div>
    {/if}

    <div class="progress">
        {#if book.coverUrl}
            <a href={"/book/info/" + book.id}>{book.title}</a>
            <div class="words"><i>{book.author}</i></div>
            <br/>
        {/if}

        {#if showStats}
            <div class="words">{t("book.info.language")}: <b>{t("lang.native." + book.language)}</b></div>
            <div class="words">{t("book.info.total.phrases")}: <b>{book.totalWords}</b></div>
            <div class="words">{t("book.info.unique.phrases")}: <b>{book.uniqueGroups}</b></div>
        {/if}

        {#if showProgress}
            <div class="percent">{t("label.comfort") + ": " + comfort + "%"}</div>
            <ProgressBar progress={comfort}
                         fillColor={comfort >= 75 ? "#1a3" : (comfort >= 50 ? "#a91" : "#a31")}/>
            <div class="words">{t("shelf.book.progress", {
                added: totalPhrases,
                uniqueGroups: book.uniqueGroups
            })}</div>
        {/if}
    </div>
</div>

<style>
    .book_my {
        width: 20%;
        padding: 15px 30px 15px 0;
        display: inline-table;
    }

    .book-cover {
        height: 180px;
        background-color: #fafafa;
        color: #444;
        text-align: center;
        text-decoration: none;
    }

    .book-cover img {
        border-radius: 5px;
        height: 180px;
    }

    .paper {
        margin-bottom: 10px;
        padding-right: 3px;
        border-radius: 5px 3px 3px 5px;
        box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .2);
    }

    .cover {
        display: block;
        height: 180px;
        padding-top: 38px;
        padding-right: 10px;
        padding-left: 10px;
        border-left: 5px solid #f0e0d0;
        border-radius: 5px 2px 2px 5px;
        background-color: #fff0c0;
        box-shadow: 1px 0 1px 0 rgba(0, 0, 0, .15);
        -webkit-perspective-origin: 100% 50%;
        perspective-origin: 100% 50%;
        -webkit-transition: all 150ms ease-out;
        transition: all 150ms ease-out;
        color: #444;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }

    .cover:hover {
        background-color: #fff6c6;
        box-shadow: 1px 0 1px 0 rgba(0, 0, 0, .15), 0 0 6px 0 #fff6c6;
        -webkit-perspective: 900px;
        perspective: 900px;
        -webkit-perspective-origin: 0 50%;
        perspective-origin: 0 50%;
        -webkit-transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg) translate(0px, 0px) translate3d(0px, 0px, 18px);
        transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg) translate(0px, 0px) translate3d(0px, 0px, 18px);
    }

    .cover.edit {
        padding-top: 12px;
        background-color: #fff6c6;
        cursor: default;
    }

    .cover.edit:hover {
        box-shadow: 1px 0 1px 0 rgba(0, 0, 0, .15);
        -webkit-transform: none;
        -ms-transform: none;
        transform: none;
    }

    .title_block {
        height: 108px;
    }

    .title {
        padding: 5px 10px;
        border-style: dashed;
        border-width: 1px;
        border-color: rgba(0, 0, 0, .15);
        border-radius: 4px;
        line-height: 20px;
        font-weight: 400;
    }

    .author {
        font-family: Verdana, Geneva, sans-serif;
        color: #888;
        font-size: 11px;
    }

    .words {
        color: #888;
        font-size: 10px;
        line-height: 14px;
    }

    .percent {
        color: #444;
        font-size: 12px;
        line-height: 18px;
    }

    .progress {
        padding-right: 13px;
        padding-left: 15px;
        font-family: Verdana, Geneva, sans-serif;
        color: #666;
        font-size: 11px;
    }

    .progress a {
        color: #08c;
        text-decoration: none;
        font-weight: bold;
    }
</style>