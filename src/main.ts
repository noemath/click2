import App from "./App.vue";
import { prettyNumber } from "@/utils/utils";
import { router } from "./router";
import { store } from "@/store";
import Vue, { VNode } from "vue";

Vue.config.productionTip = false;

Vue.filter("prettyNumber", prettyNumber);

new Vue({
    render: (hh): VNode => hh(App),
    router,
    store,
}).$mount("#app");
