import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/main.css";
import { createPinia } from "pinia";
import { router, setupRouter } from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);

setupRouter(app);
router.isReady().then(() => app.mount("#app", true));
