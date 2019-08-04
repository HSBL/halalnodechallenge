<template>
  <div id="app">
    <appHeader v-on:emitSignin="changeSignin()" v-bind:status="status" />
    <!-- Sign in -->
    <div v-if="status.signin && !status.login">
      <form class="form-signin">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal">Sign in Please</h1>
        </div>
        <div class="form-label-group">
          <input
            ref="user"
            type="text"
            id="user"
            class="form-control"
            value="ruly"
            required
            autofocus
          />
          <label for="inputEmail">Username</label>
        </div>

        <div class="form-label-group">
          <input
            ref="password"
            type="password"
            id="inputPassword"
            class="form-control"
            value="Qwerty123"
            required
          />
          <label for="inputPassword">Password</label>
        </div>
        <button
          class="btn btn-lg btn-primary btn-block"
          v-on:click.prevent="submitSignin"
          type="submit"
        >Sign in</button>
      </form>
    </div>
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/components/Header.vue";

export default {
  components: { appHeader },
  data() {
    return {
      status: {
        signin: false,
        login: false,
        output: ""
      }
    };
  },
  methods: {
    changeSignin: function() {
      this.status.signin = !this.status.signin;
    },
    submitSignin: function() {
      let currentObj = this;
      this.$http
        .post("https://api.halalnode.com:8250/v1/accounts/login", {
          identity: this.$refs.user.value,
          password: this.$refs.password.value,
          registrationToken: "",
          admin: false,
          staySignedIn: false
        })
        .then(function(response) {
          currentObj.status.output = response.data;
          currentObj.status.login = true;
        })
        .catch(function(error) {
          currentObj.status.output = error;
        });
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;
  padding: 0.75rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}
</style>
