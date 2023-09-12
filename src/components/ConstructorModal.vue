<template>
  <div class="constructor-modal">
    <div class="constructor-modal__wrapper">
      <div class="constructor-modal__close" @click="hideDialog">
        <img src="@/assets/images/close-icon.svg" alt="">
      </div>
      <h2 class="constructor-modal__title">Благодарим за обращение!</h2>
      <p class="constructor-modal__descr">
        Менеджер уже получил Вашу контактную информацию, он свяжется с Вами в течение 10 минут
      </p>
    </div>
  </div>
</template>

<script>
import toggleMixin from '../mixins/toggleMixin'

export default {
  mixins: [toggleMixin]
}
</script>

<style lang="scss">
  .constructor-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &__wrapper {
      position: relative;
      padding: 50px 87px;
      background: #fff;
      border-radius: 10px;
    }

    &__close {
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;
    }

    &__title {
      margin-bottom: 10px;
      font-size: 32px;
      font-weight: 700;
      line-height: 39px;
      text-align: center;
      color: var(--color-main);
    }

    &__descr {
      font-family: 'Roboto', sans-serif;
      font-size: 22px;
      font-weight: 300;
      line-height: 29px;
      text-align: center;
      color: var(--color-main);
    }
  }
</style>