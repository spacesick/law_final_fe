<template>
  <div class="flex items-center justify-center w-full p-2">
    <form
      ref="form"
      class="block p-6 bg-white border border-gray-200 rounded-lg shadow md:w-96 w-3/4"
    >
      <h1 class="font-bold text-lg text-blue-700 text-xl">Create Account</h1>
      <div class="flex flex-col gap-4 mt-5">
        <CInput v-model="email" v-bind="inputData[0]" />
        <CInput v-model="first_name" v-bind="inputData[4]" />
        <CInput v-model="last_name" v-bind="inputData[5]" />
        <CInput v-model="username" v-bind="inputData[1]" />
        <CInput v-model="password" v-bind="inputData[2]" />
        <CInput v-model="confirmPassword" v-bind="inputData[3]" />
      </div>
      <button
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        @click.prevent="submitForm"
      >
        Submit
      </button>
      <div class="flex justify-center text-sm mt-3">
        <span>Sudah punya akun? <router-link :to="{ path: '/auth/login'}" class="text-blue-600 hover:text-blue-700">Login</router-link></span>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CInput from '~/components/auth/CInput.vue'
import { parseJwt } from '~/store/auth'

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
      username: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      inputData: [
        {
          label: 'Email',
          type: 'email',
          placeholder: 'name@gmail.com',
          val: '',
          required: true
        },
        {
          label: 'Username',
          type: 'text',
          placeholder: 'mrhacka',
          val: '',
          required: true
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: '********',
          val: '',
          required: true
        },
        {
          label: 'Confirm Password',
          type: 'password',
          placeholder: '********',
          val: '',
          required: true
        },
        {
          label: 'First Name',
          type: 'text',
          placeholder: 'jake',
          val: '',
          required: false
        },
        {
          label: 'Last Name',
          type: 'text',
          placeholder: 'paul',
          val: '',
          required: false
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
    }),
    submitForm: async function () {
      if (!this.$refs.form.checkValidity() ||
        !(this.password === this.confirmPassword)
      ) {
        // remove alert on prod
        alert('gagal')
        return false
      }

      const res = await this.$axios.$post(process.env.AUTH_ENDPOINT + 'register/', {
        email: this.email,
        username: this.username,
        password: this.password,
        first_name: '',
        last_name: '',
      })
      // console.log(res)

      this.setToken(res.token.access)
      this.$router.push('/')
    },
  },
}
</script>
