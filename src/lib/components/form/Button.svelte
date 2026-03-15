<script lang="ts">
    const {children, type = "first", disabled = false, ...props} = $props();
</script>

<span
        class={`btn_upload ${type}`}
        class:btn-disabled={disabled}
        {...props}>
    {@render children()}
</span>

<style>
    .btn_upload {
        display: inline-block;
        cursor: pointer;
        height: 26px;
        padding: 2px 10px 3px;
        border-style: solid;
        border-width: 1px 1px 2px;
        border-color: silver;
        border-radius: 16px;
        background-image: -webkit-linear-gradient(90deg, #e0e0e0, #f9f9f9);
        background-image: linear-gradient(0deg, #e0e0e0, #f9f9f9);
        box-shadow: inset 0 -1px 0 0 #e9e9e9, inset 0 1px 0 0 #fff, 0 1px 3px 0 rgba(0, 0, 0, .15);
        line-height: inherit;
        color: #444;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 11px;
        text-align: center;
        text-decoration: none;
    }

    .btn_upload:hover {
        background-image: -webkit-linear-gradient(90deg, #e9e9e9, #fff);
        background-image: linear-gradient(0deg, #e9e9e9, #fff);
        box-shadow: inset 0 -1px 0 0 #f0f0f0, inset 0 1px 0 0 #fff, 0 2px 5px 0 rgba(0, 0, 0, .15);
    }

    .btn_upload.first {
        min-width: 160px;
        margin-right: 15px;
    }

    .btn_upload.last_control {
        min-width: 160px;
    }
</style>