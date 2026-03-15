<script lang="ts">
    import {notifications} from "$lib/notification";

    import Notification from "./Notification.svelte";
</script>

{#if $notifications.length}
    <div class="notifications">
        {#each [...$notifications] as notification (notification.id)}
            <Notification message={notification.message}/>
        {/each}
    </div>
{/if}

<style>
    .notifications {
        position: fixed;
        width: 25%;
        min-width: 300px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 18px;
        z-index: 5000;
    }
</style>