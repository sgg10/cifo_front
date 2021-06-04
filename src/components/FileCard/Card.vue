<template>
  <div>
    <b-card :img-src="img" img-top class="card mb-5" style="max-width: 11rem;">
      <b-card-title>
        <p>
          <b-icon
            v-if="isVerified"
            style="color: rgb(45, 206, 117);"
            icon="check2-circle"
            font-scale="1"
            v-b-tooltip.hover
            title="Authenticated document"
          ></b-icon>
          <b-icon
            v-else
            style="color: rgb(168, 46, 46);"
            icon="x-circle"
            font-scale="1"
            v-b-tooltip.hover
            title="Unauthenticated document"
          ></b-icon>
          {{ title }}
        </p>
      </b-card-title>
      <b-card-body>
        <div v-if="isCardLoading">
          <b-icon
            style="color: rgb(45, 206, 117);"
            icon="circle-fill"
            animation="throb"
            font-scale="4"
          ></b-icon>
        </div>
        <section v-else>
          <b-row class="">
            <b-col v-if="!isVerified" class="mb-2">
              <b-button size="sm" variant="success" @click="emite"
                >Authenticate</b-button
              >
            </b-col>
            <b-col>
              <a :href="link" target="_blank">
                <b-button size="sm" variant="primary">
                  <b-icon
                    icon="box-arrow-in-up-right"
                    aria-hidden="true"
                  ></b-icon>
                  Open
                </b-button>
              </a>
            </b-col>
          </b-row>
        </section>
      </b-card-body>
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
