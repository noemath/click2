import { store } from "@/store";
import Vue from "vue";
import { HUNDRED, PRICE_RAISE } from "@/data/constants";

class Bot {
    private _actualTime: number;
    private _endTime: number;
    private readonly _firstProduct: number;
    private _haveAutoBot: boolean;
    private _key: number;
    private _level: number;
    private _percentStart: number;
    private _price: number;
    private _product: number;
    private _show: boolean;
    private _time: number;
    private _timeoutId: number;

    public constructor(
        key: number,
        price: number,
        product: number,
        time: number
    ) {
        this._key = key;
        this._haveAutoBot = false;
        this._endTime = -1;
        this._firstProduct = product;
        this._level = 0;
        this._percentStart = 0;
        this._price = price;
        this._product = product;
        this._show = false;
        this._actualTime = 0;
        this._time = time;
        this._timeoutId = -1;
    }

    public startMiddleAnim(): void {
        if (this._timeoutId !== -1) {
            this._actualTime = this._endTime - Date.now();
            this._percentStart =
                ((this._time - this._actualTime) / this._time) * HUNDRED;
            this._show = false;

            Vue.nextTick((): void => {
                this._show = true;
            });
        } else if (this._haveAutoBot && this._level > 0) {
            this.startLoop();
        }
    }

    protected addLvl(): void {
        if (store.state.money >= this._price) {
            store.commit("changeMoney", -this._price);
            this._level += 1;
            this._price = Math.floor(this._price * PRICE_RAISE + 1);
            if (this._level === 1 && this._haveAutoBot) this.startLoop();
        }
    }

    protected buttonStartLoop(): void {
        if (!this._haveAutoBot && this._level > 0 && this._timeoutId === -1) {
            this.startLoop();
        }
    }

    private endLoop(): void {
        this._timeoutId = -1;
        this._percentStart = 0;
        this._actualTime = this._time;
        this._show = false;
        store.state.money += this._product * this._level;

        if (this._haveAutoBot) {
            Vue.nextTick((): void => {
                this.startLoop();
            });
        }
    }

    private startLoop(): void {
        this._endTime = Date.now() + this._actualTime;

        this._show = true;
        this._timeoutId = setTimeout((): void => {
            this.endLoop();
        }, this._actualTime);
    }

    public get actualTime(): number {
        return this._actualTime;
    }

    public set actualTime(value: number) {
        this._actualTime = value;
    }

    public get firstProduct(): number {
        return this._firstProduct;
    }

    public get haveAutoBot(): boolean {
        return this._haveAutoBot;
    }

    public set haveAutoBot(value: boolean) {
        this._haveAutoBot = value;
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

    public get percentStart(): number {
        return this._percentStart;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get product(): number {
        return this._product;
    }

    public set product(value: number) {
        this._product = value;
    }

    public get show(): boolean {
        return this._show;
    }

    public get time(): number {
        return this._time;
    }

    public set time(value: number) {
        this._time = value;
    }
}

export { Bot };
