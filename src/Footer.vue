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
            copyright: '&copy; Asad Nur, 2022. All rights reserved.',
        }
    }
}
</script>

<style scoped>
    #footer {
        text-align: center;
    }
</style>
