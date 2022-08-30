import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface IState {
    endTimes: [number, number, number];
    levels: [number, number, number];
    money: number;
    timeoutIDs: [number, number, number];
}

const store = new Vuex.Store<IState>({
    mutations: {
        addLevel(state, payload: { key: number }): void {
            state.levels[payload.key] += 1;
        },
        increment(state, payload: { amount: number }): void {
            state.money += payload.amount;
        },
        setEndTimes(state, payload: { key: number; time: number }): void {
            state.endTimes[payload.key] = payload.time;
        },
        setIds(state, payload: { id: number; key: number }): void {
            state.timeoutIDs[payload.key] = payload.id;
        },
    },
    state: {
        endTimes: [-1, -1, -1],
        levels: [0, 0, 0],
        money: 0,
        timeoutIDs: [-1, -1, -1],
    },
});

export { store, IState };
