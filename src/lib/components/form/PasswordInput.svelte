<script lang="ts">
    let {value = $bindable(), ...props} = $props();
</script>

<input
        class="input"
        type="password"
        bind:value={value}
        {...props}
/>
