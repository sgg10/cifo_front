<template>
  <div>
    <b-container fluid>
      <HeaderBar />

      <router-view />

      <FooterBar />
    </b-container>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar/Index";
import FooterBar from "@/components/Footer/Index";
export default {
  name: "MainLayout",
  components: {
    HeaderBar,
    FooterBar
  }
};
</script>
