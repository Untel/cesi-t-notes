<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Nouveau module
      </v-card-title>
      <v-card-text>

        <v-layout column>

          <v-text-field
            class="ma-3"
            label="Nom du module"
            v-model="newModule.name">
          </v-text-field>

          <v-text-field
            textarea
            class="ma-3"
            label="Contenu"
            v-model="newModule.content">
          </v-text-field>

          <v-select
            class="ma-3"
            label="Enseignant"
            :items="teachers"
            :loading="getTeachersLoading"
            v-model="newModule.idTeacher"
            item-value="id"
            >
              <template slot="item" scope="data">
                {{ data.item.firstname }} {{ data.item.name }}
              </template>
              <template slot="selection" scope="data">
                {{ data.item.firstname[0] }}. {{ data.item.name }}
              </template>
            </v-select>

          <v-select
            class="ma-3"
            label="Promotion"
            :items="trainings"
            :loading="getTrainingsLoading"
            v-model="newModule.idClass"
            item-text="code"
            item-value="id"
          >
            <template slot="item" scope="data">
              {{ data.item.title }}
            </template>
            <template slot="selection" scope="data">
              {{ data.item.code }}
            </template>
          </v-select>

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
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'NewModule',
    components: { },
    data: () => {
      return {
        addModuleModal: false,
        newModule: {
          name: '',
          idTeacher: null,
          idClass: null,
        },
      }
    },

    created() {
      this.$store.dispatch('teachers/getTeachers');
      this.$store.dispatch('trainings/getTrainings');
    },

    computed: {
      ...mapState('teachers', ['teachers', 'getTeachersLoading']),
      // ...mapState('classes', ['classes', 'getClassesLoading']),
      ...mapState('trainings', ['trainings', 'getTrainingsLoading']),
      ...mapGetters('trainings', ['getClassName']),
      ...mapState('modules', ['addModuleLoading']),
    },

    methods: {
      // ...mapMutations('', ['', '']),
      ...mapActions('modules', ['addModule']),
    }
  }
</script>
