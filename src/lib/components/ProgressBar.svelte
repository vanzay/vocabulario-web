<script lang="ts">
    const {progress, fillColor} = $props();
</script>

<div class="progress_bar">
    <div class="progress_bar_fill"
         style:background-color={fillColor}
         style:width={`${progress}%`}>
    </div>
</div>

<style>
    .progress_bar {
        height: 2px;
        margin-top: 2px;
        margin-bottom: 2px;
        background-color: #e0e0e0;
    }

    .progress_bar_fill {
        height: 2px;
    }
</style>