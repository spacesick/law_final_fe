<template>
  <div class="flex justify-center">
    <div class="m-auto text-center w-full">
      <h1 class="font-semibold text-lg">Transaction List</h1>
      <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">
        {{ error }}
      </p>
      <table
        v-if="transactionTable"
        class="content-table hidden xl:table mx-auto border-collapse my-[12px] rounded-t-md text-sm max-w-[60rem] w-5/6 overflow-hidden shadow-md"
      >
        <thead>
          <tr class="bg-green-600 text-white text-left font-bold">
            <th>No</th>
            <th>Car</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Proof</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
          >
            <td>{{ index + 1 }}</td>
            <!-- <td>{{ transaction.productId }}</td> -->
            <td>
              <nuxt-link
                v-if="products && products[index] && products[index].id"
                :to="'/car/' + products[index].id"
                class="max-w-[32rem] flex-1 flex flex-col justify-center items-center"
              >
                <img
                  v-if="products[index].image_url"
                  :src="products[index].image_url"
                  class="m-auto max-h-[18rem] max-w-[32rem] min-w-[2rem] h-full w-fit object-cover rounded-lg"
                />
                <div v-else style="all: inherit">
                  <img src="/disable.png" alt="" class="w-10" />
                  <b>Image Unavailable</b>
                </div>
              </nuxt-link>
              <div v-else>
                <img src="/disable.png" alt="" class="w-10" />
                <b>Car Unavailable</b>
              </div>
            </td>
            <td>{{ transaction.sender }}</td>
            <td>{{ transaction.receiver }}</td>
            <td>{{ formatDate(transaction.timestamp) }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.status }}</td>
            <td class="h-full w-full">
              <a
                v-if="transaction.imageUrl"
                :href="transaction.imageUrl"
                class="w-full h-full hover:text-blue-500 hover:underline"
              >
                Click here
              </a>
            </td>
            <td>
              <div
                v-if="transaction.receiver == $store.state.auth.username"
                class="flex flex-col md:flex-row justify-center gap-3"
              >
                <button
                  class="w-8 h-auto"
                  title="Confirm"
                  @click="confirmTransaction(index)"
                >
                  <img
                    src="/check.svg"
                    alt="check"
                    class="w-full h-full"
                  />
                </button>
                <button
                  class="w-8 h-auto"
                  title="Reject"
                  @click="rejectTransaction(index)"
                >
                  <img
                    src="/cross.svg"
                    alt="check"
                    class="w-full h-full"
                  />
                </button>
                <button
                  class="w-8 h-auto"
                  title="Delete"
                  @click="deleteTransaction(index)"
                >
                  <img
                    src="/trash.svg"
                    alt="check"
                    class="w-full h-full"
                  />
                </button>
              </div>
              <div
                v-else-if="!transaction.imageUrl"
                class="flex flex-col md:flex-row justify-center gap-3"
              >
                <label>
                  <img src="/upload.png" class="max-w-[2rem] m-auto" />
                  <input
                    type="file"
                    hidden
                    @change="(event) => onFileChange(event, index)"
                  />
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="transactionTable"
        class="content-table table xl:hidden mx-auto border-collapse my-[12px] rounded-t-md text-sm w-5/6 overflow-hidden shadow-md"
      >
        <thead>
          <tr class="bg-green-600 text-white text-left font-bold">
            <th>No</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
            class="align-middle items-center"
          >
            <td>{{ index + 1 }}</td>
            <td class="text-left flex gap-3">
              <div>
                <p><b>Car Name:</b></p>
                <p><b>Sender:</b></p>
                <p><b>Receiver:</b></p>
                <p><b>Date:</b></p>
                <p><b>Amount:</b></p>
                <p><b>Status:</b></p>
                <p v-if="transaction.imageUrl"><b>Payment Proof:</b></p>
              </div>
              <div>
                <p
                  v-if="
                    products && products[index] && products[index].vehicle_name
                  "
                >
                  {{ products[index].vehicle_name }}
                </p>
                <p v-else class="text-red-500 font-bold">Unavailable</p>
                <p>{{ transaction.sender }}</p>
                <p>{{ transaction.receiver }}</p>
                <p>{{ formatDate(transaction.timestamp) }}</p>
                <p>{{ transaction.amount }}</p>
                <p>{{ transaction.status }}</p>
                <p v-if="transaction.imageUrl">
                  <a
                    :href="transaction.imageUrl"
                    class="w-full h-full hover:text-blue-500 hover:underline"
                  >
                    Click here
                  </a>
                </p>
              </div>
            </td>
            <td>
              <div
                v-if="transaction.receiver == $store.state.auth.username"
                class="flex flex-col md:flex-row justify-center gap-3"
              >
                <button
                  class="w-8 h-auto"
                  title="Confirm"
                  @click="confirmTransaction(index)"
                >
                  <img
                    src="/check.svg"
                    alt="check"
                    class="w-full h-full"
                  />
                </button>
                <button
                  class="w-8 h-auto"
                  title="Reject"
                  @click="rejectTransaction(index)"
                >
                  <img
                    src="/cross.svg"
                    alt="check"
                    class="w-full h-full"
                  />
                </button>
                <button
                  class="w-8 h-auto"
                  title="Delete"
                  @click="deleteTransaction(index)"
                >
                  <img
                    src="/trash.svg"
                    alt="check"
                    class="w-full h-full"
                  />
                </button>
              </div>
              <div
                v-else-if="!transaction.imageUrl"
                class="flex flex-col md:flex-row justify-center gap-3"
              >
                <label>
                  <img src="/upload.png" class="max-w-[2rem] m-auto" />
                  <input
                    type="file"
                    hidden
                    @change="(event) => onFileChange(event, index)"
                  />
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        v-else
        class="bg-red-300 font-light p-2 my-[12px] text-left m-auto w-fit"
      >
        Could not fetch list of Transactions.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    propError: {
      type: String,
      default: null,
    },
    propTransactionTable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      error: '',
      transactionTable: false, // conditional for displaying html component
      transactions: [], // need to initialize so updating values work
      products: [],
    };
  },
  computed: {
    formatDate() {
      return (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };
    },
  },
  beforeMount() {
    fetch(process.env.PRODUCT_ENDPOINT + 'product/?format=json') // change to api endpoint (ext ip)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      })
      .catch(() => {
        this.error = 'Error fetching product';
      });

    fetch(process.env.TRANSACTION_ENDPOINT, {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.auth.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.transactionTable = true;
        this.transactions = data;
      })
      .catch(() => {
        this.transactionTable = false;
      });
  },
  methods: {
    onFileChange(event, index) {
      const file = event.target.files[0];
      if (file && file instanceof File && file.type.startsWith('image/')) {
        const formData = new FormData();
        formData.append('imageProof', file);
        axios
          .put(
            process.env.TRANSACTION_ENDPOINT +
              'proof/?id=' +
              this.transactions[index].id,
            formData,
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.token,
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            this.transactions[index].imageUrl = response.data.imageUrl;
          })
          .catch((error) => {
            this.error = error;
          });
      }
    },
    deleteTransaction(index) {
      axios
        .post(
          process.env.ORCHESTRATOR_ENDPOINT + 'transaction/delete',
          {
            id: this.transactions[index].id,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.token,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          this.transactions.splice(index, 1);
        })
        .catch(() => {
          this.error = 'Delete Error';
        });
    },
    rejectTransaction(index) {
      axios
        .post(
          process.env.ORCHESTRATOR_ENDPOINT + 'transaction/update-status',
          {
            id: this.transactions[index].id,
            status: 'REJECTED',
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.token,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          this.transactions[index].status = 'REJECTED';
        })
        .catch(() => {
          this.error = 'Reject Error';
        });
    },
    confirmTransaction(index) {
      axios
        .post(
          process.env.ORCHESTRATOR_ENDPOINT + 'transaction/update-status',
          {
            id: this.transactions[index].id,
            status: 'CONFIRMED',
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.token,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          this.transactions[index].status = 'CONFIRMED';
        })
        .catch(() => {
          this.error = 'Confirm Error';
        });
    },
  },
};
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
