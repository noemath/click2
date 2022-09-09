import { Bot } from "@/models/bot";
import { ShopItem } from "@/models/shop-item";
import Vue from "vue";
import Vuex from "vuex";
import {
    FIRST_CLICK_MONEY,
    FIRST_CLICK_PRICE,
    FIRST_MONEY,
} from "@/data/constants";

Vue.use(Vuex);

export enum EShopItemType {
    AutoBot = 0,
    UpgradeTime = 8,
    UpgradePrice = 6,
    UpgradeProduct = 4,
}

interface IShop {
    autoBotAisle: ShopItem[];
    upgradeAisle: ShopItem[];
}

interface IState {
    bots: Bot[];
    clickMoney: number;
    clickPrice: number;
    money: number;
    shop: IShop;
}

const store = new Vuex.Store<IState>({
    mutations: {
        addBot(
            state,
            payload: {
                key: number;
                price: number;
                product: number;
                time: number;
            }
        ): void {
            state.bots.push(
                new Bot(
                    payload.key,
                    payload.price,
                    payload.product,
                    payload.time
                )
            );
        },
        addShopItemAutoBot(state, key: number): void {
            state.shop.autoBotAisle.push(
                new ShopItem(key, key, EShopItemType.AutoBot)
            );
        },
        addShopItemUpgrade(
            state,
            payload: {
                botKey: number;
                myKey: number;
                shopItemType: EShopItemType;
            }
        ): void {
            state.shop.upgradeAisle.push(
                new ShopItem(
                    payload.botKey,
                    payload.myKey,
                    payload.shopItemType
                )
            );
        },
        changeMoney(state, amount: number): void {
            state.money += amount;
        },
        removeAutoBot(state, key: number): void {
            state.shop.autoBotAisle.splice(
                state.shop.autoBotAisle.findIndex(
                    (element): boolean => element.botKey === key
                ),
                1
            );
        },
        setClickMoney(state, money: number): void {
            state.clickMoney = money;
        },
        setClickPrice(state, price: number): void {
            state.clickPrice = price;
        },
    },
    state: {
        bots: [],
        clickMoney: FIRST_CLICK_MONEY,
        clickPrice: FIRST_CLICK_PRICE,
        money: FIRST_MONEY,
        shop: {
            autoBotAisle: [],
            upgradeAisle: [],
        },
    },
});

export { store, IState, IShop };
