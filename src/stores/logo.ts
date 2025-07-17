import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useLogoIconStore = defineStore('logo-icon', () => {
    const _icon = ref<string>(localStorage.getItem('main-icon') ?? '')
    const _renderKey = ref<number>(0)

    const getIcon = computed(() => _icon.value)
    const renderKey = computed(() => _renderKey.value)

    function changeLogoIcon(newIcon: string) {
        if (newIcon === _icon.value) {
            _renderKey.value++
        } else {
            localStorage.setItem('main-icon', newIcon)
            _icon.value = newIcon
            _renderKey.value++
        }
    }

    return {
        getIcon,
        renderKey,
        changeLogoIcon
    }
})
