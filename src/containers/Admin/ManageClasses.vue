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
      <v-flex class="ma-2" v-for="classe in classes" v-bind:key="classe.id">
        <v-card tile>
          <v-card-title><h4>{{ classe.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense class="scrollable-list">
            <v-list-tile v-for="student in classe.students" v-bind:key="student.id">
              <v-list-tile-content @click="SELECT_STUDENT(student)">{{ student.firstname }} {{ student.lastname }}</v-list-tile-content>
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
            label="Nom de la promotion"
            v-model="newClassName"
            autofocus
            @keyup.enter="validate"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="addClassModal = false">Annuler</v-btn>
          <v-btn color="primary" @click.native="addClass({ name: newClassName })">Ajouter</v-btn>
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
  import { mapMutations, mapState, mapActions } from 'vuex'
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
        newClassName: '',
      }
    },

    created() {
    },

    computed: {
      ...mapState('classes', ['classes', 'selectedStudent']),
    },

    methods: {
      ...mapMutations('classes', ['SELECT_STUDENT', 'DESELECT_STUDENT']),
      ...mapActions('classes', ['addClass']),
    }
  }
</script>
