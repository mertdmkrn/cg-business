import { createApp } from 'vue';
import App from './App.vue'
import router from './router';
import store from './store';
import languageSettings from './utils/languageSettings';
import { appAxios } from './utils/appAxios';
import { filters } from './utils/filters';
import { toastr } from './utils/toastr';

import AppHeader from './components/Shared/appHeader.vue';
import AppFooter from './components/Shared/appFooter.vue';
import AppSidebar from './components/Shared/appSidebar.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(languageSettings);
app.component("AppHeader", AppHeader);
app.component("AppFooter", AppFooter);
app.component("AppSidebar", AppSidebar);

app.config.globalProperties.$appAxios = appAxios;
app.config.globalProperties.$filters = filters;
app.config.globalProperties.$toastr = toastr;

app.mount('#app');
