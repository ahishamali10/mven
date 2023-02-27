<template>
    <div class="relative">
        <a
            class="text-blueGray-500 py-1 px-3"
            href="#pablo"
            @click="toggleDropdown($event)"
        >
            <i class="fas fa-ellipsis-v"></i>
        </a>
        <OnClickOutside @trigger="() => dropdownPopoverShow = false">
            <div
                class="absolute bottom-0 right-0 transform bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                :class="{
                hidden: !dropdownPopoverShow,
                block: dropdownPopoverShow,
              }"
            >
                <a
                    href="javascript:void(0);" @click.prevent="edit"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >
                    Edit
                </a>
                <a
                    href="javascript:void(0);" @click.prevent="destroy"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >
                    Delete
                </a>
            </div>
        </onClickOutside>
    </div>
</template>
<script>
import {createPopper} from "@popperjs/core";
import {ref} from "vue";
import axios from "axios";
import {useGeneralStore} from "@/stores/general";
import {useNotificationStore} from "@/stores/notification";
import eventBus from "@/eventBus";
import {OnClickOutside} from "@vueuse/components";

export default {
    components: {
        OnClickOutside,
    },
    props: {
        empId: []
    },
    setup(props, {emit}) {
        const general = useGeneralStore()
        const notification = useNotificationStore()
        const dropdownPopoverShow = ref(false)
        const btnDropdownRef = ref()
        const popoverDropdownRef = ref(null)

        const edit = () => {
            eventBus.$emit('editEmp', props.empId)
            dropdownPopoverShow.value = false
        }
        const destroy = () => {
            if (confirm('are you sure to delte this record?')) {
                axios.delete(general.baseURL + '/employees/' + props.empId).then(res => {
                    notification.startNotification('ok')
                    eventBus.$emit('empDeleted')
                    dropdownPopoverShow.value = false
                })
            }
        }
        const toggleDropdown = (event) => {
            event.preventDefault();
            if (dropdownPopoverShow.value) {
                dropdownPopoverShow.value = false;
            } else {
                dropdownPopoverShow.value = true;
            }
        }

        return {
            dropdownPopoverShow,
            toggleDropdown,
            edit,
            destroy,
        };
    },
};
</script>
