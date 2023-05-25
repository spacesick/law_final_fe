<template>
    <div class="grid grid-cols-6 gap-4 pt-4">
        <div class="flex md:flex-col ml-4 space-x-3 col-start-1 md:col-start-2 col-span-4 md:space-x-0 md:space-y-3 md:col-span-0">
            <nuxt-link to="/profile" class="md:text-lg font-light">Edit Profile</nuxt-link>
            <nuxt-link to="/profile/password" class="md:text-lg font-light font-semibold">Change Password</nuxt-link>
        </div>
        <div class="col-start-1 col-span-5 h-12"></div>
        <div class="col-start-1 col-span-4 col-end-7 md:col-end-6 md:col-start-2 md:col-span-4">
            <form 
                ref="form"
                class="flex flex-col items-center space-y-3"
                @submit="submitForm"
            >
                <div class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 col-span-2">
                        <span v-if="invalidPassword" class="text-sm font-medium text-red-500">{{ errMsg }}</span>
                        <span v-if="isPasswordChanged" class="text-sm font-medium text-green-500">Password has been successfully updated</span>
                    </div>
                </div>
                <label class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 flex items-center">
                        <span class="block pr-4 text-sm font-medium text-slate-700">
                            Old Password
                        </span>
                    </div>
                    <div class="col-start-4 col-span-2 flex justify-center">
                        <input v-model="oldPassword" required type="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-slate-600 block w-full rounded-md sm:text-sm focus:ring-1" />
                    </div>
                </label>
                <label class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 flex items-center">
                        <span class="block pr-4 text-sm font-medium text-slate-700">
                            New Password
                        </span>
                    </div>
                    <div class="col-start-4 col-span-2 flex justify-center">
                        <input v-model="password1" required type="password" name="password1" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-slate-600 block w-full rounded-md sm:text-sm focus:ring-1" />
                    </div>
                </label>
                <label class="grid grid-cols-6 min-w-full">
                    <div class="col-start-2 col-span-2 flex items-center">
                        <span class="block pr-4 text-sm font-medium text-slate-700">
                            New Password Confirmation
                        </span>
                    </div>
                    <div class="col-start-4 col-span-2 flex justify-center">
                        <input v-model="password2" required type="password" name="password2" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-slate-600 block w-full rounded-md sm:text-sm focus:ring-1" 
                        
                        />
                    </div>
                </label>
                <div class="grid grid-cols-6 min-w-full">
                    <div class="col-start-5 flex justify-end mt-3">
                        <button 
                        :disabled="invalidPassword"
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

export default {
    data() {
        return {
            oldPassword: '',
            password1: '',
            password2: '',
            invalidPassword: false,
            isPasswordChanged: false,
            errMsg: ''
        }
    },
    watch: {
      password1(newValue) {
        this.setInvalidPassword()
      },
      password2(newValue) {
        this.setInvalidPassword()
      }
    },
    methods: {
      setInvalidPassword () {
        this.invalidPassword = this.password1 !== this.password2;
        this.errMsg = '*Password must be matched!'
      },
      submitForm: function (event) {
        event.preventDefault()
        this.isPasswordChanged = false;

        const data = {
          old_password: this.oldPassword,
          password: this.password1,
          password2: this.password2,
        }
        this.$axios.$put(process.env.AUTH_ENDPOINT + 'password/', data, 
          { headers: { Authorization: `Bearer ${this.$store.state.auth.token}` } },
        ).then((response) => {
          this.isPasswordChanged = true;
        }).catch((e) => {
          const msg = Object.values(e.response.data)[0];
          this.errMsg = msg;
        })
      },
    }
}
</script>

<style>
</style>
  