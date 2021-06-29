<template>
  <div class="baseform__section">
    <div class="baseform__section__content">
      <h5 class="text-primary mb-3">
        {{ text }}
      </h5>
      <div class="baseform__section__group">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass">
.baseform__section {
  .baseform__section__content {
    h5 {
      text-transform: capitalize;
      border-bottom:1px solid #eee;
      padding-bottom:10px;
      font-size:14px;
    }
  }
}
</style>
