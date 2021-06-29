<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { VbaseSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  VbaseSample,
  // }
 data() {
   return {
     form:{}
   }
 },
});
</script>

<template>
  <div id="app">
    ssss
    <BaseForm :form="form" url="test"/>
  </div>
</template>
