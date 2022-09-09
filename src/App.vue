<template>
    <div id="app">
        <v-left-nav />

        <v-right-content />
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import json from "./data/bot-data.json";
    import VLeftNav from "@/components/v-left-nav.vue";
    import VRightContent from "@/components/v-right-content.vue";
    import Vue from "vue";
    import { EShopItemType, store } from "@/store";

    @Component({
        components: {
            "v-left-nav": VLeftNav,
            "v-right-content": VRightContent,
        },
    })
    export default class extends Vue {
        protected botsData: { price: number; product: number; time: number }[] =
            json;

        protected created(): void {
            let key = 0;
            for (const [INDEX, botData] of this.botsData.entries()) {
                store.commit("addBot", {
                    key: INDEX,
                    price: botData.price,
                    product: botData.product,
                    time: botData.time,
                });

                store.commit("addShopItemAutoBot", INDEX);

                for (const TYPE in EShopItemType) {
                    if (
                        !isNaN(Number(TYPE)) &&
                        Number(TYPE) !== EShopItemType.AutoBot
                    ) {
                        store.commit("addShopItemUpgrade", {
                            botKey: INDEX,
                            myKey: key,
                            shopItemType: Number(TYPE),
                        });
                        key += 1;
                    }
                }
            }
        }
    }
</script>

<style>
    #app {
        --green: #42b983;
        --red: #b94242;
        display: flex;
        flex-direction: row;
        min-height: 95vh;
    }
</style>
