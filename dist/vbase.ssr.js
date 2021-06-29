'use strict';function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      default: function _default() {}
    },
    handleEdit: {
      type: Function,
      default: function _default() {}
    },
    beforeDelete: {
      type: Function,
      default: function _default() {
        return true;
      }
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
      default: function _default() {
        return [5, 10, 50, 100, 250];
      }
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
  data: function data() {
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
    paginationLayout: function paginationLayout() {
      var layout = this.paginationInclude;

      if (this.$mq === 'sm') {
        layout = 'slot,total,prev,next';
      }

      if (this.hasPaginationSize) layout += ',sizes';
      return layout;
    },
    hasFilterSlot: function hasFilterSlot() {
      return !!this.$slots.filterSidebar;
    },
    haslargeSidebar: function haslargeSidebar() {
      return !!this.$slots.largeSidebar;
    },
    hasSidebar: function hasSidebar() {
      return !!this.$slots.sidebar;
    },
    hasCreateSidebarSmall: function hasCreateSidebarSmall() {
      return !!this.$slots.createSidebarSmall;
    }
  },
  watch: {
    loading: function loading(n, o) {
      this.$emit('loading', n);
    },
    filters: function filters(n, o) {
      this.page = 1;
    },
    search: function search(n, o) {
      this.page = 1;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.screenRef = this.$refs.screen;
    this.$events.on('closeit', function () {
      if (_this.sidebarCloseOnSave) {
        if (_this.hasSidebar) {
          _this.$refs.createRightSidebar.close();
        }

        if (_this.haslargeSidebar) {
          _this.$refs.rightLargeSidebar.close();
        }

        if (_this.hasCreateSidebarSmall) {
          _this.$refs.createSidebarSmall.close();
        }
      }

      _this.reload();
    });
  },
  methods: {
    handleFilter: function handleFilter() {
      this.showFilterSidebar = true;
      this.$refs.screen.open();
    },
    handleCloseFilter: function handleCloseFilter() {
      if (this.showFilterSidebar) {
        this.showFilterSidebar = false;
        this.$refs.screen.close();
      }
    },
    handleOnCloseSidebar: function handleOnCloseSidebar() {
      this.showRightSidebar = false;
    },
    handleCreateSidebar: function handleCreateSidebar() {
      var _this2 = this;

      this.handleCloseFilter();
      this.showRightSidebar = true;
      this.$nextTick(function () {
        if (_this2.hasCreateSidebarSmall) {
          _this2.$refs.createSidebarSmall.open();
        } else {
          _this2.$refs.createRightSidebar.open();
        }

        _this2.editing = false;

        _this2.$events.fire('createItem');
      });
    },
    handleEditSidebar: function handleEditSidebar(row) {
      var _this3 = this;

      this.handleCloseFilter();

      if (this.sidebarOpenFirst) {
        this.showRightSidebar = true;
      }

      this.$nextTick(function () {
        _this3.$emit('editSelectedItem', row);

        _this3.$events.fire('editItem', row);

        _this3.editing = true;

        _this3.$refs.createRightSidebar.open();

        _this3.showRightSidebar = true;
      });
    },
    clearSelection: function clearSelection() {
      this.$refs.networkTable.clearSelection();
    },
    setData: function setData(data) {
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
    reload: function reload() {
      var _this4 = this;

      this.$nextTick(function () {
        return _this4.$refs.networkTable.reload();
      });
    },
    setPage: function setPage(page) {
      this.page = page;
    },
    setSize: function setSize(val) {
      var _this5 = this;

      this.pagesize = val;
      this.$nextTick(function () {
        return _this5.$refs.networkTable.reload();
      });
    },
    rowDoubleClick: function rowDoubleClick(row) {
      this.$emit('row-dbclick', row);
    },
    updateSelection: function updateSelection(selectedItems) {
      this.selected = selectedItems;
      this.$emit('selection', selectedItems);
    },
    handleDelete: function handleDelete(row) {
      var _this6 = this;

      this.$confirm(this.deleteAlertMessage, 'Delete', {
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(function () {
        _this6.delete(row.id);
      });
    },
    delete: function _delete(id) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var deleteUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                deleteUrl = "".concat(_this7.url, "/").concat(id);

                if (_this7.deleteRoute) {
                  deleteUrl = "".concat(_this7.deleteRoute, "/").concat(id);
                }

                _this7.loading = true;
                _context.next = 5;
                return axios.delete(deleteUrl).then(function (response) {
                  _this7.$message({
                    type: 'success',
                    message: 'Deleted'
                  });

                  _this7.reload();

                  _this7.$emit('afterDelete');
                }).catch(function (err) {
                  _this7.errors.record(err.response.data.errors, _this7);
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
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
  }, [_vm.showFilterSidebar ? _c('div', [_vm._t("filterSidebar")], 2) : _vm._e()]) : _vm._e(), _vm._ssrNode(" "), _vm.hasCreateSidebarSmall ? _c('CapteRightSidebar', {
    ref: "createSidebarSmall",
    attrs: {
      "show-handle": false,
      "body-classes": "p-0",
      "title": _vm.editing ? _vm.$t('common.sidebar.edit') : _vm.$t(_vm.createTitle)
    },
    on: {
      "onClose": _vm.handleOnCloseSidebar
    }
  }, [_vm.showRightSidebar ? _c('div', [_vm._t("createSidebarSmall")], 2) : _vm._e()]) : _vm._e(), _vm._ssrNode(" "), _vm.hasSidebar ? _c('CapteRightSidebar', {
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
  }, [_vm.showRightSidebar ? _c('div', [_vm._t("sidebar")], 2) : _vm._e()]) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<div id=\"base-manager\"" + _vm._ssrClass(null, _vm.containerClasses) + ">", "</div>", [_vm._ssrNode("<div" + _vm._ssrClass(null, _vm.classes) + ">", "</div>", [_vm._ssrNode("<div class=\"card-header\">", "</div>", [_vm._ssrNode("<div class=\"d-flex align-items-center\">", "</div>", [_vm._ssrNode("<div>", "</div>", [_vm._ssrNode((_vm.title ? "<h5>" + _vm._ssrEscape("\n              " + _vm._s(_vm.title) + "\n            ") + "</h5>" : "<!---->") + " "), _vm._t("headerLeft"), _vm._ssrNode(" "), _vm._t("filter"), _vm._ssrNode(" "), _vm.showAction ? _vm._ssrNode("<div>", "</div>", [_vm._t("main-actions", null, {
    "row": _vm.currentRow
  })], 2) : _vm._e()], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"ml-auto\">", "</div>", [_vm._t("headerRight"), _vm._ssrNode(" "), _vm._t("action", null, {
    "type": this.type
  }), _vm._ssrNode(" "), _vm.hasFullScreenButton ? _c('CapteFullScreenButton') : _vm._e(), _vm._ssrNode(" "), _vm.hasScreenCapture ? _c('CapteScreenShotButton', {
    attrs: {
      "file-name": _vm.screenshotFileName
    }
  }) : _vm._e(), _vm._ssrNode(" "), _vm.hasFilterSlot ? _c('el-button', {
    attrs: {
      "circle": "",
      "size": _vm.$mq === 'sm' ? 'mini' : '',
      "icon": "capte-icon-filter"
    },
    on: {
      "click": _vm.handleFilter
    }
  }) : _vm._e(), _vm._ssrNode(" "), _vm.canCreate ? _c('el-button', {
    attrs: {
      "type": "primary",
      "plain": "",
      "icon": "el-icon-plus"
    },
    on: {
      "click": _vm.handleCreateSidebar
    }
  }, [_vm._v("\n              " + _vm._s(_vm.$t(_vm.createBtnLabel)) + "\n            ")]) : _vm._e()], 2)], 2)]), _vm._ssrNode(" "), _vm.hasTopPagination && _vm.hasPagination ? _vm._ssrNode("<div class=\"d-flex align-items-center b-b my-1\">", "</div>", [_c('el-pagination', {
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
  })], 1) : _vm._e(), _vm._ssrNode(" "), _c('el-container', [_c('el-main', {
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
      "fields": _vm.fields
    },
    on: {
      "data-change": _vm.setData,
      "row-dbclick": _vm.rowDoubleClick,
      "loading": function loading(_loading) {
        return this$1$1.loading = _loading;
      },
      "selection": _vm.updateSelection
    }
  }, [_vm._t("columns"), _vm._v(" "), _vm.canEdit || _vm.canDelete ? _c('el-table-column', {
    attrs: {
      "align": "right"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(scope) {
        return [_vm.canEdit ? _c('el-button', {
          staticClass: "ml-2",
          attrs: {
            "icon": "el-icon-edit",
            "size": "mini",
            "circle": ""
          },
          on: {
            "click": function click($event) {
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
            "click": function click($event) {
              return _vm.handleDelete(scope.row);
            }
          }
        }) : _vm._e()];
      }
    }], null, false, 2067315711)
  }) : _vm._e()], 2)], 1) : _vm._e(), _vm._v(" "), _c('template', {
    slot: "menu"
  }, [_vm._t("table-menu")], 2), _vm._v(" "), _vm._t("content")], 2)], 1), _vm._ssrNode(" "), _vm.hasPagination ? _c('el-pagination', {
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
  }) : _vm._e(), _vm._ssrNode(" "), _vm._t("pagination-bottom")], 2)])], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-3351cd0a";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    }
  },
  data: function data() {
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
    loading: function loading(n, o) {
      this.$emit('loading', n);
    },
    pageNumber: function pageNumber(n, o) {
      this.updateLockedSelection();
      this.get();
    },
    search: function search(n, o) {
      this.get();
    },
    filters: {
      handler: function handler(n, o) {
        this.loading = true;
        this.get();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    if (this.immediate) {
      this.loading = true;
      this.get();
    }
  },
  methods: {
    get: function get() {
      var _this = this;

      this.loading = true;
      this.buildQuery().then(function (res) {
        _this.loading = false;

        if (_this.pagination && res.data.hasOwnProperty('data')) {
          _this.tableData = res.data.data;
        } else if (_this.tableDataProperty) {
          _this.tableData = res.data[_this.tableDataProperty];
        } else {
          _this.tableData = res.data;
        }

        _this.data = res.data;

        if (_this.tableDataProperty) {
          _this.data = res.data[_this.tableDataProperty];
        }

        if (_typeof(res.data) === 'object') {
          _this.$nextTick(function () {
            return _this.retrieveSelection();
          });
        }

        return res;
      }).catch(function (err) {
        _this.data = [];
        return err.response;
      }).then(function (d) {
        _this.$emit('data-change', _this.data);
      });
    },
    clearSelection: function clearSelection() {
      this.currentSelection = [];
      this.lockedSelection = [];
      this.$refs.networkDataTable.clearSelection();
    },
    buildQuery: function buildQuery() {
      this.generateCancelToken();
      this.buildQueryParameters();
      return this.$http.get(this.url, {
        params: this.query_parameters,
        cancelToken: this.cancelToken.token
      });
    },
    buildQueryParameters: function buildQueryParameters() {
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
    rowClick: function rowClick(row) {
      this.$emit('row-click', row);
    },
    doubleClick: function doubleClick(row) {
      this.$emit('row-dbclick', row);
    },
    generateCancelToken: function generateCancelToken() {
      if (this.cancelToken !== null) {
        this.cancelToken.cancel();
      }

      this.cancelToken = this.$http.CancelToken.source();
    },
    updateSelection: function updateSelection(currentPageSelection) {
      var _this2 = this;

      this.currentSelection = currentPageSelection;
      this.$nextTick(function () {
        return _this2.$emit('selection', _this2.currentSelection.concat(_this2.lockedSelection));
      });
    },
    retrieveSelection: function retrieveSelection() {
      if (this.data & this.data.hasOwnProperty('data')) {
        for (var i = 0; i < this.data.data.length; i++) {
          var indexLockedElement = this.lockedSelection.map(function (locked) {
            return locked.id;
          }).indexOf(this.data.data[i].id);

          if (indexLockedElement != -1) {
            this.$refs.networkDataTable.toggleRowSelection(this.data.data[i], true);
            this.lockedSelection.splice(indexLockedElement, 1);
          }
        }
      }
    },
    updateLockedSelection: function updateLockedSelection() {
      this.lockedSelection = this.lockedSelection.concat(this.currentSelection);
      this.lockedSelection.filter(function (selection, index, array) {
        return array.map(function (s) {
          return s.id;
        }).indexOf(selection.id) != index;
      });
    },
    reload: function reload() {
      this.get();
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "network-data-table"
  }, [_vm._t("menu"), _vm._ssrNode(" "), _vm.tableData != null && _vm.tableData.length > 0 ? _c('el-table', {
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
        fn: function fn(scope) {
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

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-639ec1b6";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      default: function _default(e) {
        return e;
      }
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
      default: function _default() {}
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
      default: function _default() {}
    }
  },
  data: function data() {
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
    labelClass: function labelClass() {
      return {
        "baseform--top": this.labelPosition == "top",
        "baseform--left": this.labelPosition == "left",
        "baseform--right": this.labelPosition == "right"
      };
    },
    hasActions: function hasActions() {
      return !!this.$slots.actions;
    }
  },
  watch: {
    form: {
      handler: function handler() {
        var _this = this;

        if (this.$refs.form) {
          Object.keys(this.formRules).forEach(function (key) {
            if (_this.form[key]) {
              delete _this.formRules[key];
            }
          });
          this.$refs.form.validate();
        }
      },
      deep: true,
      immediate: true
    },
    editMode: {
      handler: function handler(isEnabled) {
        this.editing = isEnabled;
        isEnabled ? this.registerWatchers() : this.destroyWatchers();
        this.edited = {};
      },
      immediate: true
    },
    editing: {
      handler: function handler(isEnabled) {
        isEnabled ? this.registerWatchers() : this.destroyWatchers();
        this.edited = {};
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$events.on("editItem", function (data) {
      _this2.editing = false;

      _this2.reset();

      _this2.$nextTick(function () {
        Object.assign(_this2.form, data);
        _this2.editing = true;

        _this2.$emit("afterFormDataLoaded");
      });
    });
    this.$events.on("createItem", function () {
      _this2.editing = false;

      _this2.reset();
    });
    this.$events.on("resetBaseForm", function () {
      _this2.reset();
    });
    Object.assign(this.formRules, this.rules);
  },
  methods: {
    patchURL: function patchURL() {
      var url = this.url;

      if (this.updateUrl) {
        url = this.updateUrl;
      } else if (this.form.id && !this.disableUrlGen) {
        url = "".concat(url, "/").concat(this.form.id);
      }

      return url;
    },
    clearValidation: function clearValidation() {
      this.$refs.form.clearValidate();
    },
    destroyWatchers: function destroyWatchers() {
      this.editWatchers.map(function (watcher) {
        return watcher();
      });
      this.editWatchers = [];
    },
    closeSidebar: function closeSidebar() {
      if (this.hasSidebarForm) {
        this.$events.fire("closeit");
      }
    },
    patch: function patch() {
      var _this3 = this;

      this.clearValidation();
      return this.$http.patch(this.patchURL(), this.beforeSave(this.edited), {
        headers: {
          "Content-Type": " application/merge-patch+json"
        }
      }).then(function () {
        _this3.edited = {};

        _this3.$message.success(_this3.$t(_this3.successUpdateMessage));

        _this3.$emit("success-update");

        _this3.closeSidebar();
      }).catch(function (err) {
        _this3.$emit("errors", err.response.data.errors);

        if (err.response.status == "422") {
          _this3.validate(err.response.data.errors);

          _this3.form.errors = err.response.data.errors;
        } else {
          _this3.$message.error(_this3.$t("common.msgs.error"));

          _this3.networkError = true;
        }
      });
    },
    put: function put() {
      var _this4 = this;

      this.clearValidation();
      return this.$http.put(this.patchURL(), this.beforeSave(this.form), {
        headers: {
          "Content-Type": " application/json"
        }
      }).then(function () {
        _this4.$message.success(_this4.$t(_this4.successUpdateMessage));

        _this4.$emit("success-update");

        _this4.closeSidebar();
      }).catch(function (err) {
        _this4.$emit("errors", err.response.data.errors);

        if (err.response.status == "422") {
          _this4.validate(err.response.data.errors); // Can be improvepd with class...

        } else {
          _this4.$message.error(_this4.$t("common.msgs.error"));

          _this4.networkError = true;
        }
      });
    },
    reset: function reset() {
      var _this5 = this;

      var formName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "form";
      this.$nextTick(function () {
        if (_this5.$refs[formName] !== undefined) {
          _this5.$refs[formName].resetFields();
        }
      });
    },
    registerWatchers: function registerWatchers() {
      for (var item in this.form) {
        // This horrendous hack need to be change by a prop containing the field you decide to deep search
        if (_typeof(this.form[item]) === "object" && ["lifecycle"].indexOf(item) != -1) {
          for (var subItem in this.form[item]) {
            this.registerWatcher("".concat(item, ".").concat(subItem));
          }
        } else {
          this.registerWatcher(item);
        }
      }
    },
    registerWatcher: function registerWatcher(key) {
      var watcher = function watcher(newValue) {
        var keys = key.split(".");

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

      this.editWatchers.push(this.$watch("form.".concat(key), watcher, {
        deep: true,
        immediate: true
      }));
    },
    scrollToError: function scrollToError() {
      if (document.querySelectorAll(".is-error").length) {
        document.querySelectorAll(".is-error")[0].scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    store: function store() {
      var _this6 = this;

      this.clearValidation();
      return this.$http.post(this.url, this.beforeSave(this.form)).then(function (res) {
        _this6.$message.success(_this6.$t(_this6.successPostMessage));

        _this6.$emit("success-save", res.data);

        _this6.closeSidebar();
      }).catch(function (err) {
        _this6.$emit("errors", err.response.data.errors);

        if (err.response.status == "422") {
          _this6.validate(err.response.data.errors);

          if (_this6.toastErrors) _this6.errorToast(err.response.data.errors);
        } else {
          _this6.networkError = true;
        }
      });
    },
    errorToast: function errorToast(errors) {
      var error;
      Object.keys(errors).forEach(function (key) {
        error = errors[key].join();
      });
      this.$message.warning(error);
    },
    validationErrors: function validationErrors(errors) {
      var _this7 = this;

      var error;
      this.validationErors = [];
      Object.keys(errors).forEach(function (key) {
        error = errors[key].join();

        _this7.validationErors.push(error);
      });
    },
    validate: function validate(validation) {
      var _this8 = this;

      var errors = {};

      for (var error in validation) {
        errors[error] = validation[error].map(function (err) {
          return {
            validator: function validator(r, v, callback) {
              return callback(new Error(err));
            },
            trigger: "blur",
            required: true
          };
        });
      }

      this.formRules = errors;

      if (this.showErrors) {
        this.validationErrors(validation);
      }

      this.$nextTick(function () {
        return _this8.scrollToError();
      });
    },

    /**
     * Create or Update Item
     */
    handleSave: function handleSave() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this9.networkError = false;
                _this9.loadingSave = true;

                if (!_this9.url) {
                  _context.next = 17;
                  break;
                }

                if (!(_this9.editMode || _this9.editing)) {
                  _context.next = 13;
                  break;
                }

                if (!(_this9.updateMethod === "put")) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return _this9.put();

              case 7:
                _context.next = 11;
                break;

              case 9:
                _context.next = 11;
                return _this9.patch();

              case 11:
                _context.next = 15;
                break;

              case 13:
                _context.next = 15;
                return _this9.store();

              case 15:
                _context.next = 18;
                break;

              case 17:
                _this9.$emit("click-button");

              case 18:
                _this9.loadingSave = false;

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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
      "click": function click($event) {
        return _vm.handleSave();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t(_vm.submitBtnLabel)) + "\n      ")])], 1)], 2)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-8a913e28";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,BaseManager: __vue_component__$2,BaseNetworkTable: __vue_component__$1,BaseForm: __vue_component__});var install = function installVbase(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,BaseManager: __vue_component__$2,BaseNetworkTable: __vue_component__$1,BaseForm: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;