import { Bot } from "@/models/bot";
import { EShopItemType, store } from "@/store";
import { HUNDRED, TEN, TWO } from "@/data/constants";

class ShopItem {
    private _bot!: Bot;
    private _botKey: number;
    private readonly _buyFunction: () => void;
    private _key: number;
    private _level: number;
    private readonly _sentence: string;
    private readonly _shopItemType: EShopItemType;

    public constructor(
        botKey: number,
        key: number,
        shopItemType: EShopItemType
    ) {
        this._botKey = botKey;
        this._level = 1;
        this._bot = store.state.bots[botKey];
        this._shopItemType = shopItemType;
        this._sentence = this.findSentence();
        this._buyFunction = this.findFunction();
        this._key = key;
    }

    public static price(shopItem: ShopItem): number {
        if (shopItem.shopItemType === EShopItemType.AutoBot) {
            return shopItem.bot.product * HUNDRED;
        }

        return (
            shopItem.bot.firstProduct *
            HUNDRED *
            Math.pow(TEN, shopItem.level) *
            shopItem.shopItemType
        );
    }

    public findFunction(): () => void {
        if (this._shopItemType === EShopItemType.AutoBot)
            return (): void => {
                this._bot.haveAutoBot = true;
                store.commit("removeAutoBot", this._botKey);
            };

        return (): void => {
            switch (this._shopItemType) {
                case EShopItemType.UpgradeTime:
                    this._bot.time = Math.floor(this._bot.time / TWO);
                    break;
                case EShopItemType.UpgradeProduct:
                    this._bot.product *= TWO;
                    break;
                default:
                    this._bot.price = Math.floor(this._bot.price / TWO);
            }

            this._level += 1;
        };
    }

    public findSentence(): string {
        switch (this._shopItemType) {
            case EShopItemType.AutoBot:
                return `AutoBot for Bot number ${this._botKey}`;
            case EShopItemType.UpgradeProduct:
                return `Double the production for Bot number ${this._botKey}`;
            default:
                return `Divide by two the ${
                    this._shopItemType === EShopItemType.UpgradeTime
                        ? "time"
                        : "price"
                } for Bot number ${this._botKey}`;
        }
    }

    public get bot(): Bot {
        return this._bot;
    }

    public get botKey(): number {
        return this._botKey;
    }

    public set botKey(value: number) {
        this._botKey = value;
    }

    public get buyFunction(): () => void {
        return this._buyFunction;
    }

    public get key(): number {
        return this._key;
    }

    public set key(value: number) {
        this._key = value;
    }

    public get level(): number {
        return this._level;
    }

    public set level(value: number) {
        this._level = value;
    }

    public get sentence(): string {
        return this._sentence;
    }

    public get shopItemType(): EShopItemType {
        return this._shopItemType;
    }
}

export { ShopItem };
