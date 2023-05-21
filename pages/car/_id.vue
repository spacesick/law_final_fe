<template>
    <div class="m-auto text-center max-w-[60rem] px-2">
        <h1 class="font-semibold text-lg">Car Detail</h1>
        <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">{{ error }}</p>
        <div v-if="productTable" class="flex flex-col gap-4 py-4">
            <div v-for="(product) in [products]" :key="product.id" class="border-2 rounded-md shadow-lg px-4 py-6 flex flex-col justify-center text-left gap-8">
                <div class="flex-1 items-center">
                    <img v-if="product.image_url" :src="product.image_url" class="m-auto max-h-[36rem] max-w-[48rem] h-fit w-full object-cover rounded-md">
                    <div v-else style="all: inherit;">
                        <img src="/disable.png" alt="" class="w-10">
                        <b>Image Unavailable</b>
                    </div>
                </div>
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
                <form class="flex flex-col justify-center gap-[inherit]">
                    <div class="flex justify-center gap-4 text-center">
                        <div>
                            <p><b>Start date:</b></p>
                            <input v-model="start_date" type="date" class="m-auto border-2 rounded-md">
                        </div>
                        <div>
                            <p><b>Finish date:</b></p>
                            <input v-model="finish_date" type="date" class="m-auto border-2 rounded-md">
                        </div>
                    </div>
                    <button class="m-auto w-fit h-fit py-2 px-5 font-bold bg-green-500 border-4 border-green-400 rounded-md" title="Order" @click.prevent="orderProduct(index)">Order Now</button>
                </form>
            </div>
        </div>
        <p v-else class="bg-red-300 font-light p-2 my-[12px] text-left">Could not fetch list of products.</p>
    </div>
</template>

<script>
import axios from 'axios'

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
            products: [],
            start_date: null,
            finish_date: null
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
    mounted() {
        this.start_date = new Date().toISOString().split('T')[0];
        this.finish_date = new Date().toISOString().split('T')[0];
    },
    beforeMount() {
        fetch(process.env.PRODUCT_ENDPOINT + 'product/'+this.$route.params.id+'?format=json') // change to api endpoint (ext ip)
            .then(response => response.json())
            .then(data => {
                this.productTable = true
                this.products = data
            }).catch(() => {
                this.productTable = false
            })
    },
    methods: {
        orderProduct(index) {
            axios.post(process.env.PRODUCT_ENDPOINT + 'order/',
                {   
                    product_id: this.$route.params.id,
                    start_date: this.start_date,
                    finish_date: this.finish_date,
                })
                .then(response => {
                    this.$router.push('/order')
                }).catch(() => {
                    this.error = 'Order Error'
                })
        }
    }
}
</script>