<template>

    <router-view v-slot="{ Component }">
        <transition :name="$store.state.skip_mode"  >
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>

export default {
        name: "Mine",
        components: {

            // CScs
        }
    }
</script>

<style scoped>

</style>