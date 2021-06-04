<template>
  <div>
    <b-card
      :title="title"
      :img-src="img"
      img-top
      style="max-width: 15rem;"
      class="card mb-5"
      img-width="50"
      img-height="90"
    >
      <div v-if="isCardLoading">
        <b-icon
          style="color: rgb(45, 206, 117);"
          icon="circle-fill"
          animation="throb"
          font-scale="4"
        ></b-icon>
      </div>
      <section v-else>
        <b-icon
          v-if="isVerified"
          style="color: rgb(45, 206, 117);"
          icon="check2-circle"
          font-scale="2"
        ></b-icon>
        <b-icon
          v-else
          style="color: rgb(168, 46, 46);"
          icon="x-circle"
          font-scale="2"
        ></b-icon>
        <b-row class="mt-1">
          <b-col v-if="!isVerified" class="mb-2">
            <b-button size="sm" variant="success" @click="emite"
              >Authenticate</b-button
            >
          </b-col>
          <b-col>
            <a :href="link" target="_blank">
              <b-button size="sm" variant="primary">
                <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
                Download
              </b-button>
            </a>
          </b-col>
        </b-row>
      </section>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["title", "img", "link", "isVerified", "isCardLoading"],
  methods: {
    emite() {
      this.$emit("accion", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  color: #fff;
  background-color: transparent;
  .card-title {
    font-size: 18px;
  }
}
</style>
