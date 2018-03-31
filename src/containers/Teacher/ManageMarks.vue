<template>
  <v-container>
    <v-card>
      <v-card-title>Notes pour le module&nbsp;<b>{{ marksAndStudents[0].title }}</b></v-card-title>
      <v-divider></v-divider>
      <v-card-title>Promotion:&nbsp;<b>{{ marksAndStudents[0].code + ' ' + marksAndStudents[0].year }}</b></v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div dense class="scrollable-list">
          <div v-for="_student in marksAndStudents" v-bind:key="_student.id">
            <v-layout row align-center>
              <b  class="ma-2">
                {{ _student.firstname }}
                {{ _student.name }} 
                <v-text-field label="Note" type="number" v-model="_student.note">
                </v-text-field>
              </b>
              <v-flex row>
                <v-text-field class="ma-2" rows="2" textarea label="Commentaire" v-model="_student.comment">
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn router to="/mymodules">Envoyer</v-btn>
        <v-btn color="primary">Envoyer</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss"></style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ManageMarks',
    components: { },
    data() {
      return {}
    },

    created() {
      this.$store.dispatch('modules/getMyModules');
      this.$store.dispatch('trainings/getTrainings');
      this.$store.dispatch('classes/getClasses');
      this.$store.dispatch('classes/getMarksAndStudents', {...this.$route.params});
    },

    computed: {
      ...mapState('classes', ['marksAndStudents'])
    },

    methods: {

    }
  }
</script>
