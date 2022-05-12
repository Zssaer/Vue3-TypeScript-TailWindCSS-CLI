import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/main.css";
import { createPinia } from "pinia";
import { router, setupRouter } from "./router";

const app = createApp(App);
app.use(createPinia());

setupRouter(app);
router.isReady().then(() => app.mount("#app", true));
