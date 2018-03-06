<template>
  <v-layout class="login-container">
    <div class="bg-img"></div>
    <v-navigation-drawer
      permanent
      right
      fixed
      app
      class="login-form"
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
          <div class="btn-center">
            <v-btn color="primary" :disabled="loading === true" @click.native="login({ username, password })">Connection</v-btn>
          </div>
        </v-container>
      </v-navigation-drawer>
  </v-layout>
</template>

<style scoped lang="scss">
  .login-container {
    height: 100%;

    .login-form {
      display: flex;
      min-width: 300px;
      width: calc(100% - 989px)!important;
      max-width: calc(100% - 989px);
    }

    .bg-img {
      background: url(/static/img/login_bg.40500cf.jpg);
      width: 100%;
      background-repeat: no-repeat;
    }

    .btn-center {
      justify-content: center;
      display:flex;
    }

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
