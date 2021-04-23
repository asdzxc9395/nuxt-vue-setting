<template>
  <div v-if="isLoading" class="v-overlay v-overlay--active" style="z-index: 203">
    <v-progress-circular
      :size="100"
      style="top: 50%;left: 50%;color: #fff"
      indeterminate
    >
      <div class="loading-text">Loading...</div>
    </v-progress-circular>
  </div>
</template>

<script>
  // 로딩 시작 : this.$nuxt.$loading.start()
  // 로딩 종료 : this.$nuxt.$loading.finish()
  export default {
    name: "Loading",

    data: () => ({
      isLoading: false
    }),

    mounted() {
      this.$nextTick(() => {
        // 로딩 프로세스 시작
        this.$nuxt.$loading.start()
        // 0.5초 뒤에 로딩 프로세스 종료
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
    },

    methods: {
      start() {
        this.isLoading = true
      },
      finish() {
        setTimeout(() => this.isLoading = false, 500)
      }
    }
  }
</script>
