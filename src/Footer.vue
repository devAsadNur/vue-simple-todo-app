<template>
    <footer id="footer">
        <p>{{ copyright }}</p>
    </footer>
</template>

<script>
export default {
    name: 'app-footer',
    data() {
        return {
            copyright: 'All rights reserved.',
        }
    }
}
</script>

<style>
    #footer {
        text-align: center;
    }
</style>
