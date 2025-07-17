import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLogoIconStore = defineStore('logo-icon', () => {
    const localIcon = localStorage.getItem('main-icon')
    const icon = ref<string>(localIcon ?? '🫤')

    const getIcon = computed(() => {

        const i = localStorage.getItem('main-icon')
        if (String(i).length === 1) return i;
        else
            return icon.value
    })

    function changeLogoIcon(newIcon: string) {
        localStorage.setItem('main-icon', newIcon)
        icon.value = newIcon
    }

    return {
        icon,
        getIcon,
        changeLogoIcon
    }
})
