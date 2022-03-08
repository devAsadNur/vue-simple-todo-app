<template>
    <footer id="footer">
        <p>&copy; {{ copyright }}</p>
    </footer>
</template>

<script>
export default {
    name: 'app-footer',
    data() {
        return {
            copyright: 'Asad Nur, 2022. All rights reserved.',
        }
    }
}
</script>

<style scoped>
    #footer {
        text-align: center;
    }
</style>
