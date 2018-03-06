<template>
  <v-layout class="login-container">
    <!-- <img src="@/assets/login_bg.jpg" alt=""> -->
    <v-navigation-drawer
      permanent
      right
      fixed
      app
      >
        <v-container column>
          <v-text-field label="Nom d'utilisateur" v-model="username"></v-text-field>
          <v-text-field
            label="Mot de passe"
            v-model="password"
            :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passwordVisible = !passwordVisible)"
            :type="!passwordVisible ? 'password' : 'text'"
            @keyup.enter="login({ username, password })"
          ></v-text-field>
          <v-btn color="primary" :disabled="loading === true" @click.native="login({ username, password })">Connection</v-btn>
        </v-container>
      </v-navigation-drawer>
  </v-layout>
</template>

<style scoped lang="scss">
  .login-container {
    height: 100%;
    background-image: url('/static/login_bg.jpg');
    background-size: contain;

    img {
      height: 100%;
      width: 100%;
    }
  }
</style>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  export default {
    name: 'Login',
    data: () => {
      return {
        password: '',
        username: '',
        passwordVisible: false,
      }
    },

    computed: {
      ...mapState(['loading']),
    },

    created() {
    },

    methods: {
      ...mapActions(['login']),
      ...mapMutations(['']),
    }
  }
</script>
