<template>
  <div id="app">
    <Loadlayout v-if="isLoading">
      <BaseLoading />
    </Loadlayout>

    <section v-else>
      <MainLayout v-if="user" />
      <AuthLayout v-else />
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loadlayout from "./layouts/LoadLayout";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import BaseLoading from "@/components/BaseLoading.vue";

export default {
  name: "App",
  components: {
    MainLayout,
    Loadlayout,
    AuthLayout,
    BaseLoading
  },
  computed: {
    // Uso: mapState(moduleName, { state })
    ...mapState("loading", { isLoading: "isLoading" }),
    ...mapState("auth", { user: "user" })
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
</style>
