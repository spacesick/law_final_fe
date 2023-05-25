<template>
    <div class="flex justify-center">
        <div class="text-center w-full">
            <h1 class="font-semibold text-lg">Order List</h1>
            <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">{{ error }}</p>
            <table v-if="orderTable" class="content-table hidden lg:table mx-auto border-collapse my-[12px] rounded-t-md text-sm max-w-[60rem] w-5/6 overflow-hidden shadow-md">
                <thead>
                    <tr class="bg-green-600 text-white text-left font-bold">
                        <th>No</th>
                        <th>Car</th>
                        <th>Orderer</th>
                        <th>Timestamp</th>
                        <th>Start Date</th>
                        <th>Finish Date</th>
                        <th>Days</th>
                        <th>Grand Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="order.id">
                        <td>{{ index+1 }}</td>
                        <td>
                            <nuxt-link
                                :to="'/car/'+order.product_id">
                                <img :src="order.image_url" :alt="order.vehicle_name" class="w-full min-w-[8rem] max-h-[14rem] m-auto object-cover">
                            </nuxt-link>
                        </td>
                        <td>{{ order.orderer }}</td>
                        <td>{{ formatTimestamp(order.order_date) }}</td>
                        <td>{{ formatDate(order.start_date) }}</td>
                        <td>{{ formatDate(order.finish_date) }}</td>
                        <td>{{ order.number_of_days }}</td>
                        <td>{{ order.grand_total }}</td>
                        <td>
                            <div class="flex flex-col md:flex-row justify-center gap-3">
                                <button class="w-8 h-auto" title="Confirm" @click="confirmOrder(index)"><img src="/check.svg" alt="check" class="w-full h-full"></button>
                                <button class="w-8 h-auto" title="Reject" @click="rejectOrder(index)"><img src="/cross.svg" alt="check" class="w-full h-full"></button>
                                <button class="w-8 h-auto" title="Delete" @click="deleteOrder(index)"><img src="/trash.svg" alt="check" class="w-full h-full"></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-if="orderTable" class="content-table table lg:hidden mx-auto border-collapse my-[12px] rounded-t-md text-sm w-5/6 overflow-hidden shadow-md">
                <thead>
                    <tr class="bg-green-600 text-white text-left font-bold">
                        <th>No</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="order.id" class="align-middle items-center">
                        <td>{{ index+1 }}</td>
                        <td class="text-left flex gap-3">
                            <div>
                                <p><b>Orderer:</b></p>
                                <p><b>Order Date:</b></p>
                                <p><b>Start Date:</b></p>
                                <p><b>Finish Date:</b></p>
                                <p><b>Days:</b></p>
                                <p><b>Grand Total:</b></p>
                            </div>
                            <div>
                                <p>{{ order.orderer }}</p>
                                <p>{{ formatTimestamp(order.order_date) }}</p>
                                <p>{{ formatDate(order.start_date) }}</p>
                                <p>{{ formatDate(order.finish_date) }}</p>
                                <p>{{ order.number_of_days }}</p>
                                <p>{{ order.grand_total }}</p>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-col md:flex-row justify-center gap-3">
                                <button class="w-8 h-auto" title="Confirm" @click="confirmOrder(index)"><img src="/check.svg" alt="check" class="w-full h-full"></button>
                                <button class="w-8 h-auto" title="Reject" @click="rejectOrder(index)"><img src="/cross.svg" alt="check" class="w-full h-full"></button>
                                <button class="w-8 h-auto" title="Delete" @click="deleteOrder(index)"><img src="/trash.svg" alt="check" class="w-full h-full"></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            'propOrderTable': {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                error: this.propError,
                orderTable: false,    // conditional for displaying html component
                orders: []    // need to initialize so updating values work
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
            formatTimestamp() {
                return (timestamp) => {
                    const date = new Date(timestamp);
                    return date.toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    });
                };
            },
        },
        beforeMount() {
            fetch(process.env.PRODUCT_ENDPOINT+'order/') // change to api endpoint (ext ip)
                .then(response => response.json())
                .then(data => {
                    this.orderTable = true
                    this.orders = data
                    // Iterate over each order and fetch product image
                    const productPromises = this.orders.map(order => {
                    return fetch(process.env.PRODUCT_ENDPOINT + 'product/' + order.product_id)
                        .then(response => response.json())
                        .then(data => {
                            // Assuming the productData contains the image URL
                            this.$set(order, 'vehicle_name', data.vehicle_name);
                            this.$set(order, 'image_url', data.image_url);
                        });
                    });
                    // Wait for all product image requests to complete
                    Promise.all(productPromises)
                        .catch(error => {
                            this.error = error;
                        });
                }).catch(() => {
                    this.orderTable = false
                })
        },
        methods: {
            deleteOrder(index) {
                axios.delete(process.env.PRODUCT_ENDPOINT)
                    .then(response => {
                        this.orders.splice(index, 1);
                    }).catch(() => {
                        this.error = 'Delete Error'
                    })
            },
            rejectOrder(index) {
                axios.put(process.env.PRODUCT_ENDPOINT + 'reject', null,
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.token
                    },
                    params: {
                        id: this.orders[index].id
                    }
                })
                    .then(response => {
                        this.orders[index].status = "REJECTED"
                    }).catch(() => {
                        this.error = 'Reject Error'
                    })
            },
            confirmOrder(index) {
                axios.put(process.env.PRODUCT_ENDPOINT + 'confirm', null,
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.token
                    },
                    params: {
                        id: this.orders[index].id
                    }
                })
                    .then(response => {
                        this.orders[index].status = "CONFIRMED";
                    }).catch(() => {
                        this.error = 'Confirm Error'
                    })
            },
        }
    }
    </script>
    
    <style scoped>
    
    /* pad head and content cells  */
    .content-table th,
    .content-table td {
        padding: 12px 15px;
    }
    
    /* white on all tr */
    .content-table tbody tr {
        border-bottom: 1px solid #dddddd;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    
    /* grey on even tr */
    .content-table tbody tr:nth-of-type(even) {
        background-color: #f1f1f1;
    }
    
    /* set border on bottom */
    .content-table tbody tr:last-of-type {
        border-bottom: 2px solid #18ac2b;
    }
    
    .content-table tbody tr:hover {
        color: #18ac2b;
        background-color: #dbdbdb;
    }
    </style>
    