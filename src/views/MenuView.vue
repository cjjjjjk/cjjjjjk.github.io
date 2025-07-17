<template>
    <div class="fixed h-[100%] w-[100%] place-items-center backdrop-blur-sm grid grid-cols-1 justify-center items-center">
        <div class="fixed h-[90%] w-[95%] grid grid-rows-[auto_1fr]">
            <div class="menu-header h-10 flex flex-row-reverse items-center gap-5">
                <IconMenuClose
                class="hover:cursor-pointer hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                @click="menuHandleStore.toggleMenuShow(false)">Close</IconMenuClose>
                <TimeBox :font-size="{hour:'3xl', format:'sm'}"/>
            </div>
            <div class="menu-content-container grid grid-cols-[1fr_auto]">
                <div class="grow p-5 w-[100%] self-start">
                    <AuthorGithub />
                </div>
                <!-- <div class="menu-options py-5">
                    <div class="options-container py-5">
                        <span class="border border-solid border-gray-400
                        backdrop-blur-sm bg-white/10 rounded-3xl shadow-sm p-5 px-8">github</span>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
import AuthorGithub from '@/components/author-github/AuthorGithub.vue';
import IconMenuClose from '@/components/icons/IconMenuClose.vue';
import TimeBox from '@/components/timebox/TimeBox.vue';
import { UseMenuHandlerStore } from '@/stores/menu-handler';

const menuHandleStore = UseMenuHandlerStore()


</script>