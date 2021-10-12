<template>
  <div
    class="baseform form-preview"
    :class="readOnly ?'readOnly':'' "
  >
    <el-form
      ref="form"
      :label-width="labelWidth"
      :model="form"
      :label-position="labelPosition"
      :rules="rules"
      :disabled="disabled"
      :size="size"
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
          <li
            v-for="error in validationErors.slice().reverse()"
            :key="error"
          >
            {{ error }}
          </li>
        </ul>
      </el-alert>
      <slot />

      <div v-if="!readOnly">
        <slot
          v-if="hasActions"
          name="actions"
        />

        <div
          v-else
          class="ml-auto mt-3"
        >
          <el-button
            type="primary"
            style="margin-top:25px"
            :class="btnClass"
            data-tc="submitButton"
            mini
            plain
            :loading="loadingSave"
            :disabled="loadingSave"
            @click="handleSave()"
          >
            {{ $t( editing ? updateBtnLabel : submitBtnLabel ) }}
            &nbsp; {{ submitBtnLabelPostfix }}
          </el-button>
          <el-button
            v-if="hasCancelBtn"
            type="danger"
            style="margin-top:25px"
            :class="btnClass"
            data-tc="cancelButton"
            mini
            plain
            :disabled="loadingSave"
            @click="handleCancel"
          >
            {{ cancelBtnLabel }}
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
/* eslint-disable */ 
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    labelPosition:{
      type: String,
      default: "top",
    },
    labelWidth: {
      type: String,
      default: "100%",
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    updateMethod: {
      type: String,
      default: "put",
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
      default: "Add",
    },
    cancelBtnLabel: {
      type: String,
      default: "Cancel",
    },
    
    hasCancelBtn: {
      type: Boolean,
      default: false,
    },
    updateBtnLabel:{
      type: String,
      default: "Update",
    },
    submitBtnLabelPostfix:{
      type: String,
      default: "",
    },
    readOnly:{
      type: Boolean,
      default: false,
    },
  

    successPostMessage: {
      type: String,
      default: "Successfully Saved",
    },
    successUpdateMessage: {
      type: String,
      default: "Successfully Updated",
    },
    errorMessage:{
       type: String,
      default: "oops! Somthing went wrong",
   
    },

    inWindow: {
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
    idKey: {
      type: String,
      default: '',
    },
    postPayload:{
      type: Array,
       default: () => [],
    },
    putPayload:{
      type: Array,
       default: () => [],
    },
    size:{
      type:String,
      default: 'small'
    },
    baseManagerName:{
      type:String,
      default: ''
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
    
  // form: {
    //   handler() {
    //     if (this.$refs.form) {
    //       console.log("validate again....")
    //       Object.keys(this.formRules).forEach((key) => {
    //         if (this.form[key] ) {
    //           console.log(this.form[key])
    //           delete this.formRules[key];
    //         }
    //       });
    //       this.$refs.form.validate();
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },

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

    form: {
      handler() {
        if(this.form[this.idKey]){
          console.log(this.form,'in edit')
          this.editing = true
        }
      },
        immediate: true,
    }
  },
  mounted() {

  
    this.$events.on("editItem", (data) => {
      this.editing = false;
      this.reset();
      this.$nextTick(() => {
        Object.assign(this.form, data);
        console.log("enable editing....")
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

    //check if form emtpy if not then enable edit mode

 
  },

  methods: {
    handleCancel(){
      this.reset()
      this.$emit('onCancel')
    },
    isEditMode(){
      return true
    },
    patchURL() {
      let { url } = this;
      url  = `${url}/${this.form[this.idKey]}`;
      if(this.updateUrl && this.idKey){
         url = `${this.updateUrl}/${this.form[this.idKey]}`;
      }else if (this.updateUrl) {
        url = this.updateUrl;
      } 
      
      // else if (this.form.id && !this.disableUrlGen) {
      //   url = `${url}/${this.form.id}`;
      // }
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
      if (this.inWindow) {
        console.log('baseform', this.baseManagerName)
        this.$events.fire("reload", this.baseManagerName);
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
    
      let payload = this.beforeSave(this.form);

      /**
       * Filter payload before making request
       */
      if(this.putPayload.length){
          payload = _.pick(payload,(this.putPayload))
      }
      this.clearValidation();
       console.log(this.patchURL())
      return this.$http
        .put(this.patchURL(),payload, {
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
            this.$message.error(this.$t(this.errorMessage));
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

      let payload = this.beforeSave(this.form);
      /**
       * Filter payload before making request
       */
        if(this.postPayload.length){
            payload = _.pick(payload,(this.postPayload))
        }

      return this.$http
        .post(this.url, payload)
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
          Object.assign(this.formRules, this.rules);
     
       this.$refs.form.validate(async(valid) => {
         if(!valid) {
            this.$nextTick(() => this.scrollToError());
           return
         }
      
      this.networkError = false;
      this.loadingSave = true;

      if (this.url ||this.updateUrl ) {
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
       });
      this.loadingSave = false;
    },
  },
};
</script>
<style lang="scss" scoped>

.el-textarea.is-disabled .el-textarea__inner{
    background-color: #FFF !important;
    border-color: transparent;
    cursor: not-allowed;
    color: #606266;
    font-family: 'Roboto';
    line-height: 2.0;
    font-size: 14px;
    padding: 0,
  }
</style>
