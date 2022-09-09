<template>
    <div class="v-shop-view">
        <v-list v-for="(aisle, i) in shops" :items="aisle" :key="i">
            <template #item="{ item }">
                <v-shop-item :shopItem="item" />
            </template>
        </v-list>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import { IShop } from "@/store";
    import { ShopItem } from "@/models/shop-item";
    import { State } from "vuex-class";
    import VList from "@/components/v-list.vue";
    import VShopItem from "@/components/v-shop-item.vue";
    import Vue from "vue";

    function compareUpgrades(previous: ShopItem, next: ShopItem): number {
        return ShopItem.price(previous) - ShopItem.price(next);
    }

    function isListNotEmpty(list: any[]): boolean {
        return list.length !== 0;
    }
    @Component({
        components: {
            "v-list": VList,
            "v-shop-item": VShopItem,
        },
    })
    export default class extends Vue {
        @State protected shop!: IShop;

        protected get autoBotAisle(): ShopItem[] {
            return this.shop.autoBotAisle;
        }

        protected get upgradeAisle(): ShopItem[] {
            return this.shop.upgradeAisle.sort(compareUpgrades);
        }

        protected get shops(): ShopItem[][] {
            return [this.upgradeAisle, this.autoBotAisle].filter(
                isListNotEmpty
            );
        }
    }
</script>

<style scoped>
    .v-shop-view {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        justify-content: space-between;
    }
</style>
