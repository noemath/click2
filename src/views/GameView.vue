<script lang="ts">
    import botTemplate from "../components/BotTemplate.vue";

    import Component from "vue-class-component";
    import json from "../components/botData.json";
    import Vue from "vue";

    @Component({
        components: {
            botTemplate,
        },
    })
    export default class App extends Vue {
        public botDatas = json;
        public show = true;

        public increment(num: number): void {
            this.$store.commit("increment", {
                amount: num,
            });
        }
    }
</script>

<template>
    <div>
        <div class="header">
            my money is
            <button @click="increment(1000)">{{ $store.state.money }}</button>
        </div>
        <div class="border-center">
            <div class="botArea">
                <botTemplate
                    v-for="botData in botDatas"
                    :key="botData.name"
                    :key2="botData.name"
                    :firstprice="botData.firstprice"
                    :firsttime="botData.firsttime"
                    :firstproduct="botData.firstproduct"
                    :increment="increment"
                ></botTemplate>
            </div>
        </div>
        <router-link to="/shop"> shop</router-link>
        <div v-if="show">coucou</div>
        <button @click="show = !show">click</button>
    </div>
</template>

<style>
    .botArea {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 80%;
    }

    .border-center {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-to {
        opacity: 1;
    }

    .fade-enter-active {
        transition: opacity 1s ease;
    }
</style>
