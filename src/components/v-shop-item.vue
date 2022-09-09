<template>
    <div class="v-shop-item" :style="shopStyle">
        {{ shopItem.sentence }}
        <button class="buyButton" @click="buy()">
            upgrade for {{ price | prettyNumber }} $
        </button>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import { prettyNumber } from "@/utils/utils";
    import { Prop } from "vue-property-decorator";
    import { ShopItem } from "@/models/shop-item";
    import { store } from "@/store";
    import Vue, { PropType } from "vue";

    @Component
    export default class extends Vue {
        @Prop({ required: true, type: Object as PropType<ShopItem> })
        protected readonly shopItem!: ShopItem;

        protected buy(): void {
            if (store.state.money >= this.price) {
                store.commit("changeMoney", -this.price);
                this.shopItem.buyFunction();
            }
        }

        protected get color(): string {
            return store.state.money >= this.price ? "green" : "red";
        }

        protected get prettyPrice(): string {
            return prettyNumber(this.price);
        }

        protected get price(): number {
            return ShopItem.price(this.shopItem);
        }

        protected get shopStyle(): {
            "--buyColor": string;
        } {
            return {
                "--buyColor": `var(--${this.color})`,
            };
        }
    }
</script>

<style scoped>
    .buyButton {
        background-color: var(--buyColor);
    }

    .v-shop-item {
        --buyColor: #b99d42;
        border: 10px solid transparent;
    }
</style>
