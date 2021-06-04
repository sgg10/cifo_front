<template>
  <div>
    <Card
      :title="title"
      :link="link"
      :img="img"
      :isVerified="isVerified"
      :isCardLoading="isCardLoading"
      @accion="authenticate($event)"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "./Card";
import Document from "@/assets/images/document.png";
import { authenticateFile } from "@/api/documents";
export default {
  components: { Card },
  props: ["title", "link", "isVerified"],
  data() {
    return {
      img: Document,
      isCardLoading: false
    };
  },
  computed: {
    ...mapState("auth", { access_token: "access_token" })
  },
  methods: {
    async authenticate(event) {
      if (event) {
        this.isCardLoading = true;
        const response = await authenticateFile(
          {
            title: this.title,
            url: this.link
          },
          this.access_token
        );
        this.isCardLoading = false;
        this.$emit("accion", true);
      }
    }
  }
};
</script>
