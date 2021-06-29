//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  props: {
    paginationInclude: {
      type: String,
      default: 'slot,total,prev,pager,next'
    },
    hasPaginationSize: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    url: {
      type: String,
      default: ''
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      required: false,
      default: null
    },
    search: {
      type: String,
      default: null
    },
    filters: {
      type: Object,
      default: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    hasTopPagination: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    sidebarSize: {
      type: String,
      default: 'small'
    },
    sidebarOpenFirst: {
      type: Boolean,
      default: true
    },
    sidebarCloseOnSave: {
      type: Boolean,
      default: true
    },
    classes: {
      type: String,
      default: 'card shadow pb-3'
    },
    fields: {
      type: Array,
      default: null
    },
    containerClasses: {
      type: String,
      default: 'container-fluid base-manager-layout bg-light'
    },
    hasFilter: {
      type: Boolean,
      default: false
    },
    hasScreenCapture: {
      type: Boolean,
      default: false
    },
    hasFullScreenButton: {
      type: Boolean,
      default: false
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    canCreate: {
      type: Boolean,
      default: false
    },
    createBtnLabel: {
      type: String,
      default: 'common.action.add'
    },
    handleCreate: {
      type: Function,
      default: () => {}
    },
    handleEdit: {
      type: Function,
      default: () => {}
    },
    beforeDelete: {
      type: Function,
      default: () => true
    },
    beforeRender: {
      type: Function,
      default: e => e
    },
    deleteRoute: {
      type: String,
      default: ''
    },
    deleteAlertMessage: {
      type: String,
      default: 'Are you sure you want to delete this.'
    },
    tableDataProperty: {
      type: String,
      default: ''
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 50, 100, 250]
    },
    screenshotFileName: {
      type: String,
      default: 'screenshot'
    },
    createTitle: {
      type: String,
      default: 'common.sidebar.add'
    }
  },

  data() {
    return {
      screenRef: {},
      page: 1,
      data: [],
      loading: false,
      total: 0,
      showAction: false,
      currentRow: null,
      pagesize: this.pageSize,
      selected: [],
      editing: false,
      showRightSidebar: false,
      showFilterSidebar: false
    };
  },

  computed: {
    paginationLayout() {
      let layout = this.paginationInclude;

      if (this.$mq === 'sm') {
        layout = 'slot,total,prev,next';
      }

      if (this.hasPaginationSize) layout += ',sizes';
      return layout;
    },

    hasFilterSlot() {
      return !!this.$slots.filterSidebar;
    },

    haslargeSidebar() {
      return !!this.$slots.largeSidebar;
    },

    hasSidebar() {
      return !!this.$slots.sidebar;
    },

    hasCreateSidebarSmall() {
      return !!this.$slots.createSidebarSmall;
    }

  },
  watch: {
    loading(n, o) {
      this.$emit('loading', n);
    },

    filters(n, o) {
      this.page = 1;
    },

    search(n, o) {
      this.page = 1;
    }

  },

  mounted() {
    this.screenRef = this.$refs.screen;
    this.$events.on('closeit', () => {
      if (this.sidebarCloseOnSave) {
        if (this.hasSidebar) {
          this.$refs.createRightSidebar.close();
        }

        if (this.haslargeSidebar) {
          this.$refs.rightLargeSidebar.close();
        }

        if (this.hasCreateSidebarSmall) {
          this.$refs.createSidebarSmall.close();
        }
      }

      this.reload();
    });
  },

  methods: {
    handleFilter() {
      this.showFilterSidebar = true;
      this.$refs.screen.open();
    },

    handleCloseFilter() {
      if (this.showFilterSidebar) {
        this.showFilterSidebar = false;
        this.$refs.screen.close();
      }
    },

    handleOnCloseSidebar() {
      this.showRightSidebar = false;
    },

    handleCreateSidebar() {
      this.handleCloseFilter();
      this.showRightSidebar = true;
      this.$nextTick(() => {
        if (this.hasCreateSidebarSmall) {
          this.$refs.createSidebarSmall.open();
        } else {
          this.$refs.createRightSidebar.open();
        }

        this.editing = false;
        this.$events.fire('createItem');
      });
    },

    handleEditSidebar(row) {
      this.handleCloseFilter();

      if (this.sidebarOpenFirst) {
        this.showRightSidebar = true;
      }

      this.$nextTick(() => {
        this.$emit('editSelectedItem', row);
        this.$events.fire('editItem', row);
        this.editing = true;
        this.$refs.createRightSidebar.open();
        this.showRightSidebar = true;
      });
    },

    clearSelection() {
      this.$refs.networkTable.clearSelection();
    },

    setData(data) {
      if (Array.isArray(data.data) && this.hasPagination) {
        this.data = data.data;
        this.$emit('on-loaded', this.data);
      } else {
        this.data = data;
        this.$emit('on-loaded', this.data);
      } // TODO: Fix two diffrent implementation for pagination on backend


      if (data.hasOwnProperty('meta')) {
        this.total = data.meta.total;
      } else {
        this.total = data.total;
      }

      console.log(this.total);
    },

    reload() {
      this.$nextTick(() => this.$refs.networkTable.reload());
    },

    setPage(page) {
      this.page = page;
    },

    setSize(val) {
      this.pagesize = val;
      this.$nextTick(() => this.$refs.networkTable.reload());
    },

    rowDoubleClick(row) {
      this.$emit('row-dbclick', row);
    },

    updateSelection(selectedItems) {
      this.selected = selectedItems;
      this.$emit('selection', selectedItems);
    },

    handleDelete(row) {
      this.$confirm(this.deleteAlertMessage, 'Delete', {
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.delete(row.id);
      });
    },

    async delete(id) {
      let deleteUrl = `${this.url}/${id}`;

      if (this.deleteRoute) {
        deleteUrl = `${this.deleteRoute}/${id}`;
      }

      this.loading = true;
      await axios.delete(deleteUrl).then(response => {
        this.$message({
          type: 'success',
          message: 'Deleted'
        });
        this.reload();
        this.$emit('afterDelete');
      }).catch(err => {
        this.errors.record(err.response.data.errors, this);
      });
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var this$1$1 = this;

  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.hasFilterSlot ? _c('CapteRightSidebar', {
    ref: "screen",
    attrs: {
      "body-classes": "p-3",
      "title": _vm.$t('common.menu.apply_filter')
    }
  }, [_vm.showFilterSidebar ? _c('div', [_vm._t("filterSidebar")], 2) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.hasCreateSidebarSmall ? _c('CapteRightSidebar', {
    ref: "createSidebarSmall",
    attrs: {
      "show-handle": false,
      "body-classes": "p-0",
      "title": _vm.editing ? _vm.$t('common.sidebar.edit') : _vm.$t(_vm.createTitle)
    },
    on: {
      "onClose": _vm.handleOnCloseSidebar
    }
  }, [_vm.showRightSidebar ? _c('div', [_vm._t("createSidebarSmall")], 2) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.hasSidebar ? _c('CapteRightSidebar', {
    ref: "createRightSidebar",
    attrs: {
      "show-handle": false,
      "body-classes": "p-0",
      "size": _vm.sidebarSize,
      "title": _vm.editing ? _vm.$t('common.sidebar.edit') : _vm.$t(_vm.createTitle)
    },
    on: {
      "onClose": _vm.handleOnCloseSidebar
    }
  }, [_vm.showRightSidebar ? _c('div', [_vm._t("sidebar")], 2) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.containerClasses,
    attrs: {
      "id": "base-manager"
    }
  }, [_c('div', {
    class: _vm.classes
  }, [_c('div', {
    staticClass: "card-header"
  }, [_c('div', {
    staticClass: "d-flex align-items-center"
  }, [_c('div', [_vm.title ? _c('h5', [_vm._v("\n              " + _vm._s(_vm.title) + "\n            ")]) : _vm._e(), _vm._v(" "), _vm._t("headerLeft"), _vm._v(" "), _vm._t("filter"), _vm._v(" "), _vm.showAction ? _c('div', [_vm._t("main-actions", null, {
    "row": _vm.currentRow
  })], 2) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "ml-auto"
  }, [_vm._t("headerRight"), _vm._v(" "), _vm._t("action", null, {
    "type": this.type
  }), _vm._v(" "), _vm.hasFullScreenButton ? _c('CapteFullScreenButton') : _vm._e(), _vm._v(" "), _vm.hasScreenCapture ? _c('CapteScreenShotButton', {
    attrs: {
      "file-name": _vm.screenshotFileName
    }
  }) : _vm._e(), _vm._v(" "), _vm.hasFilterSlot ? _c('el-button', {
    attrs: {
      "circle": "",
      "size": _vm.$mq === 'sm' ? 'mini' : '',
      "icon": "capte-icon-filter"
    },
    on: {
      "click": _vm.handleFilter
    }
  }) : _vm._e(), _vm._v(" "), _vm.canCreate ? _c('el-button', {
    attrs: {
      "type": "primary",
      "plain": "",
      "icon": "el-icon-plus"
    },
    on: {
      "click": _vm.handleCreateSidebar
    }
  }, [_vm._v("\n              " + _vm._s(_vm.$t(_vm.createBtnLabel)) + "\n            ")]) : _vm._e()], 2)])]), _vm._v(" "), _vm.hasTopPagination && _vm.hasPagination ? _c('div', {
    staticClass: "d-flex align-items-center b-b my-1"
  }, [_c('el-pagination', {
    staticClass: "base-manager-layout__pagination",
    attrs: {
      "layout": _vm.paginationLayout,
      "page-size": _vm.pagesize,
      "page-sizes": _vm.pageSizes,
      "total": _vm.total,
      "current-page": _vm.page
    },
    on: {
      "size-change": _vm.setSize,
      "current-change": _vm.setPage
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('el-container', [_c('el-main', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: _vm.loading,
      expression: "loading"
    }],
    staticClass: "pt-0"
  }, [_vm.url ? _c('div', [_c('BaseNetworkTable', {
    ref: "networkTable",
    attrs: {
      "url": _vm.url,
      "table-data-property": _vm.tableDataProperty,
      "page-size": this.pagesize,
      "page-number": this.page,
      "search": this.search,
      "filters": this.filters,
      "pagination": _vm.hasPagination,
      "size": _vm.size,
      "fields": _vm.fields,
      "beforeRender": _vm.beforeRender
    },
    on: {
      "data-change": _vm.setData,
      "row-dbclick": _vm.rowDoubleClick,
      "loading": function (loading) {
        return this$1$1.loading = loading;
      },
      "selection": _vm.updateSelection
    }
  }, [_vm._t("columns"), _vm._v(" "), _vm.canEdit || _vm.canDelete ? _c('el-table-column', {
    attrs: {
      "align": "right"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function (scope) {
        return [_vm.canEdit ? _c('el-button', {
          staticClass: "ml-2",
          attrs: {
            "icon": "el-icon-edit",
            "size": "mini",
            "circle": ""
          },
          on: {
            "click": function ($event) {
              return _vm.handleEditSidebar(scope.row);
            }
          }
        }) : _vm._e(), _vm._v(" "), _vm.canDelete && _vm.beforeDelete(scope.row) ? _c('el-button', {
          staticClass: "ml-2",
          attrs: {
            "icon": "el-icon-close",
            "size": "mini",
            "circle": ""
          },
          on: {
            "click": function ($event) {
              return _vm.handleDelete(scope.row);
            }
          }
        }) : _vm._e()];
      }
    }], null, false, 2067315711)
  }) : _vm._e()], 2)], 1) : _vm._e(), _vm._v(" "), _c('template', {
    slot: "menu"
  }, [_vm._t("table-menu")], 2), _vm._v(" "), _vm._t("content")], 2)], 1), _vm._v(" "), _vm.hasPagination ? _c('el-pagination', {
    staticClass: "base-manager-layout__pagination",
    attrs: {
      "layout": _vm.paginationLayout,
      "page-size": _vm.pagesize,
      "page-sizes": _vm.pageSizes,
      "total": _vm.total,
      "current-page": _vm.page
    },
    on: {
      "size-change": _vm.setSize,
      "current-change": _vm.setPage
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("pagination-bottom")], 2)])], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    url: {
      type: String,
      required: true
    },
    immediate: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: null
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    pagination: {
      type: Boolean
    },
    search: {
      type: String,
      default: null
    },
    filters: {
      type: Object,
      default: null
    },
    fields: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    },
    tableDataProperty: {
      type: String,
      default: ''
    },
    beforeRender: {
      type: Function,
      default: e => e
    },
    responseKey: {
      type: String,
      default: ''
    }
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
      lockedSelection: []
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

      deep: true
    }
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
      this.buildQuery().then(res => {
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


        if (this.beforeRender) {
          console.log('rendering...');
          this.data = this.beforeRender(this.data);
        }

        if (typeof res.data === 'object') {
          this.$nextTick(() => this.retrieveSelection());
        }

        return res;
      }).catch(err => {
        this.data = [];
        return err.response;
      }).then(d => {
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
        cancelToken: this.cancelToken.token
      });
    },

    buildQueryParameters() {
      this.query_parameters = {};

      if (this.pageSize !== null && this.pageNumber !== null && this.pagination) {
        Object.assign(this.query_parameters, {
          page_size: this.pageSize,
          page: this.pageNumber
        });
      }

      if (this.search !== null && this.search !== '') {
        Object.assign(this.query_parameters, {
          search: this.search
        });
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
      if (this.data & this.data.hasOwnProperty('data')) {
        for (let i = 0; i < this.data.data.length; i++) {
          const indexLockedElement = this.lockedSelection.map(locked => locked.id).indexOf(this.data.data[i].id);

          if (indexLockedElement != -1) {
            this.$refs.networkDataTable.toggleRowSelection(this.data.data[i], true);
            this.lockedSelection.splice(indexLockedElement, 1);
          }
        }
      }
    },

    updateLockedSelection() {
      this.lockedSelection = this.lockedSelection.concat(this.currentSelection);
      this.lockedSelection.filter((selection, index, array) => array.map(s => s.id).indexOf(selection.id) != index);
    },

    reload() {
      this.get();
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "network-data-table"
  }, [_vm._t("menu"), _vm._v(" "), _vm.tableData != null && _vm.tableData.length > 0 ? _c('el-table', {
    ref: "networkDataTable",
    attrs: {
      "data": _vm.tableData,
      "size": _vm.size
    },
    on: {
      "row-click": _vm.rowClick,
      "row-dblclick": _vm.doubleClick,
      "selection-change": _vm.updateSelection
    }
  }, [_vm._t("default"), _vm._v(" "), _vm.fields != null && _vm.fields.length > 0 ? [_vm._l(_vm.fields, function (field) {
    return [field.component != null ? _c('el-table-column', {
      key: field.title,
      attrs: {
        "label": "",
        "width": "100"
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function (scope) {
          return [_c(field.component, {
            tag: "component",
            attrs: {
              "row-data": scope.row,
              "item": field.item
            }
          })];
        }
      }], null, true)
    }) : _c('el-table-column', {
      key: field.title,
      attrs: {
        "label": field.title,
        "prop": field.name
      }
    })];
  })] : _vm._e()], 2) : _c('NotFound', {
    attrs: {
      "loading": _vm.loading
    }
  })], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    form: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    updateMethod: {
      type: String,
      default: "patch"
    },
    url: {
      type: String,
      default: ""
    },
    updateUrl: {
      type: String,
      default: ""
    },
    labelPosition: {
      type: String,
      default: "top"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    beforeSave: {
      type: Function,
      default: e => e
    },
    toastErrors: {
      type: Boolean,
      default: false
    },
    showErrors: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Function,
      default: () => {}
    },
    disableUrlGen: {
      type: Boolean,
      default: false
    },
    submitBtnLabel: {
      type: String,
      default: "common.action.save"
    },
    successPostMessage: {
      type: String,
      default: "common.msgs.post"
    },
    successUpdateMessage: {
      type: String,
      default: "common.msgs.update"
    },
    hasSidebarForm: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: ""
    },
    formClass: {
      type: String,
      default: "capte__form"
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      loadingSave: false,
      editWatchers: [],
      edited: {},
      validationErors: [],
      editing: false,
      networkError: false,
      formRules: {}
    };
  },

  computed: {
    labelClass() {
      return {
        "baseform--top": this.labelPosition == "top",
        "baseform--left": this.labelPosition == "left",
        "baseform--right": this.labelPosition == "right"
      };
    },

    hasActions() {
      return !!this.$slots.actions;
    }

  },
  watch: {
    form: {
      handler() {
        if (this.$refs.form) {
          Object.keys(this.formRules).forEach(key => {
            if (this.form[key]) {
              delete this.formRules[key];
            }
          });
          this.$refs.form.validate();
        }
      },

      deep: true,
      immediate: true
    },
    editMode: {
      handler(isEnabled) {
        this.editing = isEnabled;
        isEnabled ? this.registerWatchers() : this.destroyWatchers();
        this.edited = {};
      },

      immediate: true
    },
    editing: {
      handler(isEnabled) {
        isEnabled ? this.registerWatchers() : this.destroyWatchers();
        this.edited = {};
      },

      immediate: true
    }
  },

  mounted() {
    this.$events.on("editItem", data => {
      this.editing = false;
      this.reset();
      this.$nextTick(() => {
        Object.assign(this.form, data);
        this.editing = true;
        this.$emit("afterFormDataLoaded");
      });
    });
    this.$events.on("createItem", () => {
      this.editing = false;
      this.reset();
    });
    this.$events.on("resetBaseForm", () => {
      this.reset();
    });
    Object.assign(this.formRules, this.rules);
  },

  methods: {
    patchURL() {
      let {
        url
      } = this;

      if (this.updateUrl) {
        url = this.updateUrl;
      } else if (this.form.id && !this.disableUrlGen) {
        url = `${url}/${this.form.id}`;
      }

      return url;
    },

    clearValidation() {
      this.$refs.form.clearValidate();
    },

    destroyWatchers() {
      this.editWatchers.map(watcher => watcher());
      this.editWatchers = [];
    },

    closeSidebar() {
      if (this.hasSidebarForm) {
        this.$events.fire("closeit");
      }
    },

    patch() {
      this.clearValidation();
      return this.$http.patch(this.patchURL(), this.beforeSave(this.edited), {
        headers: {
          "Content-Type": " application/merge-patch+json"
        }
      }).then(() => {
        this.edited = {};
        this.$message.success(this.$t(this.successUpdateMessage));
        this.$emit("success-update");
        this.closeSidebar();
      }).catch(err => {
        this.$emit("errors", err.response.data.errors);

        if (err.response.status == "422") {
          this.validate(err.response.data.errors);
          this.form.errors = err.response.data.errors;
        } else {
          this.$message.error(this.$t("common.msgs.error"));
          this.networkError = true;
        }
      });
    },

    put() {
      this.clearValidation();
      return this.$http.put(this.patchURL(), this.beforeSave(this.form), {
        headers: {
          "Content-Type": " application/json"
        }
      }).then(() => {
        this.$message.success(this.$t(this.successUpdateMessage));
        this.$emit("success-update");
        this.closeSidebar();
      }).catch(err => {
        this.$emit("errors", err.response.data.errors);

        if (err.response.status == "422") {
          this.validate(err.response.data.errors); // Can be improvepd with class...
        } else {
          this.$message.error(this.$t("common.msgs.error"));
          this.networkError = true;
        }
      });
    },

    reset(formName = "form") {
      this.$nextTick(() => {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      });
    },

    registerWatchers() {
      for (const item in this.form) {
        // This horrendous hack need to be change by a prop containing the field you decide to deep search
        if (typeof this.form[item] === "object" && ["lifecycle"].indexOf(item) != -1) {
          for (const subItem in this.form[item]) {
            this.registerWatcher(`${item}.${subItem}`);
          }
        } else {
          this.registerWatcher(item);
        }
      }
    },

    registerWatcher(key) {
      const watcher = function (newValue) {
        const keys = key.split(".");

        if (keys.length == 2) {
          if (!(keys[0] in this.edited)) {
            this.edited[keys[0]] = {};
          }

          this.edited[keys[0]][keys[1]] = newValue;
        } else if (keys.length == 1) {
          if (typeof newValue === "string") {
            this.edited[keys[0]] = newValue.trim() !== "" ? newValue : null;
          } else {
            this.edited[keys[0]] = newValue;
          }
        }
      };

      this.editWatchers.push(this.$watch(`form.${key}`, watcher, {
        deep: true,
        immediate: true
      }));
    },

    scrollToError() {
      if (document.querySelectorAll(".is-error").length) {
        document.querySelectorAll(".is-error")[0].scrollIntoView({
          behavior: "smooth"
        });
      }
    },

    store() {
      this.clearValidation();
      return this.$http.post(this.url, this.beforeSave(this.form)).then(res => {
        this.$message.success(this.$t(this.successPostMessage));
        this.$emit("success-save", res.data);
        this.closeSidebar();
      }).catch(err => {
        this.$emit("errors", err.response.data.errors);

        if (err.response.status == "422") {
          this.validate(err.response.data.errors);
          if (this.toastErrors) this.errorToast(err.response.data.errors);
        } else {
          this.networkError = true;
        }
      });
    },

    errorToast(errors) {
      let error;
      Object.keys(errors).forEach(key => {
        error = errors[key].join();
      });
      this.$message.warning(error);
    },

    validationErrors(errors) {
      let error;
      this.validationErors = [];
      Object.keys(errors).forEach(key => {
        error = errors[key].join();
        this.validationErors.push(error);
      });
    },

    validate(validation) {
      const errors = {};

      for (const error in validation) {
        errors[error] = validation[error].map(err => ({
          validator: (r, v, callback) => callback(new Error(err)),
          trigger: "blur",
          required: true
        }));
      }

      this.formRules = errors;

      if (this.showErrors) {
        this.validationErrors(validation);
      }

      this.$nextTick(() => this.scrollToError());
    },

    /**
     * Create or Update Item
     */
    async handleSave() {
      this.networkError = false;
      this.loadingSave = true;

      if (this.url) {
        if (this.editMode || this.editing) {
          if (this.updateMethod === "put") {
            await this.put();
          } else {
            await this.patch();
          }
        } else {
          await this.store();
        }
      } else {
        this.$emit("click-button");
      }

      this.loadingSave = false;
    }

  }
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "baseform",
    class: _vm.labelClass
  }, [_c('el-form', {
    ref: "form",
    class: _vm.formClass,
    attrs: {
      "label-width": "100%",
      "model": _vm.form,
      "label-position": "top",
      "rules": _vm.formRules,
      "disabled": _vm.disabled,
      "size": "small"
    }
  }, [_vm.networkError ? _c('el-alert', {
    staticClass: "my-4",
    attrs: {
      "title": _vm.$t('common.msgs.err_network'),
      "type": "error",
      "show-icon": ""
    }
  }) : _vm._e(), _vm._v(" "), _vm.showErrors && _vm.validationErors.length > 0 ? _c('el-alert', {
    attrs: {
      "title": "Please fix validation errors",
      "type": "error",
      "show-icon": ""
    }
  }, [_c('ul', {
    staticClass: "p-0"
  }, _vm._l(_vm.validationErors.slice().reverse(), function (error) {
    return _c('li', {
      key: error
    }, [_vm._v("\n          " + _vm._s(error) + "\n        ")]);
  }), 0)]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.hasActions ? _vm._t("actions") : _c('div', {
    staticClass: "ml-auto mt-3"
  }, [_c('el-button', {
    class: _vm.btnClass,
    attrs: {
      "type": "primary",
      "mini": "",
      "plain": "",
      "loading": _vm.loadingSave,
      "disabled": _vm.loadingSave
    },
    on: {
      "click": function ($event) {
        return _vm.handleSave();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t(_vm.submitBtnLabel)) + "\n      ")])], 1)], 2)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BaseManager: __vue_component__$2,
  BaseNetworkTable: __vue_component__$1,
  BaseForm: __vue_component__
});

// Import vue components

const install = function installVbase(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__ as BaseForm, __vue_component__$2 as BaseManager, __vue_component__$1 as BaseNetworkTable };
