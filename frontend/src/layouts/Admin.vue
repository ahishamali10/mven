<template>
    <div class="relative">
        <div v-if="notification.status" class="flex items-center justify-between bg-white shadow-md w-1/5 py-4 px-4 text-emerald-700 z-50 fixed top-8 right-8 rounded">
            <p>{{ notification.message }}</p>
            <i @click.prevent="notification.closeNotification()" class="fas fa-times"></i>
        </div>
        <sidebar/>
        <div class="relative md:ml-64 bg-blueGray-100">
            <admin-navbar/>
            <header-stats/>
            <div class="px-4 md:px-10 mx-auto w-full -m-24">
                <router-view/>
                <footer-admin/>
            </div>
        </div>
    </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import {useNotificationStore} from "@/stores/notification";
import {onMounted, ref} from "vue";

export default {
    name: "admin-layout",
    components: {
        AdminNavbar,
        Sidebar,
        HeaderStats,
        FooterAdmin,
    },
    setup(props){
        const notification = useNotificationStore()

        return {
            notification
        }
    }
};
</script>
