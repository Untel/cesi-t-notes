<template>
  <v-layout class="login-container">
    <!-- <img src="@/assets/login_bg.jpg" alt=""> -->
    <v-navigation-drawer
      permanent
      right
      fixed
      app
      >
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

            <v-select :items="roles" v-model="role" item-text="title" item-value="role" label="Vous connecter en tant que">
            </v-select>
            <v-btn color="primary" @click.native="login({ username, password, role })">Connexion</v-btn>
          </v-container>
        </v-layout>
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
        roles: [
          { title: 'Enseignant', role: 'teacher'}, 
          { title: 'Administrateur', role: 'admin' }, 
          { title: 'Etudiant', role: 'student'}],
        password: '',
        username: '',
        role: '',
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
