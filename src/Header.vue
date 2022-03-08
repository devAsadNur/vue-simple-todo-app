<template>
    <header id="header">
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    name: 'app-header',
    data() {
        return {
            title: 'Simple Todo App with Vue',
        }
    }
}
</script>

<style scoped>
    #header {
        text-align: center;
        margin: 0 auto 40px;
    }
</style>
