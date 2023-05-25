<template>
  <div>
    <div class="grid grid-cols-3 mt-12">
      <img :src="carImage" class="hidden col-span-3 md:col-span-2 justify-self-center self-center sm:flex md:w-9/12 lg:w-10/12">
      <p class="hidden tagline text-8xl col-span-3 text-center sm:inline md:text-9xl md:text-left md:col-span-1 sm:w-full w-[5ch] lg:w-full self-center">GET YOUR <span class="text-red-500">CAR</span> NOW.</p>
    </div>
    <div class="flex justify-center space-x-2 mt-12">
      <nuxt-link to="/car" class="rounded-full py-4 px-10 bg-red-500 text-white text-xl font-medium hover:bg-red-600">Rent Car</nuxt-link>
      <nuxt-link to="/order" class="rounded-full py-4 px-10 bg-white text-red-500 border border-red-500 text-xl font-medium hover:bg-red-600 hover:text-white">My Order</nuxt-link>
    </div>
    <ChatPanel />
  </div>
</template>

<script>
import ChatPanel from '~/components/chat/ChatPanel.vue';
import carImage from '~/static/car-cropped.png'

export default {
  name: 'IndexPage',
  components: {
    ChatPanel,
  },
  data() {
    return {
      carImage
    }
  },
  beforeMount() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/auth/login');
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

.tagline {
  font-family: 'Staatliches', cursive;
}
</style>