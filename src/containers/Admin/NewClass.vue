<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h4>Nouveau module</h4>
      </v-card-title>
      <v-card-text>

        <v-layout column>

        <v-card-text>
          <v-text-field
            label="Code de la promotion"
            v-model="newClass.code"
            autofocus
            @keyup.enter="validate"
          ></v-text-field>
          <v-text-field
            label="Année"
            type="number"
            v-model="newClass.year"
            @keyup.enter="validate"
          ></v-text-field>
          <v-select
            label="Formation"
            v-model="newClass.idTraining"
            :items="trainings"
            :loading="getTrainingsLoading"
            item-text="title"
            item-value="id">
          </v-select>
            <template slot="item" slot-scope="data">
              {{ data.item.title }}
            </template>
            <template slot="selection" slot-scope="data">
              {{ data.item.code }}
            </template>
        </v-card-text>


        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn router to="/classes">Retour</v-btn>
        <v-btn color="primary" :disabled="addClassLoading" @click.native="addClass(newClass)">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'NewClass',
    components: { },
    data: () => {
      return {
        addClassModal: false,
        newClass: {
          name: '',
          idTeacher: null,
          idClass: null,
        },
      }
    },

    created() {
      this.$store.dispatch('trainings/getTrainings');
    },

    computed: {
      ...mapState('trainings', ['trainings', 'getTrainingsLoading']),
      ...mapState('trainings', ['addClassLoading']),
    },

    methods: {
      ...mapActions('classes', ['addClass']),
    }
  }
</script>
