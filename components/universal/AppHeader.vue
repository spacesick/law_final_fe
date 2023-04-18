<template>
  <nav class="bg-white border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <nuxt-link to="/" class="flex items-center">
        <img src="/car.gif" class="h-8 mr-3 mt-1" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap"
          >Car Rent</span
        >
      </nuxt-link>
      <Fragment v-if="tokenExist">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
          >
            <li>
              <nuxt-link
                to="/about"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >About</nuxt-link
              >
            </li>
            <li>{{ token }}</li>
            <li>
              <button @click="setToken">mutate</button>
            </li>
            <li>
              <button class="text-red-500" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </Fragment>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  props: ['tokenExist'],
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
      removeToken: 'auth/removeToken',
    }),
    logout() {
      this.removeToken()
      this.$router.push('/auth/login')
    },
  },
}
</script>
