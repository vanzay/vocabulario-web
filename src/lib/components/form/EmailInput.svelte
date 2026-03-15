<script lang="ts">
    let {value = $bindable(), ...props} = $props();
</script>

<input
        class="input"
        type="email"
        bind:value={value}
        {...props}
/>
