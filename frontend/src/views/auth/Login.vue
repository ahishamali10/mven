<template>
    <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                >
                    <div class="rounded-t mb-0 px-6 py-6">
                        <div class="text-center mb-3">
                            <h6 class="text-blueGray-500 text-sm font-bold">
                                Sign in with
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
                            <small>Or sign in with credentials</small>
                        </div>
                        <div v-if="errors.show" class="bg-red-700 p-2 rounded mb-1 text-white">
                            <ul>
                                <li v-for="err in errors.message">{{ err }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="handleLogin">
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
                                <input
                                    type="password" v-model="form.password"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input
                                        id="customCheckLogin"
                                        type="checkbox" v-model="form.remember"
                                        class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                    />
                                    <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                                </label>
                            </div>

                            <div class="text-center mt-6">
                                <button :disabled="isLoading"
                                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit"
                                >
                                    <i v-if="isLoading" class="fas fa-circle-notch fa-spin"></i>
                                    <span v-else>Sign In</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="flex flex-wrap mt-6 relative">
                    <!--          <div class="w-1/2">-->
                    <!--            <a href="javascript:void(0)" class="text-blueGray-200">-->
                    <!--              <small>Forgot password?</small>-->
                    <!--            </a>-->
                    <!--          </div>-->
                    <div class="text-center">
                        <router-link to="/auth/register" class="text-blueGray-200">
                            <small>Create new account</small>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import {object, string} from 'yup';
import {ref} from "vue";
import axios from "axios";
import {useGeneralStore} from "@/stores/general";
import router from "@/router";

export default {
    setup() {
        let general = useGeneralStore()
        let loginSchema = object({
            email: string().required(),
            password: string().required()
        })
        const form = ref({
            email: '',
            password: '',
            remember: false,
        })
        const data = ref();
        const isLoading = ref(false);
        const errors = ref({
            show: false,
            name: '',
            message: []
        });

        const handleLogin = async () => {
            isLoading.value = true
            try {
                data.value = await loginSchema.validate(form.value)
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
            let res = axios.post(general.baseURL + '/auth/login', {...data.value}).then(res => {
                console.log('redirect to dashboard page')
                // redirect to dashboard page
                isLoading.value = false
                router.push({path: '/admin'})
            }).catch(err => {
                console.log(err.response)
                errors.value.show = true
                errors.value.name = err.response.statusText
                errors.value.message = ['This user does not exist']
                isLoading.value = false
            })
        }

        return {
            github,
            google,
            form,
            isLoading,
            errors,
            handleLogin,
        }
    }
};
</script>
