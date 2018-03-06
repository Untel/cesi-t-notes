<template>
<v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex xs2 class="ma-2">
        <v-card tile height="100%">
          <v-card-title><h4>Nouveau module</h4></v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-xs-center">
            <v-btn router to="/modules/new" icon @click.native.stop="addClassModal = true">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="ma-2" v-for="_module in modules" v-bind:key="_module.id">
        <v-card tile>
          <v-card-title><h4>{{ _module.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Enseignant: {{ getTeacherById(_module.idTeacher) ? getTeacherById(_module.idTeacher).name : '' }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog
      max-width="300"
      v-model="addModuleModal"
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-card-title class="headline">
          Ajouter une promotion
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Nom de la promotion"
            v-model="newModuleName"
            autofocus
            @keyup.enter="addModule({ name: newModuleName })"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="addModuleModal = false">Annuler</v-btn>
          <v-btn color="primary" @click.native="addModule({ name: newModuleName })">Ajouter</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
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
      ...mapGetters('teachers', ['getTeacherById'])
    },

    methods: {
      // ...mapMutations('', ['', '']),
      ...mapActions('modules', ['addModule']),
    }
  }
</script>
