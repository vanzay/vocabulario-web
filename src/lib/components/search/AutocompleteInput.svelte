<script lang="ts">
    let {value = $bindable(), loadItems, buildItem, finishHandler, ...props} = $props();

    let items: Array<any> = $state([]);
    let activeItem = $state(-1);

    let inputElement: HTMLInputElement;

    const handleInput = async () => {
        value = inputElement.value;

        if (value.length < 3) {
            return;
        }

        // TODO delay + abort previous
        try {
            const data = await loadItems(value);
            activeItem = -1;
            items = data;
        } catch (e) {
            console.error(e);
        }
    };

    const close = () => {
        items = [];
    }

    const handleFinish = (newValue: string) => {
        value = newValue;
        finishHandler();
        close();
    }

    const handleItemClick = (e: MouseEvent) => {
        const target = e.target as HTMLSpanElement;
        handleFinish(target.innerText);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Escape":
                close();
                break;
            case "Enter":
                handleFinish(activeItem >= 0 ? buildItem(items[activeItem]) : inputElement.value);
                break;
            case "ArrowUp":
                if (activeItem > 0) {
                    activeItem = activeItem - 1;
                }
                break;
            case "ArrowDown":
                if (activeItem + 1 < items.length) {
                    activeItem = activeItem + 1;
                }
                break;
        }
    };
</script>

<input bind:this={inputElement}
       class="input autocomplete"
       type="text"
       value={value}
       oninput={handleInput}
       onkeydown={handleKeyDown}
       onmouseenter={() => activeItem = -1}
       {...props}
/>

{#if items.length}
    <div
            class="suggestions"
            style:width={`${inputElement.clientWidth}px`}>
        {#each items as item, index}
        <span
                class="suggestion"
                class:active={index === activeItem}
                onclick={handleItemClick}
                onmouseenter={() => activeItem = index}>
            {buildItem(item)}
        </span>
        {/each}
    </div>
{/if}

<style>
    .suggestions {
        position: fixed;
        background-color: white;
        border: 1px solid #c5c5c5;
        margin-top: 25px;
        max-height: 150px;
        overflow-y: auto;
        z-index: 1000;
    }

    .suggestion {
        padding: 5px;
        display: block;
    }

    .suggestion.active {
        background-color: #ededed;
        cursor: pointer;
    }

    .autocomplete {
        width: 90%;
        margin-left: 0;
        float: left;
    }
</style>