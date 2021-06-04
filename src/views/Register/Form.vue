<template>
  <div>
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <LoadLayout v-if="registerLoading">
                <BaseLoading variant="success" />
              </LoadLayout>
              <div v-else>
                <b-form role="form" @submit.prevent="onSubmit">
                  <b-form-input
                    alternative
                    class="mb-3"
                    type="number"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Identification"
                    name="Identification"
                    :rules="{ required: true }"
                    v-model="form.identification"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Name"
                    name="Name"
                    :rules="{ required: true }"
                    v-model="form.name"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="Address"
                    name="Address"
                    :rules="{ required: true, address: true }"
                    v-model="form.address"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    type="email"
                    class="mb-3"
                    prepend-icon="ni ni-mobile-button"
                    placeholder="Email"
                    name="Email"
                    :rules="{ required: true }"
                    v-model="form.email"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="Password"
                    type="password"
                    name="Password"
                    :rules="{ required: true, min: 8 }"
                    v-model="form.password"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="Confirm password"
                    type="password"
                    name="Confirm Password"
                    :rules="{ required: true, min: 8 }"
                    v-model="form.password_confirmation"
                  >
                  </b-form-input>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4"
                      >Create account</b-button
                    >
                  </div>
                </b-form>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col class="text-center">
              <router-link to="/login" class="text-light"
                ><small>Login</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { signup } from "@/api/auth";
import showToast from "@/utils/showToast";
import LoadLayout from "@/layouts/LoadLayout";
import BaseLoading from "@/components/BaseLoading";
export default {
  name: "Register",
  components: { LoadLayout, BaseLoading },
  data() {
    return {
      form: {
        email: "",
        identification: "",
        name: "",
        password: "",
        password_confirmation: "",
        address: ""
      },
      registerLoading: false
    };
  },
  methods: {
    onSubmit() {
      this.registerLoading = true;
      this.form.identification = parseInt(this.form.identification);
      signup(this.form)
        .then(({ data }) => {
          showToast(
            this.$bvToast,
            "Complete your register",
            `We send a verification email to ${data.email}, active your account to continue.`,
            "success"
          );
          setTimeout(() => this.$router.push({ path: "/login" }), 3000);
        })
        .catch(err =>
          showToast(this.$bvToast, "Error", this.getError(err), "danger")
        )
        .finally(() => {
          this.registerLoading = false;
        });
    },
    getError(err) {
      const { data } = err.response;
      let errors = Object.entries(data);
      errors = errors.map(error => `${error[0]}: ${error[1][0]}`);
      let message = "";
      errors.forEach(error => (message += `${error}`));
      return message;
    }
  }
};
</script>
