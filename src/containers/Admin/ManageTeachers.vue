<template>
<v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex xs2 class="ma-2">
        <v-card tile height="100%">
          <v-card-title><h4>Nouvel enseignant</h4></v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-xs-center">
            <v-btn router to="/teachers/new" icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="ma-2" v-for="teacher in teachers" v-bind:key="teacher.id">
        <v-card tile>
          <v-card-title>
            <h4>{{ teacher.firstname }} {{ teacher.name }}</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <b>Modules:</b>
            <ul></ul>
            <div v-for="_module in getModulesByTeacher(teacher.id)" v-bind:key="_module.id">
              - {{ _module.title }}
            </div>
          </v-card-text>
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
      return {
        addModuleModal: false,
        newModuleName: ''
      }
    },

    created() {
      this.$store.dispatch('modules/getModules');
      this.$store.dispatch('teachers/getTeachers');
    },

    computed: {
      ...mapState('modules', ['modules']),
      ...mapState('teachers', ['teachers']),
      ...mapGetters('teachers', ['getTeacherNameById']),
      ...mapGetters('modules', ['getModulesByTeacher']),
    },

    methods: {
      // ...mapMutations('', ['', '']),
      ...mapActions('modules', ['addModule']),
    }
  }
</script>
