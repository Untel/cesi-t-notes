<template>
  <v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex xs2 class="ma-2">
        <v-card tile height="100%">
          <v-card-title><h4>Nouvelle promotion</h4></v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-xs-center">
            <v-btn icon @click.native.stop="addClassModal = true">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="ma-2" v-for="_class in classes" v-bind:key="_class.id">
        <v-card tile>
          <v-card-title><h4>{{ getClassName(_class) }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense class="scrollable-list">
            <v-list-tile v-for="_student in _class.students" v-bind:key="_student.id">
              <v-list-tile-content>
                {{ getStudentNameById(_student.id) }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog
      max-width="300"
      v-model="addClassModal"
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-card-title class="headline">
          Ajouter une promotion
        </v-card-title>

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
        </v-card-text>

        {{ newClass }}

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="addClassModal = false">Annuler</v-btn>
          <v-btn color="primary" @click.native="addClass(newClass)">Ajouter</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <student-modal></student-modal>
  </v-container>
</template>

<style scoped lang="scss">
  .scrollable-list {
    overflow-y: auto;
    height: 200px;
  }
</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
  import StudentModal from '@/components/StudentModal'
  export default {
    name: 'Login',
    components: { StudentModal },
    data: () => {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
        },
        addClassModal: false,
        newClass: {
          code: '',
          year: null,
          idTraining: null,
        },
      }
    },

    created() {
      this.$store.dispatch('classes/getClasses');
      this.$store.dispatch('trainings/getTrainings');
      this.$store.dispatch('students/getStudents');
    },

    computed: {
      ...mapState('classes', ['classes', 'selectedStudent']),
      ...mapState('trainings', ['trainings', 'getTrainingsLoading']),
      ...mapGetters('trainings', ['getClassName']),
      ...mapGetters('students', ['getStudentNameById']),
    },

    methods: {
      ...mapMutations('classes', ['SELECT_STUDENT', 'DESELECT_STUDENT']),
      ...mapActions('classes', ['addClass']),
    },
  }
</script>
