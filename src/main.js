import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Importar estilos de Bootstrap y BootstrapVueNext
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js"; // Archivo JS de Bootstrap
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

// Importar BootstrapVueNext
import { BootstrapVueNext } from "bootstrap-vue-next";

const app = createApp(App);

// Usar los plugins de Vue (router, store, y BootstrapVueNext)
app.use(router);
app.use(store);
app.use(BootstrapVueNext);

app.mount("#app");