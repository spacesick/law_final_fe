<template>
  <div
    class="main-body w-full min-h-[calc(100vh-68px)] flex flex-col justify-center items-center"
  >
    <div
      class="body-wrapper w-full h-[calc(100vh-68px)] flex flex-col justify-center items-center gap-6 py-5 px-4"
    >
      <h1 class="text-5xl font-bold">
        About <span class="text-green-300">Us</span>
      </h1>
      <h3 class="text-2xl">
        <span class="font-bold">Car Rent</span> is a site where you can find
        your dream car for use with the best price and quality.
      </h3>
      <h2 class="text-2xl font-bold underline mt-3">Our Team</h2>
      <div class="flex flex-wrap gap-4 items-center justify-center pl-3">
        <div
          v-for="(member, id) in members"
          :key="id"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ member.name }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ member.npm }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [
        {
          name: 'Bima Bagas Raditya',
          npm: 1906398585,
        },
        {
          name: 'Fathan Muhammad',
          npm: 2006486090,
        },
        {
          name: 'Elfraera Winson Barry',
          npm: 2006596024,
        },

        {
          name: 'Rizky Nurfaizi Widyanto',
          npm: 2006597701,
        },
        {
          name: 'Vincent Yovian',
          npm: 2006595816,
        },
      ],
    };
  },
};
</script>

<style scoped>
.main-body {
  background: rgba(76, 175, 80, 0.1) url('/bg-about.jpg') no-repeat fixed center;
}

.body-wrapper {
  background-color: rgb(255, 255, 255, 0.4);
}
</style>
