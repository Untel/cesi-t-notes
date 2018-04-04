<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h4>Mes notes</h4>
      </v-card-title>
      <v-card-text>
        <v-layout column v-if="!(myMarksLoading && modulesLoading)">

            <div dense class="scrollable-list">
              <div v-for="mark in myMarks" v-bind:key="mark.id">
                <v-layout row align-center>
                  <v-layout column>
                    <div class="ma-2">
                      Module: <b>{{ getModuleById(mark.idModule).title }}</b>
                    </div>
                    <div class="ma-2">
                      Note: <v-avatar size="30" :color="hiddenMark(mark.note).color" style="font-size: 15px;">
                        {{ hiddenMark(mark.note).value }}
                      </v-avatar>
                    </div>
                  </v-layout>
                  <v-flex row>
                    <v-text-field readonly class="ma-2" rows="2" textarea label="Commentaire" v-model="mark.comment">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
              </div>
          </div>

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
      this.$store.dispatch('students/getMyMarks');
      this.$store.dispatch('modules/getModules');
    },

    computed: {
      ...mapGetters('modules', ['modulesLoading', 'getModuleById']),
      ...mapGetters('students', ['hiddenMark']),
      ...mapState('students', ['myMarksLoading', 'myMarks']),
    },

    methods: {
      // ...mapActions('students', ['addStudent']),
    }
  }
</script>
