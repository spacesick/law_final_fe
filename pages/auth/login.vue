<template>
  <div class="flex flex-col items-center justify-center w-full p-2">
    <form
      ref="form"
      class="block p-6 bg-white border border-gray-200 rounded-lg shadow md:w-96 w-3/4"
    >
      <h1 class="font-bold text-lg text-blue-700">Login</h1>
      <div class="flex flex-col gap-4 mt-5">
        <CInput v-model="username" v-bind="inputData[0]" />
        <CInput v-model="password" v-bind="inputData[1]" />
      </div>
      <button
        class="mt-4 text-white bg-blue-700 border-blue-800 hover:bg-blue-800 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        @click.prevent="submitForm"
      >
        Login
      </button>
      <div class="flex justify-center text-sm mt-3">
        <span
          >Belum punya akun?
          <router-link
            :to="{ path: '/auth/register' }"
            class="text-blue-600 hover:text-blue-700"
            >Daftar</router-link
          ></span
        >
      </div>
    </form>
    <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { parseJwt } from '~/store/auth';
import CInput from '~/components/auth/CInput.vue';

export default {
  components: {
    CInput,
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('lawToken')) {
      const jwtPayload = parseJwt(localStorage.getItem('lawToken'));
      if (jwtPayload.exp < Date.now() / 1000) {
        // token expired
        localStorage.removeItem('lawToken');
        next();
      }
      next('/');
    } else {
      next();
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      inputData: [
        {
          label: 'Username',
          type: 'text',
          placeholder: 'mrhacka',
          val: '',
          required: true,
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: '********',
          val: '',
          required: true,
        },
      ],
      error: '',
    };
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
      setUsername: 'auth/setUsername'
    }),
    submitForm: async function () {
      if (!this.$refs.form.checkValidity()) {
        // remove alert on prod
        this.error = "Invalid form"
        return
      }

      await this.$axios.$post('http://34.28.48.143/auth/token/', {
        username: this.username,
        password: this.password
      }).then((res) => {
        this.setToken(res.access)
        this.setUsername(res.username)
        this.$router.push('/')
      }).catch((e) => {
        this.error = e
        console.log(this.error)
      })
    },
  },
};
</script>
