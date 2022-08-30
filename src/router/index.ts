import GamePage from "../views/GameView.vue";
import Shop from "../views/ShopView.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        component: GamePage,
        name: "gamePage",
        path: "/",
    },
    {
        component: Shop,
        name: "shop",
        path: "/shop",
    },
];

const router = new VueRouter({
    routes,
});

export default router;
