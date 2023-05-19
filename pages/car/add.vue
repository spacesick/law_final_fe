<template>
    <form class="m-auto text-center max-w-[60rem] px-2 flex flex-col gap-2">
        <h1 class="font-semibold text-lg">Add Car</h1>
        <p v-if="error" class="bg-red-300 font-light p-2 my-[12px] text-left">{{ error }}</p>
        <div class="text-left">
            <label class="flex flex-col gap-2 my-2 text-sm font-medium text-gray-900">Vehicle Image
                <img :src="imageUrl" alt="">
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" type="file" @change="onImageChange">
            </label>
            <CInput v-model="owner"         label="Owner"           type="text"></CInput>
            <CInput v-model="vehicle_name"  label="Vehicle Name"    type="text"></CInput>
            <CInput v-model="vehicle_brand" label="Vehicle Brand"   type="text"></CInput>
            <CInput v-model="vehicle_type"  label="Vehicle Type"    type="text"></CInput>
            <CInput v-model="vehicle_year"  label="Vehicle Year"    type="text"></CInput>
            <CInput v-model="location"      label="Location"        type="text"></CInput>
            <CInput v-model="transmission"  label="Transmission"    type="text"></CInput>
            <CInput v-model="fuel"          label="Fuel"            type="text"></CInput>
            <CInput v-model="no_of_seaters" label="Num of Seaters"  type="text"></CInput>
            <CInput v-model="number_plate"  label="Number Plate"    type="text"></CInput>
            <CInput v-model="price"         label="Price"           type="number"></CInput>
            <CInput v-model="description"   label="Description"     type="text"></CInput>
            <label class="block my-2 text-sm font-medium text-gray-900 text-center">Availability</label>
            <div class="grid grid-cols-2 m-auto w-fit items-center">
                <input v-model="availability" type="checkbox" name="Availability" @change="updateAvailability">
            </div>
            <div class="text-center py-4">
                <button class="py-2 px-5 font-bold bg-green-500 border-4 border-green-400 rounded-md" title="Add" @click.prevent="addProduct">Add Car</button>
            </div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import CInput from '~/components/auth/CInput.vue';

export default {
    components: {
        CInput
    },
    data() {
        return {
            error: null,
            owner: null,
            image: null,
            vehicle_name: null,
            vehicle_brand: null,
            vehicle_type: null,
            vehicle_year: null,
            location: null,
            transmission: null,
            fuel: null,
            no_of_seaters: null,
            number_plate: null,
            price: null,
            description: null,
            availability: 'False',
            imageUrl: null
        }
    },
    computed: {
    },
    methods: {
        onImageChange(event) {
            const file = event.target.files[0];
            if (file && file instanceof File && file.type.startsWith('image/')) {
                this.image = event.target.files[0]
                this.imageUrl = URL.createObjectURL(file)
            }
        },
        updateAvailability(event) {
            this.availability = event.target.checked ? 'True' : 'False'
        },
        addProduct() {
            const formData = new FormData();
            formData.append('owner', this.owner);
            formData.append('image', this.image);
            formData.append('vehicle_name', this.vehicle_name);
            formData.append('vehicle_brand', this.vehicle_brand);
            formData.append('vehicle_type', this.vehicle_type);
            formData.append('vehicle_year', this.vehicle_year);
            formData.append('location', this.location);
            formData.append('transmission', this.transmission);
            formData.append('fuel', this.fuel);
            formData.append('no_of_seaters', this.no_of_seaters);
            formData.append('number_plate', this.number_plate);
            formData.append('price', this.price);
            formData.append('description', this.description);
            formData.append('availability', this.availability);
            axios.post(process.env.PRODUCT_ENDPOINT + '/product/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    this.$router.push('/car')
                }).catch(() => {
                    this.error = 'Add Car Error'
                })
        }
    }
}
</script>