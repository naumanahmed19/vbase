 <script>
import Vue from 'vue';
import BaseManager from '../src/lib-components/BaseManager.vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { VbaseSample } from '@/entry.esm';

export default Vue.extend({
  components: { BaseManager },
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
    <BaseForm :form="form" url="test"/>
    <base-manager>
    <template slot="columns">
      <el-table-column prop="name" label="name">

      </el-table-column>
    </template>
    </base-manager>
  </div>
</template>
