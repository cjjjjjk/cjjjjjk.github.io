import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const UseMenuHandlerStore = defineStore("menu-handler", () => {

    // private
    const _isOpenMenu = ref<boolean>(false);

    const isOpenMenuStatus = computed(() => _isOpenMenu.value);

    function toggleMenuShow(status?: boolean) {
        if (status !== undefined) {
            _isOpenMenu.value = status
        } else
            _isOpenMenu.value = !_isOpenMenu.value;
    }


    return {
        isOpenMenuStatus,
        toggleMenuShow
    }
})