<template>
  <div class="flex items-center justify-center w-full p-2">
    <form
      class="block p-6 bg-white border border-gray-200 rounded-lg shadow w-1/2"
    >
      <h1 class="my-5 font-bold text-lg text-blue-700">Login</h1>
      <div class="flex flex-col gap-4">
        <CInput v-model="username" v-bind="inputData[0]" />
        <CInput v-model="password" v-bind="inputData[1]" />
      </div>
      <div class="flex justify-end">
        <button
          class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          @click.prevent="submitForm"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CInput from '~/components/auth/CInput.vue'

export default {
  components: {
    CInput,
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('lawToken')) {
      const jwtPayload = parseJwt(localStorage.getItem('lawToken'));
      if (jwtPayload.exp < Date.now()/1000) {
        // token expired
        localStorage.removeItem('lawToken');
        next()
      }
      next('/');
    } else {
      next();
    }
  },
  data() {
    return {
      email: '',
      password: '',
      inputData: [
      {
          label: 'Username',
          type: 'text',
          placeholder: 'mrhacka',
          val: '',
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: '********',
          val: '',
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
    }),
    submitForm: async function () {
      if (
        !this.username ||
        !this.password
      ) {
        // remove alert on prod
        alert('gagal')
        return false
      }

      const res = await this.$axios.$post('http://34.28.48.143/api/token/', {
        username: this.username,
        password: this.password
      })

      this.setToken(res.access)
      this.$router.push('/')
    },
  },
}

function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
</script>
