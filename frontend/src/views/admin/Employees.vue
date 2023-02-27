<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
            <card-table @call-create="showModal" :employees="employees"/>
        </div>
        <div v-if="modal.status" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 class="border-b pb-3">{{ modal.type == 'create' ? 'Add' : 'Edit' }} Employee</h3>
                            <div class="mt-3">
                                <form>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text" v-model="form.name"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Level
                                        </label>
                                        <input v-model="form.level"
                                               type="text"
                                               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                               placeholder="Level"
                                        />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Department
                                        </label>
                                        <select v-model="form.department"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        >
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="M_E">M&E</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Address
                                        </label>
                                        <textarea v-model="form.address"
                                                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                  placeholder="Address"
                                        ></textarea>
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Mobile
                                        </label>
                                        <input v-model="form.mobile"
                                               type="text"
                                               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                               placeholder="Mobile"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button @click.prevent="handleSubmit" type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                Save
                            </button>
                            <button @click.prevent="hideModal" type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--    <div class="w-full mb-12 px-4">-->
        <!--      <card-table color="dark" />-->
        <!--    </div>-->
    </div>
</template>
<script>
import CardTable from "@/components/Cards/CardTable.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useGeneralStore} from "@/stores/general";
import eventBus from "@/eventBus";
import {hide} from "@popperjs/core";

export default {
    components: {
        CardTable,
    },
    setup() {
        const general = useGeneralStore()
        const employees = ref([])
        const selectedEmp = ref({})
        const modal = ref({
            status: false,
            type: 'create'
        })
        const createForm = ref()
        const form = ref({
            name: '',
            level: '',
            department: '',
            address: '',
            mobile: ''
        })

        onMounted(() => {
            callData()

            eventBus.$on('empDeleted', () => {
                callData()
            })
            eventBus.$on('editEmp', (id) => {
                selectedEmp.value = employees.value.filter(e => e.id == id)[0]
                form.value = {
                    name: selectedEmp.value.name,
                    level: selectedEmp.value.level,
                    department: selectedEmp.value.department,
                    address: selectedEmp.value.details.address,
                    mobile: selectedEmp.value.details.mobile
                }
                showModal()
            })
        })

        const hideModal = () => {
            modal.value.status = false
        }
        const showModal = () => {
            modal.value.status = true
        }

        const handleSubmit = () => {
            if (modal.value.type === 'create') {
                axios.post(general.baseURL + '/employees', {...form.value}).then(res => {
                    form.value = {
                        name: '',
                        level: '',
                        department: '',
                        address: '',
                        mobile: ''
                    }
                    hideModal()
                    callData()
                })
            } else {
                axios.put(general.baseURL + '/employees/'+selectedEmp.value.id, {...form.value}).then(res => {
                    form.value = {
                        name: '',
                        level: '',
                        department: '',
                        address: '',
                        mobile: ''
                    }
                    hideModal()
                    callData()
                })
            }
        }

        const callData = () => {
            axios.get(general.baseURL + '/employees').then(res => {
                employees.value = res.data
            })
        }

        return {
            employees,
            createForm,
            form,
            modal,
            hideModal,
            showModal,
            handleSubmit,
        }
    }
};
</script>
