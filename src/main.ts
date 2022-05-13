import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/main.css";
import { createPinia } from "pinia";
import { router, setupRouter } from "./router";
import { Quasar } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);
app.use(createPinia());
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

setupRouter(app);
router.isReady().then(() => app.mount("#app", true));
