<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Nouveau module
      </v-card-title>
      <v-card-text>

        <v-layout>

          <v-text-field
            class="ma-3"
            label="Nom du module"
            v-model="newModule.name">
          </v-text-field>

          <v-select
            class="ma-3"
            label="Enseignant"
            :items="teachers"
            :loading="getTeachersLoading"
            v-model="newModule.teacherId"
            item-text="name"
            item-value="id"
            ></v-select>

          <v-select
            class="ma-3"
            label="Promotion"
            :items="classes"
            :loading="getTeachersLoading"
            v-model="newModule.classId"
            item-text="name"
            item-value="id"
          ></v-select>

        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn router to="/modules">Retour</v-btn>
        <v-btn color="primary" :disabled="addModuleLoading" @click.native="addModule(newModule)">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: 'NewModule',
    components: { },
    data: () => {
      return {
        addModuleModal: false,
        newModule: {
          name: '',
          teacherId: null,
          classId: null,
        },
      }
    },

    created() {
      this.$store.dispatch('teachers/getTeachers');
      this.$store.dispatch('classes/getClasses');
    },

    computed: {
      ...mapState('teachers', ['teachers', 'getTeachersLoading']),
      ...mapState('classes', ['classes', 'getClassesLoading']),
      ...mapState('modules', ['addModuleLoading']),
    },

    methods: {
      // ...mapMutations('', ['', '']),
      ...mapActions('modules', ['addModule']),
    }
  }
</script>
