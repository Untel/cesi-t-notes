<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h4>Mes notes</h4>
      </v-card-title>
      <v-card-text>

        <v-layout column>

        <v-card-text>
          <div dense class="scrollable-list">
            <div v-for="mark in myMarks" v-bind:key="mark.id">
              <v-layout row align-center>
                <b  class="ma-2">
                  <!-- {{ _student.firstname }}
                  {{ _student.name }}  -->
                  <v-text-field label="Note" type="number" v-model="mark.note">
                  </v-text-field>
                </b>
                <v-flex row>
                  <v-text-field class="ma-2" rows="2" textarea label="Commentaire" v-model="mark.comment">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </div>
        </div>
      </v-card-text>

        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
</style>

<script>
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ShowMyMarks',
    components: { },
    data: () => {
      return {
        }
    },

    created() {
      console.log('Data');
      this.$store.dispatch('students/getMyMarks');
      this.$store.dispatch('modules/getModules');
    },

    computed: {
      // ...mapState('classes', ['classes', 'getClassesLoading']),
      ...mapState('students', ['myMarksLoading', 'myMarks']),
    },

    methods: {
      // ...mapActions('students', ['addStudent']),
    }
  }
</script>
