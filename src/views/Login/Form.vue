<template>
  <div>
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <LoadLayout v-if="loginLoading">
                <BaseLoading variant="success" />
              </LoadLayout>
              <div v-else>
                <b-form role="form" @submit.prevent="onSubmit">
                  <b-form-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="email"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  >
                  </b-form-input>

                  <div class="text-center">
                    <b-button type="submit" variant="success" class="my-4"
                      >Sign in</b-button
                    >
                  </div>
                </b-form>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col class="text-center">
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
import { login } from "@/api/auth";
import { mapMutations } from "vuex";
import showToast from "@/utils/showToast";
import LoadLayout from "@/layouts/LoadLayout";
import BaseLoading from "@/components/BaseLoading";
export default {
  name: "Login",
  components: { LoadLayout, BaseLoading },
  data() {
    return {
      email: "",
      password: "",
      loginLoading: false
    };
  },
  methods: {
    ...mapMutations("auth", {
      setAccessToken: "SET_ACCESS_TOKEN",
      setUser: "SET_USER"
    }),
    onSubmit() {
      this.loginLoading = true;
      login(this.email, this.password)
        .then(({ data }) => {
          localStorage.setItem("refresh_token", data.refresh);
          this.setAccessToken(data.access);
          this.setUser(data.user);
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          showToast(
            this.$bvToast,
            "Error",
            err.response.data.non_field_errors[0],
            "warning"
          );
        })
        .finally(() => {
          this.loginLoading = false;
        });
    }
  }
};
</script>
