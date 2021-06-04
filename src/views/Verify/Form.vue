<template>
  <div>
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <LoadLayout v-if="verifyLoading">
                <BaseLoading variant="success" />
              </LoadLayout>
              <div v-else>
                <div v-if="!isActive">
                  <b-form role="form" @submit.prevent="onSubmit">
                    <b-form-input
                      alternative
                      class="mb-3"
                      name="Activation Code"
                      :rules="{ required: true }"
                      prepend-icon="ni ni-key-25"
                      placeholder="Activation Code"
                      v-model="token"
                    >
                    </b-form-input>

                    <div class="text-center">
                      <b-button type="submit" variant="success" class="my-4"
                        >Verify</b-button
                      >
                    </div>
                  </b-form>
                </div>
                <div v-else>
                  <b-row>
                    <b-col class="text-center">
                      <i class="ni ni-check-bold" style="font-size: 10rem;"></i>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="text-center">
                      <p class="mt-3" style="font-size: 25px;">
                        Congratulation, your account is active now, enjoy CIFO!
                      </p>
                      <p>
                        <small
                          >You will be redirected to the login page in 5
                          seconds</small
                        >
                      </p>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { verify } from "@/api/auth";
import showToast from "@/utils/showToast";
import LoadLayout from "@/layouts/LoadLayout";
import BaseLoading from "@/components/BaseLoading";
export default {
  name: "Login",
  components: { LoadLayout, BaseLoading },
  data() {
    return {
      token: "",
      verifyLoading: false,
      isActive: false
    };
  },
  methods: {
    onSubmit() {
      this.verifyAccount();
    },
    verifyAccount() {
      this.verifyLoading = true;
      verify(this.token)
        .then(() => {
          this.isActive = true;
          setTimeout(() => this.$router.push({ name: "Login" }), 5000);
        })
        .catch(() => {
          showToast(this.$bvToast, "Error", "Invalid Token", "danger");
        })
        .finally(() => {
          this.verifyLoading = false;
        });
    }
  },
  mounted() {
    if (this.$route.params.token) {
      this.token = this.$route.params.token;
      this.verifyAccount();
    }
  }
};
</script>
