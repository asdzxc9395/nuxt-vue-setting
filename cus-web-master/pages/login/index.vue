<template>
    <div v-else id="login_conatiner">
      <!-- <img src="~static/images/tke_logo_claim_cmyk_standard_white.png" alt="thyssenkrupp logo" width="400"> -->
      <p class="program_title" v-text="$t('project')"></p>
      <form id="login_form" onsubmit="return false;">
        <div>
          <label class="legend" v-text="$t('login.userId')"></label>
          <input
            ref="userId"
            v-model="loginForm.userId"
            type="text"
            autocomplete="off"
          ></div>
        <div>
          <label class="legend" v-text="$t('login.userPw')"></label>
          <input
            v-model="loginForm.userPw"
            type="password"
            autocomplete="off"
          ></div>
        <button
          v-on:click="handleLogin"
          class="btn_login zoom"
        >
          {{ $t('login.btnLogin') }}
        </button>
      </form>

      <!-- <div data-app>
        <dialog-alerts></dialog-alerts>
        <dialog-alert></dialog-alert>
        <dialog-confirm></dialog-confirm>
      </div> -->
    </div>
</template>

<script>
  // import DialogConfirm from "../../components/common/DialogConfirm";
  // import DialogAlert from "../../components/common/DialogAlert";
  // import DialogAlerts from "../../components/common/DialogAlerts";
  import {errorHandlers} from "../../plugins/error";
  // import Stock from "../stock/index";

  export default {
    name: 'Login',

    head: {
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap'},
      ]
    },

    components: {
      // Stock, 
      // DialogConfirm, 
      // DialogAlert, 
      // DialogAlerts
      },

    data: () => ({
      loginForm: {
        userId: '',
        userPw: '',
      },
    }),

    mounted() {
      this.$refs.userId.focus();

      this.$store.dispatch('INIT').then(() => {
      })

      this.$nuxt.$on('on-error', (props) => {
        errorHandlers(props)
      })
    },

    methods: {
      async handleLogin() {
        if (this.loginForm.userId == "" || this.loginForm.userPw == "") {
          this.$nuxt.$emit('on-alert', {text: this.$t('rules.inputVal')})
          return;
        }

        this.$root.$loading.start()
        try {
          console.log(this.loginForm)
          await this.$store.dispatch('LOGIN', this.loginForm)
          this.$root.$loading.finish()
        } catch (error) {
          this.$root.$loading.finish()
          this.$nuxt.$emit('on-alert', {text: error.message})
        }
      },
    },
  }
</script>


<style lang="stylus" scoped>
  .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat)
    color #000
</style>
