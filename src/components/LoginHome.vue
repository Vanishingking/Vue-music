<template>
  <router-view v-slot="{ Component }">
    <transition :name="$store.state.skip_mode">
      <keep-alive :include="$store.state.music_play_name">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: "LoginHome"
}
</script>

<style scoped>

</style>