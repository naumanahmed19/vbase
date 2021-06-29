import Vue from 'vue';
import VueEvents from 'vue-events';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import Dev from './serve.vue';

import HttpPlugin from './plugins/http.plugin';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import Vbase from '@/entry.esm';
Vue.use(Vbase);
Vue.use(ElementUI, { locale });
Vue.use(VueEvents);
Vue.use(VueI18n);
Vue.use(HttpPlugin);

Vue.config.productionTip = false;


let language = 'en';
let messages = require('../lang/en').default;


const i18n = new VueI18n({
  locale: language,
  messages,
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  silentTranslationWarn: true,
});


new Vue({
  i18n,
  render: (h) => h(Dev),
}).$mount('#app');
