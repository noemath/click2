<template>
    <div class="v-left-nav">
        <div @click="incrementMoney">{{ money | prettyNumber }} $</div>

        <div v-if="isGame">
            <router-link to="/shop">shop</router-link>
        </div>
        <div v-else>
            <router-link to="/">game</router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import { State } from "vuex-class";
    import { store } from "../store";
    import Vue from "vue";

    @Component
    export default class extends Vue {
        @State protected readonly clickMoney!: number;
        @State protected readonly money!: number;

        protected get isGame(): boolean {
            return this.$route.name === "game";
        }

        protected incrementMoney(): void {
            store.commit("changeMoney", this.clickMoney);
        }
    }
</script>

<style scoped>
    .v-left-nav {
        width: 10%;
        display: flex;
        flex-direction: column;
    }
</style>
