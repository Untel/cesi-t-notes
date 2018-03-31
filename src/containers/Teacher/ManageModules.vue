<template>
  <v-layout column>
    <v-layout column v-for="_module in myModules" v-bind:key="_module.idModule">

      <v-layout row v-for="training in getTrainingsByModule(_module.idModule)" v-bind:key="training.id">
        
        <v-flex class="ma-2" v-for="_class in getClassesByTraining(training.id)" v-bind:key="_class.id">
          
          <v-card router :to="`/mymodules/1/class/1`">
            <v-card-title>
              Module: {{ _module.title }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-title>
              Promotion: {{ getClassName(_class) }}
            </v-card-title>
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
    </v-layout>
  </v-layout>
</template>

<style scoped lang="scss">

</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Login',
    components: { },
    data: () => {
      return {
      };
    },

    created() {
      this.$store.dispatch('modules/getMyModules');
      this.$store.dispatch('trainings/getTrainings');
      this.$store.dispatch('classes/getClasses');
      this.$store.dispatch('students/getStudents');
    },

    computed: {
      ...mapState('modules', ['myModules']),
      ...mapGetters('trainings', ['getClassName', 'getTrainingsByModule']),
      ...mapGetters('classes', ['getClassesByTraining']),
      ...mapGetters('students', ['getStudentNameById']),
    },

    methods: {

    }
  }
</script>
