<template>
  <v-app dark  id="appRoot" class="app">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      id="appDrawer"
      class="app--drawer"
      v-model="drawer"
      width="260"
      fixed
      app
    >
    <v-toolbar
          color="secondary logo-toolbar"
          dark
          @click="$router.push('/')"
        >
          <img src="/images/mari.png" alt="mari" width="20%">
          <img src="/images/mari.png" alt="mari" width="20%">
          <img src="/images/mari.png" alt="mari" width="20%">
          <img src="/images/mari.png" alt="mari" width="20%">
          <img src="/images/mari.png" alt="mari" width="20%">
        </v-toolbar>
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="false">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      
      
      
      <v-toolbar-title v-text="'Mari Fan page'"></v-toolbar-title>
      <v-btn
        class="pr-5 pl-5"
        icon
        @click="handlerLogout()"
      >logout
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'layout',
    mounted() {
      console.log('layout')
    },
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },

  methods: {
    handlerLogout() {
      this.$store.dispatch('LOGOUT').then(() => {
          this.$auth.logout()
          // window.location.href = '/login'
          this.$router.push('/login')
        })
    },
    getuser() {
      console.log(this.$store.state)
    }
  }
  }
</script>

<style lang="stylus" scoped>
  #appDrawer
    overflow hidden

    .drawer-menu--scroll
      height calc(100vh - 48px)
      overflow auto

  .logo-toolbar .v-toolbar__content
    padding 0 !important

  .setting-fab
    top 50% !important
    right 0
    border-radius 0

  .page-wrapper
    min-height calc(100vh - 64px - 50px - 81px)
    margin-bottom 50px

  .app--footer
    position absolute
    bottom 0
    width 100%

</style>
