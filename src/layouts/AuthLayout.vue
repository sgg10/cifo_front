<template>
  <div>
    <b-container fluid>
      <router-view />

      <FooterBar />
    </b-container>
  </div>
</template>

<script>
import FooterBar from "@/components/Footer/Index";
export default {
  name: "MainLayout",
  components: { FooterBar }
};
</script>
