<template>
  <form class="form" @submit.prevent>
    <h2 class="form__title">Заказ</h2>
    <div class="form-dropdown" :class="{ 'form-dropdown_active': $store.state.liters.show }">
      <div class="form-dropdown__inner" @click="openDropdown">
        <p class="form-dropdown__name">{{ $store.state.liters.selected }}</p>
      </div>
      <ul class="form-dropdown__list">
        <li class="form-dropdown__item" v-for="(liter, index) in getLiters" :key="index" @click="selectedLiters(index)">
          {{ liter.name }}
        </li>
      </ul>
    </div>
    <div class="form-total">
      <p class="form-total__title">Итого:</p>
      <p class="form-total__price">{{ totalPrice }}&nbsp;₽</p>
    </div>
    <div class="form-inputs">
      <input class="custom-input form__input" ref="name" v-model="name" type="text" name="name" placeholder="Имя" />
      <input class="custom-input form__input" ref="phone" v-model="phone" type="text" name="phone"
        placeholder="+7 (___)-___-__-__" />
    </div>
    <label class="custom-checkbox form__checkbox" @change="selectedCheckbox(index)">
      <input class="custom-checkbox__input" type="checkbox"
        :class="{ 'custom-checkbox__input_active': $store.state.kredit }">
      <span class="custom-checkbox__check"></span>
      <span class="custom-checkbox__text">Покупка в рассрочку</span>
    </label>
    <input type="hidden" name="comment" :value="$store.state.kredit ? 'Покупка в рассрочку.' : ''">
    <p class="form__info">
      Менеджеры свяжутся с вами в ближайшее время для уточнения деталей заказа
    </p>
    <button class="btn form__btn" @click="sendForm">Заказать</button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: '',
      phone: '',
    }
  },
  computed: {
    ...mapGetters(['totalPrice']),
    getLiters() {
      return this.$store.state.liters.items;
    },
    getOrderPrice() {
      return this.$store.state.orderPrice;
    }
  },
  methods: {
    selectedCheckbox(index) {
      this.$store.dispatch('buyByKredit', index);
    },
    selectedLiters(index) {
      this.$store.dispatch('selectedLiters', index);
    },
    openDropdown() {
      this.$store.state.liters.show = !this.$store.state.liters.show;
    },
    sendForm() {
      let valid = true
      if (!this.name.length || !this.phone.length) {
        valid = false
        this.$refs.name.classList.add('active')
        this.$refs.phone.classList.add('active')
      }
      if (valid) {
        this.$store.state.dialogVisible = !this.$store.state.dialogVisible;
        for (let i = 0; i < this.$store.state.dops.length; i++) {
          this.$store.state.dops[i].selected = false;
        }
        this.$store.state.kredit = false;
        this.$refs.name.classList.remove('active')
        this.$refs.phone.classList.remove('active')
        this.name = ""
        this.phone = ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 342px;
  width: 100%;
  padding: 50px 30px;
  box-shadow: 0px 4px 15px 0px #AAAAAA33;
  border-radius: 10px;

  &__title {
    margin-bottom: 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 35px;
    font-weight: 700;
    line-height: 43px;
    text-align: center;
    color: var(--color-main);
  }

  &-dropdown {
    position: relative;
    margin-bottom: 30px;

    &_active {
      .form-dropdown__inner {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: none;
        background: rgba(224, 224, 224, .5);

        &::before {
          transform: rotate(180deg);
        }
      }

      .form-dropdown__list {
        opacity: 1;
        transform: none;
      }
    }

    &__inner {
      position: relative;
      display: flex;
      height: 54px;
      padding: 15px 0 15px 15px;
      margin: 0 auto;
      border: 2px solid var(--color-green);
      border-radius: 2px;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: 21px;
        right: 12px;
        width: 16px;
        height: 9px;
        background-image: url('../assets/images/arrow-down.svg');
        background-repeat: no-repeat;
        transition: all .3s ease-in-out;
      }
    }

    &__name {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
      color: var(--color-green);
    }

    &__list {
      position: absolute;
      width: 100%;
      border: 2px solid var(--color-green);
      border-top: none;
      background: #fff;
      opacity: 0;
      overflow: hidden;
      transition: all .3s ease-in-out;
    }

    &__item {
      padding: 15px 0 15px 15px;
      border-bottom: 1px solid #E0E0E0;
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
      color: var(--color-green);
      cursor: pointer;
      transition: background .3s ease-in-out;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #E0E0E0;
      }
    }
  }

  &-total {
    margin-bottom: 30px;
    padding: 20px 0;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;

    &__title {
      font-family: 'Roboto', sans-serif;
      font-size: 35px;
      font-weight: 700;
      line-height: 41px;
      text-align: center;
    }

    &__price {
      font-family: 'Roboto', sans-serif;
      font-size: 50px;
      font-weight: 900;
      line-height: 50px;
      text-align: center;
    }
  }

  &-inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  &__input {
    width: 282px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  &__info {
    margin-bottom: 33px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    text-align: center;
    color: #A3A3A3;
  }

  &__btn {
    margin: 0 auto;
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 17px;
    color: #fff;
  }
}
</style>