<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="classes"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
      <v-flex
        slot="item"
        slot-scope="props"
      >
        <v-card>
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-for="student in props.item.students" v-bind:key="student.id">
              <v-list-tile-content @click="SELECT_STUDENT(student)">{{ student.firstname }} {{ student.lastname }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>

    <student-modal></student-modal>
  </v-container>
</template>

<style scoped lang="scss">

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

        selectedStudent: null,
        classes: [
          {
            name: 'RIL 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Kevin', lastname: 'Buzit' },
              { id: 3, firstname: 'Kevin', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Buzit' },
              { id: 5, firstname: 'Kevin', lastname: 'Kevin' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          },
          {
            name: 'RIRSR 2017',
            students: [
              { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
              { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
            ]
          }
        ]
      }
    },

    created() {
    },

    methods: {
    //   ...mapActions(['']),
      ...mapMutations(['SELECT_STUDENT', 'DESELECT_STUDENT']),
    }
  }
</script>
