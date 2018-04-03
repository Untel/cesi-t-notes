<template>
  <v-layout class="login-container">
    <!-- <img src="@/assets/login_bg.jpg" alt=""> -->
    <v-navigation-drawer
      style="background-color: rgb(242, 242, 242);"
      width="350"
      permanent
      right
      fixed
      app
      >
        <div class="login-form">
          <img src="/static/cesi_logo.png" alt="">
          <v-layout style="height: 100%" align-content-center justify-space-between>
            <v-container>
              <v-text-field label="Nom d'utilisateur" v-model="username"></v-text-field>
              <v-text-field
                label="Mot de passe"
                v-model="password"
                :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                :type="!passwordVisible ? 'password' : 'text'"
                @keyup.enter="login({ username, password })"
              ></v-text-field>

              <v-flex style="text-align: center;">
                <v-btn color="primary" @click.native="login({ username, password })">Connexion</v-btn>
              </v-flex>
            </v-container>
          </v-layout>
        </div>
      </v-navigation-drawer>
  </v-layout>
</template>

<style scoped lang="scss">

  .login-form {
    background-image: url('/static/login_bg_logo.png');
    height: 90%;
    background-size: contain;

    img {
      margin-top: 30px;
      margin-left: 30px;
    }
  }

  .login-container {
    height: 100%;
    background-image: url('/static/login_bg.jpg');
    background-size: contain;
    background-color: #010012;

    @media screen and (max-width: 1040px) {
      background-size: cover;
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
