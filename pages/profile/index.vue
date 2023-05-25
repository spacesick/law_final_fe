<template>
    <div class="grid grid-cols-6 gap-4 pt-4">
        <div class="flex md:flex-col ml-4 space-x-3 col-start-1 md:col-start-2 col-span-4 md:space-x-0 md:space-y-3 md:col-span-0">
            <nuxt-link to="/profile" class="md:text-lg font-light font-semibold w-fit">Edit Profile</nuxt-link>
            <nuxt-link to="/profile/password" class="md:text-lg font-light w-fit">Change Password</nuxt-link>
        </div>
        <div class="col-start-1 col-span-4 col-end-7 md:col-end-6 md:col-start-2 md:col-span-4">
            <div class="grid grid-rows-2 grid-cols-2 grid-flow-col gap-4 p-4">
                <div class="row-span-2 flex justify-center items-center">
                    <ProfileIcon class="w-24 md:w-32"/>
                </div>
                <div class="col-span-2 flex items-end">
                    <p class="text-3xl font-semibold">{{ userData.first_name }} {{ userData.last_name }}</p>
                </div>
                <div class="col-span-2 flex flex-col">
                    <p class="text-lg font-light italic">{{ userData.username }}</p>
                    <p class="text-lg">{{ userData.email }}</p>
                </div>
            </div>
        </div>
        <div class="col-start-1 col-span-5 h-12"></div>
        <div class="col-start-1 col-span-4 col-end-7 md:col-end-6 md:col-start-2 md:col-span-4">
            <form 
                ref="form"
                class="flex flex-col items-center space-y-3"
                @submit="submitForm"
            >
                <label class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 flex items-center">
                        <span class="block pr-4 text-sm font-medium text-slate-700">
                            Username
                        </span>
                    </div>
                    <div class="col-start-4 col-span-2 flex justify-center">
                        <input type="text" name="username" class="mt-1 px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm focus:ring-1" :placeholder="userData.username" disabled/>
                    </div>
                </label>
                <label class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 flex items-center">
                        <span class="block pr-4 text-sm font-medium text-slate-700">
                            Nama
                        </span>
                    </div>
                    <div class="col-start-4 col-span-2 flex justify-center">
                        <input v-model="name" required type="text" name="name" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-slate-600 block w-full rounded-md sm:text-sm focus:ring-1" />
                    </div>
                </label>
                <label class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 flex items-center">
                        <span class="block pr-4 text-sm font-medium text-slate-700">
                            Email
                        </span>
                    </div>
                    <div class="col-start-4 col-span-2 flex justify-center">
                        <input v-model="email" required type="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-slate-600 block w-full rounded-md sm:text-sm focus:ring-1" />
                    </div>
                </label>
                <div class="grid grid-cols-6 min-w-full">
                    <div class="col-start-5 flex justify-end mt-3">
                        <button 
                          class="disabled:bg-gray-400 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                          Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import ProfileIcon from '~/components/icon/ProfileIcon.vue';

export default {
    components: {
    ProfileIcon,
  },
    beforeRouteEnter (to, from, next) {
      axios.post(process.env.AUTH_ENDPOINT + 'token/verify/', 
                {
                token: localStorage.getItem('lawToken')
            }
        ).then((response) => {
          next(vm => vm.setUserData(response.data))
        })
    },
    data() {
        return {
            userData: {},
            name: null,
            email: null,
            username: null,
        }
    },
    methods: {
      setUserData: function (data) {
        this.userData = data
        this.name = this.userData.first_name + ' ' + this.userData.last_name
        this.email = this.userData.email
        this.username = this.userData.username
      },
      submitForm: function (event) {
        event.preventDefault()
        
        const data = {
          username: this.username,
          email: this.email,
          name: this.name
        }
        this.$axios.$post(process.env.AUTH_ENDPOINT + 'user/', data, 
          { headers: { Authorization: `Bearer ${this.$store.state.auth.token}` } }, )

        this.$router.go(0)
      },
    }
}
</script>

<style>
</style>
  