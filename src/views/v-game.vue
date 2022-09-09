<template>
    <v-list class="v-game-view" :items="bots">
        <template #item="{ item }">
            <v-bot :bot="item" />
        </template>
    </v-list>
</template>

<script lang="ts">
    import { Bot } from "@/models/bot";
    import Component from "vue-class-component";
    import { State } from "vuex-class";
    import VBot from "@/components/v-bot.vue";
    import VList from "@/components/v-list.vue";
    import Vue from "vue";

    @Component({
        components: {
            "v-bot": VBot,
            "v-list": VList,
        },
    })
    export default class extends Vue {
        @State protected bots!: Bot[];
    }
</script>

<style scoped>
    .v-game-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
    }
</style>
