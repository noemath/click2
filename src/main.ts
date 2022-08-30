import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import Vue, { VNode } from "vue";

Vue.config.productionTip = false;

new Vue({
    render: (hh): VNode => hh(App),
    router,
    store,
}).$mount("#app");
