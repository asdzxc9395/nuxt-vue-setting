<template>
  <div id="appRoot">
    <nuxt/>
  </div>
</template>

<script>
  export default {
    created() {
        console.log('default')
    },
    watch: {
      $route: {
        handler(to, from) {
          let classList = document.body.classList
            console.log(classList)
          for (let className of classList) {
            document.body.classList.remove(className)
          }
          let random = Math.floor(Math.random() * (3 - 1 + 1)) + 1
          document.body.classList.add("bg" + random)
          
        },
        immediate: true,
      }
    },
  }
</script>

