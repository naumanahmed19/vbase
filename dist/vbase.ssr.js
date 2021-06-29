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

var __vue_module_identifier__ = "data-v-149cdefc";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,BaseForm: __vue_component__});var install = function installVbase(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,BaseForm: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;