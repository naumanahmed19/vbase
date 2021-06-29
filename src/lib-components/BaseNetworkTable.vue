<template>
  <div class="network-data-table">
    <slot name="menu" />
    <el-table
      v-if="tableData !=null && tableData.length > 0"
      ref="networkDataTable"
      :data="tableData"
      :size="size"
      @row-click="rowClick"
      @row-dblclick="doubleClick"
      @selection-change="updateSelection"
    >
      <slot />

      <template v-if="fields !=null && fields.length> 0">
        <template
          v-for="field in fields"
        >
          <el-table-column
            v-if="field.component !=null"
            :key="field.title"
            label=""
            width="100"
          >
            <template slot-scope="scope">
              <component
                :is="field.component"
                :row-data="scope.row"
                :item="field.item"
              />
            </template>
          </el-table-column>

          <el-table-column
            v-else
            :key="field.title"
            :label="field.title"
            :prop="field.name"
          />
        </template>
      </template>
    </el-table>

    <NotFound
      v-else
      :loading="loading"
    />
  </div>
</template>

<script>


export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    immediate: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: null,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    pagination: {
      type: Boolean,
    },
    search: {
      type: String,
      default: null,
    },
    filters: {
      type: Object,
      default: null,
    },
    fields: {
     	type: Object,
      default: null,
    },
    size: {
      type: String,
      default: 'medium',
    },
	  tableDataProperty: {
      type: String,
      default: '',
	  },
    beforeRender: {
      type: Function,
      default: (e)=>e,
    },
    responseKey:{
      type: String,
      default: '',
    },
  },


  data() {
    return {
      data: [],
      tableData: [],
      f: [],
      status: null,
      loading: false,
      query_parameters: {},
      cancelToken: null,
      currentSelection: [],
	  lockedSelection: [],


    };
  },

  watch: {
	    	loading(n, o) {
	    		this.$emit('loading', n);
    		},

    pageNumber(n, o) {
      this.updateLockedSelection();
      this.get();
    		},

    		search(n, o) {
    			this.get();
    		},


    		filters: {
    			handler(n, o) {
        this.loading = true;
    				this.get();
    			},
    			deep: true,
    		},

  },

  mounted() {
    if (this.immediate) {
      this.loading = true;
      this.get();
    }
  },

  methods: {


    get() {
      this.loading = true;

      this.buildQuery().then((res) => {
        this.loading = false;


        if (this.pagination && res.data.hasOwnProperty('data')) {
          this.tableData = res.data.data;
        } else if (this.tableDataProperty) {
				  this.tableData = res.data[this.tableDataProperty];
			 } else {
				  this.tableData = res.data;
			 }

        this.data = res.data;
        if (this.tableDataProperty) {
          this.data = res.data[this.tableDataProperty];
        }


        /**
         * Filter Data
         * 
         */
        if(this.beforeRender){
          console.log('rendering...')
          this.data = this.beforeRender(this.data)
        }

        if (typeof res.data === 'object') {
          this.$nextTick(() => this.retrieveSelection());
        }


        return res;
      }).catch((err) => {
        this.data = [];

        return err.response;
      }).then((d) => {
        this.$emit('data-change', this.data);
      });
    },

    clearSelection() {
      this.currentSelection = [];
      this.lockedSelection = [];
      this.$refs.networkDataTable.clearSelection();
    },

    buildQuery() {
      this.generateCancelToken();
      this.buildQueryParameters();

      return this.$http.get(this.url, {
        params: this.query_parameters,
        cancelToken: this.cancelToken.token,
      });
    },

    buildQueryParameters() {
      this.query_parameters = {};

      if (this.pageSize !== null && this.pageNumber !== null && this.pagination) {
        Object.assign(this.query_parameters, { page_size: this.pageSize, page: this.pageNumber });
      }

      if (this.search !== null && this.search !== '') {
        Object.assign(this.query_parameters, { search: this.search });
      }

      if (this.filters && Object.keys(this.filters).length) {
        Object.assign(this.query_parameters, this.filters);
      }
    },


    rowClick(row) {
      this.$emit('row-click', row);
    },

    doubleClick(row) {
      this.$emit('row-dbclick', row);
    },


    generateCancelToken() {
      if (this.cancelToken !== null) {
        this.cancelToken.cancel();
      }

      this.cancelToken = this.$http.CancelToken.source();
    },


    updateSelection(currentPageSelection) {
      this.currentSelection = currentPageSelection;
      this.$nextTick(() => this.$emit('selection', this.currentSelection.concat(this.lockedSelection)));
    },

    retrieveSelection() {
      if (this.data & this.data.hasOwnProperty('data'))	{
        for (let i = 0; i < this.data.data.length; i++) {
          const indexLockedElement = this.lockedSelection.map((locked) => locked.id).indexOf(this.data.data[i].id);
          if (indexLockedElement != -1) {
            this.$refs.networkDataTable.toggleRowSelection(this.data.data[i], true);
            this.lockedSelection.splice(indexLockedElement, 1);
          }
	  }
      }
    },

    updateLockedSelection() {
      this.lockedSelection = this.lockedSelection.concat(this.currentSelection);

      this.lockedSelection.filter((selection, index, array) => array.map((s) => s.id).indexOf(selection.id) != index);
    },

    reload() {
      this.get();
    },

  },


};
</script>
