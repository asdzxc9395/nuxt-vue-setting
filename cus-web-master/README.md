# cus-web-master

> Cus Web Service

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.

ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

# nuxt auth 관련 설정

``` bash
$ npm in stall @nuxtjs/auth-next (v5 version)

$ npm in stall @nuxtjs/auth (~ v4)
```

## set nuxt.config.js

1. axios전송과 auth인증을 위한 modules 세팅
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

2. set middleware 

  router: {
  middleware: ['auth']
}

- 특정 요소에서 auth을 false 할 경우

  export default {
    auth: false
  }

- guest로 선언시, loggedIn이 true로 활성화되며, default페이지로 redirect된다. 

  export default {
  auth: 'guest'
}

3. set Scheme 

- 스키마는 인증 논리를 뜻한다. Strategy 는 스키마에 구성된 인스턴스이다.
- 여러개의 스키마와 Strategy를 프로젝트에 저장 할 수 있다.
- strategy이름은 key, value는 설정값.



auth: {
  strategies: {
    local1: { scheme: 'local', /* ... */ },
    local2: { scheme: 'local', /* ... */ },
    custom: { scheme: '~/schemes/customStrategy', /* ... */ },
  }
}


4. example 

``` bash
<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.username" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
```
``` bash
auth: {
  strategies: {
    local: {
      token: {
        property: 'token',
        // required: true,
        // type: 'Bearer'
      },
      user: {
        property: 'user',
        // autoFetch: true
      },
      endpoints: {
        login: { url: '/api/auth/login', method: 'post' },
        logout: { url: '/api/auth/logout', method: 'post' },
        user: { url: '/api/auth/user', method: 'get' }
      }
    }
  }
}

``` 