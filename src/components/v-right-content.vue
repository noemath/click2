<template>
    <div class="v-right-content">
        <div class="header">Make money !</div>

        <div class="page-content">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from "vue";

    @Component
    export default class extends Vue {}
</script>

<style scoped>
    .v-right-content {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header {
        justify-content: center;
        display: flex;
        width: 90%;
        height: 10vh;
    }

    .page-content {
        justify-content: center;
        display: flex;
        flex-direction: column;
        width: 90%;
        min-height: 85vh;
    }
</style>
