<template>
    <div>
        <h1>Hello App!</h1>
        <h2>I have {{ $store.state.money }}</h2>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import gamePage from "./views/GameView.vue";
    import shop from "./views/ShopView.vue";

    import Vue from "vue";

    @Component({
        components: {
            gamePage,
            shop,
        },
    })
    export default class App extends Vue {
        public name = "App";
        public show = true;
    }
</script>

<style scoped></style>
