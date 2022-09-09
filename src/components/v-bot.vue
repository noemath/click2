<template>
    <div class="v-bot" :style="style">
        <button class="level" @click="bot.buttonStartLoop()">
            LVL {{ bot.level | prettyNumber }}
        </button>

        <button class="price-button" @click="bot.addLvl()">
            {{ bot.price | prettyNumber }}$
        </button>

        <div class="case">
            <Transition name="progress">
                <div v-if="bot.show" class="progress-bar"></div>
            </Transition>
        </div>

        <div>{{ prettyEfficiency }}$/s</div>
    </div>
</template>

<script lang="ts">
    import { Bot } from "@/models/bot";
    import Component from "vue-class-component";
    import { prettyNumber } from "@/utils/utils";
    import { Prop } from "vue-property-decorator";
    import { store } from "@/store";
    import { THOUSAND } from "@/data/constants";
    import Vue, { PropType } from "vue";

    @Component
    export default class extends Vue {
        @Prop({ required: true, type: Object as PropType<Bot> })
        protected readonly bot!: Bot;

        protected get color(): string {
            return store.state.money >= this.bot.price ? "green" : "red";
        }

        protected get prettyEfficiency(): string {
            return prettyNumber(
                Math.floor(
                    (this.bot.product * this.bot.level) /
                        (this.bot.time / THOUSAND)
                )
            );
        }

        protected get style(): {
            "--percentStart": string;
            "--priceColor": string;
            "--progressTime": string;
        } {
            return {
                "--percentStart": `${this.bot.percentStart}%`,
                "--priceColor": `var(--${this.color})`,
                "--progressTime": `${this.bot.actualTime}ms`,
            };
        }

        protected created(): void {
            this.bot.actualTime = this.bot.time;
        }

        protected mounted(): void {
            this.bot.startMiddleAnim();
        }
    }
</script>

<style scoped>
    .v-bot {
        --percentStart: 0%;
        --progressTime: 3s;
        --priceColor: var(--green);

        width: 100%;
        height: 100%;

        background: #dadada;
        display: flex;
        flex-direction: row;
    }

    .case {
        width: 70%;

        display: flex;
    }

    .progress-enter-active {
        animation: progress ease-out var(--progressTime);
    }

    .price-button {
        width: 10%;
        background-color: var(--priceColor);
    }

    .progress-bar {
        background-color: aqua;
        width: 100%;
    }

    .level {
        width: 10%;
    }

    @keyframes progress {
        0% {
            width: var(--percentStart);
        }
        100% {
            width: 100%;
        }
    }
</style>
