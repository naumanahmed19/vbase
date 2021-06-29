//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'VbaseSample',
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
  BaseForm: __vue_component__
});

// Import vue components

const install = function installVbase(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__ as BaseForm };
