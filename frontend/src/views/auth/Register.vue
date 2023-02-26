<template>
    <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-6/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                >
                    <div class="rounded-t mb-0 px-6 py-6">
                        <div class="text-center mb-3">
                            <h6 class="text-blueGray-500 text-sm font-bold">
                                Sign up with
                            </h6>
                        </div>
                        <div class="btn-wrapper text-center">
                            <button
                                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                type="button"
                            >
                                <img alt="..." class="w-5 mr-1" :src="github"/>
                                Github
                            </button>
                            <button
                                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                type="button"
                            >
                                <img alt="..." class="w-5 mr-1" :src="google"/>
                                Google
                            </button>
                        </div>
                        <hr class="mt-6 border-b-1 border-blueGray-300"/>
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div class="text-blueGray-400 text-center mb-3 font-bold">
                            <small>Or sign up with credentials</small>
                        </div>
                        <form @submit.prevent="handleRegister">
                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Username
                                </label>
                                <input
                                    type="text" v-model="form.username"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Userame"
                                />
                            </div>

                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    type="email" v-model="form.email"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                />
                            </div>

                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Password
                                </label>
                                <input v-model="form.password"
                                    type="password"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password"
                                />
                            </div>

                            <div class="relative w-full mb-3">
                                <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Confirm Password
                                </label>
                                <input v-model="form.confirmPassword"
                                    type="password"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input
                                        id="customCheckLogin"
                                        type="checkbox"
                                        class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                    />
                                    <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    I agree with the
                    <a href="javascript:void(0)" class="text-emerald-500">
                      Privacy Policy
                    </a>
                  </span>
                                </label>
                            </div>

                            <div class="text-center mt-6">
                                <button
                                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import {useGeneralStore} from "@/stores/general";
import {object, string,ref as rf} from "yup";
import {ref} from "vue";
import axios from "axios";
import router from "@/router";

export default {
    setup() {
        let general = useGeneralStore()
        let registerSchema = object({
            username: string().min(4).required(),
            email: string().email().required(),
            password: string().min(8).required(),
            confirmPassword: string().min(8).required().oneOf([rf('password')]),
        })
        const form = ref({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
        const data = ref();
        const isLoading = ref(false);
        const errors = ref({
            show: false,
            name: '',
            message: []
        });

        const handleRegister = async (e) => {
            isLoading.value = true
            e.preventDefault()
            try {
                data.value = await registerSchema.validate(form.value)
                errors.value = {
                    show: false,
                    name: '',
                    message: []
                }
            } catch (e) {
                errors.value.show = true
                errors.value.name = e.name
                errors.value.message = e.errors
            }
            let res = axios.post(general.baseURL + '/auth/register', {...data.value}).then(res => {
                isLoading.value = false
                router.push({path: '/'})
            }).catch(err => {
                console.log(err.response)
                errors.value.show = true
                errors.value.name = err.response.statusText
                errors.value.message = [err.response.data.message]
                isLoading.value = false
            })
        }

        return {
            github,
            google,
            form,
            isLoading,
            errors,
            handleRegister,
        }
    },
};
</script>
