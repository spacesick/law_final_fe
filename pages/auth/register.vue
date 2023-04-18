<template>
  <div class="flex items-center justify-center w-full p-2">
    <form
      class="block p-6 bg-white border border-gray-200 rounded-lg shadow w-1/2"
    >
      <h1 class="my-5 font-bold text-lg text-blue-700">REGISTER ACCOUNT</h1>
      <div class="flex flex-col gap-4">
        <CInput v-model="email" v-bind="inputData[0]" />
        <CInput v-model="username" v-bind="inputData[1]" />
        <CInput v-model="password" v-bind="inputData[2]" />
        <CInput v-model="confirmPassword" v-bind="inputData[3]" />
      </div>
      <button
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        @click.prevent="submitForm"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CInput from '~/components/auth/CInput.vue'
import validateEmail from '~/utils/validateEmail'

export default {
  components: {
    CInput,
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      inputData: [
        {
          label: 'Email',
          type: 'email',
          placeholder: 'name@gmail.com',
          val: '',
        },
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
        {
          label: 'Confirm Password',
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
    submitForm: function () {
      if (
        !validateEmail(this.email) ||
        !this.username ||
        !this.password ||
        !(this.password === this.confirmPassword)
      ) {
        // remove alert on prod
        alert('gagal')
        return false
      }

      this.setToken('test-token')
      this.$router.push('/')
    },
  },
}
</script>
