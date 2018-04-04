<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h4>Nouvel étudiant</h4>
      </v-card-title>
      <v-card-text>

        <v-layout column>

        <v-card-text>
          <v-text-field
            label="Prénom"
            v-model="newStudent.firstname"
          ></v-text-field>
          <v-text-field
            label="Nom"
            v-model="newStudent.name"
          ></v-text-field>
          <v-text-field
            label="Login"
            v-model="newStudent.login"
          ></v-text-field>
          <v-text-field
            label="Mot de passe"
            v-model="newStudent.password"
            append-icon="cached"
            :append-icon-cb="generatePassword"
          ></v-text-field>
          <v-select
            label="Formation"
            v-model="newStudent.idTrainingClass"
            :items="classes"
            :loading="getClassesLoading"
            item-text="code"
            item-value="id">
          </v-select>
        </v-card-text>


        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn router to="/classes">Retour</v-btn>
        <v-btn color="primary" :disabled="addStudentLoading" @click.native="addStudent(newStudent)">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'NewStudent',
    components: { },
    data: () => {
      return {
        addStudentModal: false,
        newStudent: {
          name: '',
          firstname: '',
          login: '',
          password: '',    
        },
      }
    },

    created() {
      this.$store.dispatch('classes/getClasses');
    },

    computed: {
      ...mapState('classes', ['classes', 'getClassesLoading']),
      ...mapState('students', ['addStudentLoading']),
    },

    methods: {
      ...mapActions('students', ['addStudent']),
      generatePassword() {
        this.newStudent.password = Math.random().toString(36).slice(-8);
      }
    }
  }
</script>
