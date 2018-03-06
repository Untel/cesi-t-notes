<template>
  <v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex class="ma-2" v-for="_module in myModules()" v-bind:key="_module.id">
        <v-card tile>
          <v-card-title><h4>{{ _module.name }}</h4></v-card-title>
          <v-divider></v-divider>
            <v-select
              :items="getClassesBytraining()">
              
            </v-select>
          <v-divider></v-divider>
          <v-list dense class="scrollable-list">
            <v-list-tile v-for="student in getStudentsByClass()" v-bind:key="student.id">
              <v-list-tile-content>{{ student.firstname }} {{ student.lastname }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped lang="scss">

</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Login',
    components: { },
    data: () => {
      return {};
    },

    created() {
      this.$store.dispatch('modules/getModules');
      this.$store.dispatch('students/getStudents');
      this.$store.dispatch('classes/getClasses');
    },

    computed: {
      ...mapState('modules', ['modules']),
      ...mapGetters('modules', ['myModules', 'gettrainingByModule']),
      ...mapGetters('trainings', ['getClassesBytraining']),
      ...mapGetters('student', ['getStudentByClass']),
    },

    methods: {

    }
  }
</script>
