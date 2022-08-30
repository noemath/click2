<script lang="ts">
    import Component from "vue-class-component";
    import { Prop } from "vue-property-decorator";
    import { store } from "@/store";
    import Vue from "vue";

    const PRICE_RAISE = 1.01;
    const HUNDRED = 100;

    @Component
    export default class BotTemplate extends Vue {
        @Prop({ required: true, type: Number }) public firstprice!: number;
        @Prop({ required: true, type: Number }) public firstproduct!: number;
        @Prop({ required: true, type: Number }) public firsttime!: number;
        @Prop({ required: true, type: Function }) public increment!: (
            a: number
        ) => void;

        @Prop({ required: true, type: Number }) public key2!: number;

        public percentStart = 0;
        public price = 0;
        public product = 0;
        public show = false;
        public tempTime = 0;
        public time = 0;

        public addEverySec(): void {
            this.percentStart = 0;
            this.tempTime = this.firsttime;
            this.increment(this.product * store.state.levels[this.key2]);
            this.show = false;
            this.$nextTick((): void => {
                this.launchTimeout();
            });
        }

        public addLvl(): void {
            if (store.state.money < this.price) return;
            this.increment(-this.price);
            this.$store.commit("addLevel", {
                key: this.key2,
            });
            this.price =
                this.price * PRICE_RAISE - ((this.price * PRICE_RAISE) % 1) + 1;
            if (store.state.levels[this.key2] === 1) {
                this.launchTimeout();
            }
        }

        public get color(): string {
            return store.state.money >= this.price ? "#42b983" : "#b94242";
        }

        public created(): void {
            this.price = this.firstprice;
            this.tempTime = this.firsttime;
            this.time = this.firsttime;
            this.product = this.firstproduct;
        }

        public launchTimeout(): void {
            this.$store.commit("setEndTimes", {
                key: this.key2,
                time: Date.now() + this.tempTime,
            });
            this.show = true;
            this.$store.commit("setIds", {
                id: setTimeout((): void => this.addEverySec(), this.tempTime),
                key: this.key2,
            });
        }

        public mounted(): void {
            if (store.state.levels[this.key2] >= 1) {
                if (store.state.timeoutIDs[this.key2] !== -1) {
                    clearTimeout(store.state.timeoutIDs[this.key2]);
                    this.tempTime =
                        store.state.endTimes[this.key2] - Date.now();
                    this.percentStart =
                        ((this.time - this.tempTime) / this.time) * HUNDRED;
                }
                this.launchTimeout();
            }
        }
    }
</script>

<style>
    .bot {
        --percentStart: 0%;
        --progressTime: 3s;
        --priceColor: #42b983;

        width: 100%;

        background: #dadada;
        display: flex;
        flex-direction: row;
    }

    .progress-enter-active {
        animation: progress ease-out var(--progressTime);
    }

    .priceButton {
        width: 10%;
        background-color: var(--priceColor);
    }

    .progressBar {
        background-color: aqua;
        width: 80%;
    }

    .level {
        width: 10%;
    }

    @keyframes progress {
        0% {
            width: var(--percentStart);
        }
        100% {
            width: 80%;
        }
    }
</style>

<template>
    <div
        class="bot"
        :style="{
            '--progressTime': `${tempTime}ms`,
            '--priceColor': `${color}`,
            '--percentStart': `${percentStart}%`,
        }"
    >
        <div class="level">LVL {{ $store.state.levels[key2] }}</div>
        <button @click="addLvl" class="priceButton">{{ price }}$</button>
        <Transition name="progress">
            <div v-if="show" class="progressBar"></div>
        </Transition>
    </div>
</template>
