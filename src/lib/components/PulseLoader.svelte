<script lang="ts">
    const {color = "#4dce68", size = "15px", margin = "2px"} = $props();
</script>

<div class="loader">
    {#each [1, 2, 3] as index}
        <span class="circle anim{index}"
              style:background-color={color}
              style:width={size}
              style:height={size}
              style:margin={margin}>
        </span>
    {/each}
</div>

<style>
    .loader {
        margin-top: 10px;
        text-align: center;
        width: 100%;
    }

    .circle {
        border-radius: 100%;
        display: inline-block;
        animation-fill-mode: both;
    }

    .circle.anim1 {
        animation: circle-anim 0.72s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .circle.anim2 {
        animation: circle-anim 0.72s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    .circle.anim3 {
        animation: circle-anim 0.72s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    }

    @keyframes circle-anim {
        0% {
            transform: scale(1);
            opacity: 1
        }
        45% {
            transform: scale(0.1);
            opacity: 0.7
        }
        80% {
            transform: scale(1);
            opacity: 1
        }
    }
</style>
