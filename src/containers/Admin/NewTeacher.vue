<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Nouvel enseignant
      </v-card-title>
      <v-card-text>

        <v-layout column>

          <v-text-field
            label="Prenom"
            v-model="newTeacher.firstname">
          </v-text-field>

          <v-text-field
            label="Nom"
            v-model="newTeacher.name">
          </v-text-field>

          <v-text-field
            label="Login"
            v-model="newTeacher.login"
          ></v-text-field>
          <v-text-field
            label="Mot de passe"
            v-model="newTeacher.password"
            append-icon="cached"
            :append-icon-cb="generatePassword"
          ></v-text-field>

          <v-select
            label="Modules"
            multiple
            :items="modules"
            :loading="getModulesLoading"
            v-model="newTeacher.modules"
            item-value="id"
            item-text="title"
            >
            </v-select>
            {{ newTeacher.modules}}
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn router to="/teachers">Retour</v-btn>
        <v-btn color="primary" :disabled="addTeacherLoading" @click.native="addTeacher(newTeacher)">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'NewModule',
    components: { },
    data: () => {
      return {
        addModuleModal: false,
        newTeacher: {
          login: '',
          password: '',
          firstname: '',
          name: '',
          modules: [],
        },
      }
    },

    created() {
      this.$store.dispatch('teachers/getTeachers');
      this.$store.dispatch('trainings/getTrainings');
      this.$store.dispatch('modules/getModules');
    },

    computed: {
      ...mapState('teachers', ['teachers', 'addTeacherLoading', 'getTeachersLoading']),
      // ...mapState('classes', ['classes', 'getClassesLoading']),
      ...mapState('trainings', ['trainings', 'getTrainingsLoading']),
      ...mapGetters('trainings', ['getClassName']),
      ...mapState('modules', ['modules', 'getModulesLoading', 'addModuleLoading']),
    },

    methods: {
      // ...mapMutations('', ['', '']),
      ...mapActions('teachers', ['addTeacher']),
      generatePassword() {
        this.newTeacher.password = Math.random().toString(36).slice(-8);
      }
    }
  }
</script>
