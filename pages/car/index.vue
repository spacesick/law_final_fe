<template>
    <div class="m-auto text-center w-fit min-w-[20rem]">
        <div class="flex flex-row-reverse justify-between items-center">
            <h1 class="font-semibold text-lg flex-1 text-center m-0">Car List</h1>
            <div class="ml-auto absolute">
                <nuxt-link
                    to="/car/add"
                    class="border-2 border-blue-500 bg-blue-400 rounded-lg shadow-md py-2 px-3 text-right m-0 font-bold hover:text-blue-700">
                    <b class="text-xl">+</b> Add car
                </nuxt-link>
            </div>
        </div>
        <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">{{ error }}</p>
        <div v-if="productTable" class="flex flex-col gap-4 py-4 justify-center">
            <div v-for="(product) in products" :key="product.id" class="border-2 rounded-md shadow-lg px-4 py-6 flex flex-col md:flex-row text-left gap-8 transition-all hover:-translate-y-1">
                <nuxt-link
                    :to="'/car/'+product.id"
                    class="max-w-[32rem] flex-1 flex flex-col justify-center items-center">
                    <img v-if="product.image_url" :src="product.image_url" class="m-auto max-h-[18rem] max-w-[32rem] min-w-[20rem] h-full w-fit object-cover rounded-lg">
                    <div v-else style="all: inherit;">
                        <img src="/disable.png" alt="" class="w-10">
                        <b>Image Unavailable</b>
                    </div>
                </nuxt-link>
                <div class="flex gap-[inherit] justify-center">
                    <div class="font-bold">
                        <p>Owner:</p>
                        <p>Vehicle Name:</p>
                        <p>Vehicle Brand:</p>
                        <p>Vehicle Type:</p>
                        <p>Vehicle Year:</p>
                        <p>Location:</p>
                        <p>Transmission:</p>
                        <p>Fuel:</p>
                        <p>Number of Seaters:</p>
                        <p>Number plate:</p>
                        <p>Price:</p>
                        <p>Description:</p>
                        <p>Available:</p>
                    </div>
                    <div>
                        <p>{{ product.owner }}</p>
                        <p>{{ product.vehicle_name }}</p>
                        <p>{{ product.vehicle_brand }}</p>
                        <p>{{ product.vehicle_type }}</p>
                        <p>{{ product.vehicle_year }}</p>
                        <p>{{ product.location }}</p>
                        <p>{{ product.transmission }}</p>
                        <p>{{ product.fuel }}</p>
                        <p>{{ product.no_of_seaters }}</p>
                        <p>{{ product.number_plate }}</p>
                        <p>{{ product.price }}</p>
                        <p>{{ product.description }}</p>
                        <p v-if="product.availability" class="text-green-400">Yes</p>
                        <p v-else class="text-red-500">No</p>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="bg-red-300 font-light p-2 my-[12px] text-left">Could not fetch list of products.</p>
    </div>
</template>

<script>

export default {
    props: {
        'propError': {
            type: String,
            default: null
        },
        'propProductTable': {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            error: this.propError,
            productTable: this.propProductTable,
            products: []
        }
    },
    computed: {
        formatDate() {
            return (timestamp) => {
                const date = new Date(timestamp);
                return date.toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
            };
        },
    },
    beforeMount() {
        fetch(process.env.PRODUCT_ENDPOINT + 'product/?format=json') // change to api endpoint (ext ip)
            .then(response => response.json())
            .then(data => {
                this.productTable = true
                this.products = data
            }).catch(() => {
                this.productTable = false
            })
    }
}
</script>