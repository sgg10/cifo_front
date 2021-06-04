<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'Home' }">CIFO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ user.name }} </em>
            </template>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HeaderBar",
  computed: {
    ...mapState("auth", { user: "user" })
  },
  methods: {
    ...mapMutations("auth", {
      setAccessToken: "SET_ACCESS_TOKEN",
      setUser: "SET_USER"
    }),
    signOut() {
      window.localStorage.removeItem("refresh_token");
      this.setAccessToken(null);
      this.setUser(null);
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
