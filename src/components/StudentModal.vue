<template>
  <v-dialog
    :value="student"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
  >
    <v-card tile v-if="student">
      <v-toolbar card dark color="primary">
        <v-btn icon @click.native="SELECT_STUDENT(null)" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ student.firstname }} {{ student.lastname }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="SELECT_STUDENT(null)">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>

      </v-card-text>
      <div style="flex: 1 1 auto;"/>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
</style>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  export default {
    name: 'student-modal',
    data: () => {
      return {}
    },

    computed: {
      ...mapState({
        student: state => state.classes.selectedStudent
      })
    },

    created() {
      this.$store.dispatch('classes/getClasses');
    },

    methods: {
      ...mapMutations('classes', ['SELECT_STUDENT'])
    }
  }
</script>
