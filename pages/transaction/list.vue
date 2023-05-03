<template>
  <div class="flex justify-center">
    <div class="text-center">
      <h1 class="font-semibold text-lg">Transaction List</h1>
      <p class="bg-red-300 font-light p-2 my-[12px] text-left" v-if="error">{{ error }}</p>
      <table class="content-table">
        <thead>
          <tr>
            <th>ID</th>
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
              <div class="flex justify-center gap-3">
                <button class="w-8 h-auto" title="Confirm" @click="confirmTransaction(index)"><img src="/MaterialSymbolsCheckCircle.svg" alt="check" class="w-full h-full"></button>
                <button class="w-8 h-auto" title="Reject" @click="rejectTransaction(index)"><img src="/CharmCircleCross.svg" alt="check" class="w-full h-full"></button>
                <button class="w-8 h-auto" title="Delete" @click="deleteTransaction(index)"><img src="/MaterialSymbolsDeleteForever.svg" alt="check" class="w-full h-full"></button>
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
  props: ['error'],
  data() {
    return {
      transactions: [] // init data
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
    fetch(process.env.TRANSACTION_ENDPOINT)  // change to api endpoint (ext ip)
    .then(response => response.json())
    .then(data => {
      this.transactions = data
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
      const id = this.transactions[index].id
      axios.put(process.env.TRANSACTION_ENDPOINT+'/reject?id='+id)
      .then(response => {
        this.transactions[index].status = "REJECTED"
      }).catch(() => {
        this.error = 'Reject Error'
      })
    },
    confirmTransaction(index) {
      const id = this.transactions[index].id
      axios.put(process.env.TRANSACTION_ENDPOINT+'/confirm?id='+id)
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
/* set font family */
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* set table styling */
.content-table {
    border-collapse: collapse; /* remove border spacing */
    margin: 12px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

/* colorize thead tr */
.content-table thead tr {
    background-color: mediumseagreen;
    color: white;
    text-align: left;
    font-weight: bold;
}

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
