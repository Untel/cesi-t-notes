<template>
  <v-container>
    <v-card v-if="!(getClassLoading && getModulesLoading && getMarksAndStudentsLoading && getClassLoading)">
      <v-card-title>Notes pour le module&nbsp;<b>{{ marksAndStudents[0].title }}</b></v-card-title>
      <v-divider></v-divider>
      <v-card-title>Promotion:&nbsp;<b>{{ marksAndStudents[0].code + ' ' + marksAndStudents[0].year }}</b></v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div dense class="scrollable-list">
          <div v-for="_student in marksAndStudents" v-bind:key="_student.idStudent">
            <v-layout row align-center>
              <b  class="ma-2">
                {{ _student.firstname }}
                {{ _student.name }}
                <v-text-field min="0" max="20" label="Note" type="number" v-model="notes[_student.idStudent]">
                </v-text-field>
              </b>
              <v-flex row>
                <v-text-field class="ma-2" rows="2" textarea label="Commentaire" v-model="comments[_student.idStudent]">
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn router to="/mymodules">Retour</v-btn>
        <v-btn color="primary" @click.native="submit()">Envoyer</v-btn>
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
      return {
        notes: {},
        comments: {},
      }
    },

    created() {
      console.log('Infos:', {...this.$route.params})
      this.$store.dispatch('modules/getMyModules');
      this.$store.dispatch('trainings/getTrainings');
      this.$store.dispatch('classes/getClasses');
      this.$store.dispatch('classes/getMarksAndStudents', {...this.$route.params});
    },

    computed: {
      ...mapState('classes', ['marksAndStudents', 'getClassLoading', 'getMarksAndStudentsLoading']),
      ...mapState('trainings', ['getTrainingsLoading']),
      ...mapState('modules', ['getModulesLoading']),
    },

    methods: {
      submit() {
        const data = this.marksAndStudents.map(student => {
          return {
            idStudent: student.idStudent,
            idModule: this.$route.params.idModule,
            comment: this.comments[student.idStudent] || null,
            note: this.notes[student.idStudent] || null,
            moduleDate: '03-04-2018',
            isRemedial: false,
          }
        });
        console.log('Formatted data', data)
        this.$store.dispatch('teachers/addMark', data);
      }
    }
  }
</script>
