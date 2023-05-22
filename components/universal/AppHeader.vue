<template>
  <nav class="bg-white border-gray-200">
    <div
      class="max-w-screen-xl flex flex-col md:flex-row justify-between mx-auto p-4 items-stretch md:items-center"
    >
      <div class="w-full md:w-fit flex justify-between">
        <nuxt-link to="/" class="flex items-center">
          <img src="/car.gif" class="h-8 mr-3 mt-1" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap"
            >Car Rent</span
          >
        </nuxt-link>
        <Fragment v-if="tokenExist">
          <button
            data-te-collapse-init
            data-te-target="#navbar-default"
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
        </Fragment>
      </div>
      <Fragment v-if="tokenExist" class="flex-1">
        <div
          id="navbar-default"
          class="!visible hidden w-full md:block md:w-auto"
          data-te-collapse-item
        >
          <ul
            class="font-bold w-full md:w-fit ml-auto flex flex-col justify-end p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
          >
            <li>
              <nuxt-link
                to="/order"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >Order</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/car"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >Cars</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/about"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >About</nuxt-link
              >
            </li>
            <!-- <li>
                <a
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:cursor-pointer"
                @click="setToken">
                  Mutate
                </a>
              </li> -->
            <li>
              <nuxt-link
                to="/transaction"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >Transaction List</nuxt-link
              >
            </li>
            <li>
              <a
                class="block py-2 pl-3 pr-4 text-red-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 hover:cursor-pointer"
                @click="logout"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </Fragment>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
import { Collapse, Ripple, initTE } from 'tw-elements';

export default {
  name: 'AppHeader',
  props: {
    tokenExist: {
      type: String,
      default: '',
    },
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },
  mounted: () => {
    initTE({ Collapse, Ripple });
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken',
      removeToken: 'auth/removeToken',
    }),
    logout() {
      this.removeToken();
      this.$router.push('/auth/login');
    },
  },
};
</script>
