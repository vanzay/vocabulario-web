<script lang="ts">
    let {value = $bindable(), ...props} = $props();
</script>

<input
        class="input"
        type="text"
        bind:value={value}
        {...props}
/>
