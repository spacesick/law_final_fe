<template>
<div class="flex justify-center">
    <div class="m-auto text-center w-full">
        <h1 class="font-semibold text-lg">Transaction List</h1>
        <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">{{ error }}</p>
        <table v-if="transactionTable" class="content-table hidden md:table mx-auto border-collapse my-[12px] rounded-t-md text-sm max-w-[60rem] w-5/6 overflow-hidden shadow-md">
            <thead>
                <tr class="bg-green-600 text-white text-left font-bold">
                    <th>No</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                    <td>{{ index+1 }}</td>
                    <td>{{ transaction.sender }}</td>
                    <td>{{ transaction.receiver }}</td>
                    <td>{{ formatDate(transaction.timestamp) }}</td>
                    <td>{{ transaction.amount }}</td>
                    <td>{{ transaction.status }}</td>
                    <td>
                        <div class="flex flex-col md:flex-row justify-center gap-3">
                            <button class="w-8 h-auto" title="Confirm" @click="confirmTransaction(index)"><img src="/MaterialSymbolsCheckCircle.svg" alt="check" class="w-full h-full"></button>
                            <button class="w-8 h-auto" title="Reject" @click="rejectTransaction(index)"><img src="/CharmCircleCross.svg" alt="check" class="w-full h-full"></button>
                            <button class="w-8 h-auto" title="Delete" @click="deleteTransaction(index)"><img src="/MaterialSymbolsDeleteForever.svg" alt="check" class="w-full h-full"></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table v-if="transactionTable" class="content-table table md:hidden mx-auto border-collapse my-[12px] rounded-t-md text-sm w-5/6 overflow-hidden shadow-md">
            <thead>
                <tr class="bg-green-600 text-white text-left font-bold">
                    <th>No</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(transaction, index) in transactions" :key="transaction.id" class="align-middle items-center">
                    <td>{{ index+1 }}</td>
                    <td class="text-left flex gap-3">
                        <div>
                            <p><b>Sender:</b></p>
                            <p><b>Receiver:</b></p>
                            <p><b>Date:</b></p>
                            <p><b>Amount:</b></p>
                            <p><b>Status:</b></p>
                        </div>
                        <div>
                            <p>{{ transaction.sender }}</p>
                            <p>{{ transaction.receiver }}</p>
                            <p>{{ formatDate(transaction.timestamp) }}</p>
                            <p>{{ transaction.amount }}</p>
                            <p>{{ transaction.status }}</p>
                        </div>
                    </td>
                    <td>
                        <div class="flex flex-col md:flex-row justify-center gap-3">
                            <button class="w-8 h-auto" title="Confirm" @click="confirmTransaction(index)"><img src="/MaterialSymbolsCheckCircle.svg" alt="check" class="w-full h-full"></button>
                            <button class="w-8 h-auto" title="Reject" @click="rejectTransaction(index)"><img src="/CharmCircleCross.svg" alt="check" class="w-full h-full"></button>
                            <button class="w-8 h-auto" title="Delete" @click="deleteTransaction(index)"><img src="/MaterialSymbolsDeleteForever.svg" alt="check" class="w-full h-full"></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else class="bg-red-300 font-light p-2 my-[12px] text-left m-auto w-fit">Could not fetch list of Transactions.</p>
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
        'propTransactionTable': {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            error: this.propError,
            transactionTable: false,    // conditional for displaying html component
            transactions: []    // need to initialize so updating values work
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
        fetch(process.env.TRANSACTION_ENDPOINT) // change to api endpoint (ext ip)
            .then(response => response.json())
            .then(data => {
                this.transactionTable = true
                this.transactions = data
            }).catch(() => {
                this.transactionTable = false
            })
    },
    methods: {
        deleteTransaction(index) {
            axios.delete(process.env.TRANSACTION_ENDPOINT)
                .then(response => {
                    this.transactions.splice(index, 1);
                }).catch(() => {
                    this.error = 'Delete Error'
                })
        },
        rejectTransaction(index) {
            axios.put(process.env.TRANSACTION_ENDPOINT + 'reject', null,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.token
                },
                params: {
                    id: this.transactions[index].id
                }
            })
                .then(response => {
                    this.transactions[index].status = "REJECTED"
                }).catch(() => {
                    this.error = 'Reject Error'
                })
        },
        confirmTransaction(index) {
            axios.put(process.env.TRANSACTION_ENDPOINT + 'confirm', null,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.token
                },
                params: {
                    id: this.transactions[index].id
                }
            })
                .then(response => {
                    this.transactions[index].status = "CONFIRMED";
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
