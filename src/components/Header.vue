<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link class="nav-link" to="/">FE Challenge</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/certification" v-if="status.login">View Certifications</router-link>
        </li>
      </ul>
      <span
        v-if="status.login"
        class="navbar-text"
      >Welcome, {{status.output.data.account.buyer.fullname}}</span>
      <form class="form-inline mt-2 mt-md-0">
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          v-if="!status.login"
          v-on:click.prevent="signin"
        >Sign in</button>
        <button
          class="btn btn-outline-danger my-2 my-sm-0"
          v-if="status.login"
          v-on:click.prevent="logout"
        >
          <router-link to="/">Log out</router-link>
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    status
  },
  data() {
    return {
      result: null
    };
  },
  methods: {
    signin: function() {
      this.$emit("emitSignin");
    },
    logout: function() {
      let currentObj = this;
      this.$http
        .delete("https://api.halalnode.com:8250/v1/accounts/logout", {
          headers: {
            Authorization: "Bearer " + this.status.output.data.accessToken
          }
        })
        .then(function(response) {
          currentObj.result = response.data;
          currentObj.status.login = false;
          alert(currentObj.result.message);
        })
        .catch(function(error) {
          currentObj.result = error;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-text {
  margin-right: 1rem;
}
</style>
