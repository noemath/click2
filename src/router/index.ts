import VGame from "@/views/v-game.vue";
import VShop from "@/views/v-shop.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        component: VGame,
        name: "game",
        path: "/",
    },
    {
        component: VShop,
        name: "shop",
        path: "/shop",
    },
];

const router = new VueRouter({
    routes,
});

export { router };
