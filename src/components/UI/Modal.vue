<template>
  <div class="modal" v-if="show" @click.stop="hideDialog">
    <slot></slot>
  </div>
</template>

<script>
import toggleMixin from '../../mixins/toggleMixin'

export default {
  mixins: [toggleMixin]
}
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  position: fixed;
  display: flex;
  z-index: 10;
}
</style>