<template>
  <div class="baseform" :class="labelClass">
    <el-form
      ref="form"
      label-width="100%"
      :model="form"
      label-position="top"
      :rules="formRules"
      :disabled="disabled"
      size="small"
      :class="formClass"
    >
      <el-alert
        v-if="networkError"
        :title="$t('common.msgs.err_network')"
        type="error"
        class="my-4"
        show-icon
      />

      <el-alert
        v-if="showErrors && validationErors.length > 0"
        title="Please fix validation errors"
        type="error"
        show-icon
      >
        <ul class="p-0">
          <li v-for="error in validationErors.slice().reverse()" :key="error">
            {{ error }}
          </li>
        </ul>
      </el-alert>
      <slot />

      <slot v-if="hasActions" name="actions" />

      <div v-else class="ml-auto mt-3">
        <el-button
          type="primary"
          :class="btnClass"
          mini
          plain
          :loading="loadingSave"
          :disabled="loadingSave"
          @click="handleSave()"
        >
          {{ $t(submitBtnLabel) }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
export default {
   name: 'VbaseSample',
  props: {
    form: {
      type: Object,
      required: true,
    },

    editMode: {
      type: Boolean,
      default: false,
    },
    updateMethod: {
      type: String,
      default: "patch",
    },
    url: {
      type: String,
      default: "",
    },
    updateUrl: {
      type: String,
      default: "",
    },
    labelPosition: {
      type: String,
      default: "top",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    beforeSave: {
      type: Function,
      default: (e) => e,
    },
    toastErrors: {
      type: Boolean,
      default: false,
    },
    showErrors: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Function,
      default: () => {},
    },

    disableUrlGen: {
      type: Boolean,
      default: false,
    },

    submitBtnLabel: {
      type: String,
      default: "common.action.save",
    },

    successPostMessage: {
      type: String,
      default: "common.msgs.post",
    },
    successUpdateMessage: {
      type: String,
      default: "common.msgs.update",
    },

    hasSidebarForm: {
      type: Boolean,
      default: false,
    },
    btnClass: {
      type: String,
      default: "",
    },

    formClass: {
      type: String,
      default: "capte__form",
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      loadingSave: false,
      editWatchers: [],
      edited: {},
      validationErors: [],
      editing: false,
      networkError: false,
      formRules: {},
    };
  },

  computed: {
    labelClass() {
      return {
        "baseform--top": this.labelPosition == "top",
        "baseform--left": this.labelPosition == "left",
        "baseform--right": this.labelPosition == "right",
      };
    },
    hasActions() {
      return !!this.$slots.actions;
    },
  },

  watch: {
    form: {
      handler() {
        if (this.$refs.form) {
          Object.keys(this.formRules).forEach((key) => {
            if (this.form[key]) {
              delete this.formRules[key];
            }
          });
          this.$refs.form.validate();
        }
      },
      deep: true,
      immediate: true,
    },

    editMode: {
      handler(isEnabled) {
        this.editing = isEnabled;
        isEnabled ? this.registerWatchers() : this.destroyWatchers();
        this.edited = {};
      },
      immediate: true,
    },

    editing: {
      handler(isEnabled) {
        isEnabled ? this.registerWatchers() : this.destroyWatchers();
        this.edited = {};
      },
      immediate: true,
    },
  },
  mounted() {
    this.$events.on("editItem", (data) => {
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
      let { url } = this;
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
      this.editWatchers.map((watcher) => watcher());
      this.editWatchers = [];
    },
    closeSidebar() {
      if (this.hasSidebarForm) {
        this.$events.fire("closeit");
      }
    },

    patch() {
      this.clearValidation();

      return this.$http
        .patch(this.patchURL(), this.beforeSave(this.edited), {
          headers: {
            "Content-Type": " application/merge-patch+json",
          },
        })
        .then(() => {
        
          this.edited = {};
          this.$message.success(this.$t(this.successUpdateMessage));
          this.$emit("success-update");
          this.closeSidebar();
        })
        .catch((err) => {
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
      return this.$http
        .put(this.patchURL(), this.beforeSave(this.form), {
          headers: {
            "Content-Type": " application/json",
          },
        })
        .then(() => {
          this.$message.success(this.$t(this.successUpdateMessage));
          this.$emit("success-update");
          this.closeSidebar();
        })
        .catch((err) => {
          this.$emit("errors", err.response.data.errors);
          if (err.response.status == "422") {
            this.validate(err.response.data.errors);

            // Can be improvepd with class...
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
        if (
          typeof this.form[item] === "object" &&
          ["lifecycle"].indexOf(item) != -1
        ) {
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

      this.editWatchers.push(
        this.$watch(`form.${key}`, watcher, { deep: true, immediate: true })
      );
    },

    scrollToError() {
      if (document.querySelectorAll(".is-error").length) {
        document
          .querySelectorAll(".is-error")[0]
          .scrollIntoView({ behavior: "smooth" });
      }
    },

    store() {
      this.clearValidation();

      return this.$http
        .post(this.url, this.beforeSave(this.form))
        .then((res) => {
          this.$message.success(this.$t(this.successPostMessage));
          this.$emit("success-save", res.data);
          this.closeSidebar();
        })
        .catch((err) => {
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
      Object.keys(errors).forEach((key) => {
        error = errors[key].join();
      });

      this.$message.warning(error);
    },

    validationErrors(errors) {
      let error;
      this.validationErors = [];
      Object.keys(errors).forEach((key) => {
        error = errors[key].join();
        this.validationErors.push(error);
      });
    },

    validate(validation) {
      const errors = {};

      for (const error in validation) {
        errors[error] = validation[error].map((err) => ({
          validator: (r, v, callback) => callback(new Error(err)),
          trigger: "blur",
          required: true,
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
    },
  },
};
</script>

