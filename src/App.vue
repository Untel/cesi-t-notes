<template>
  <v-app :dark="isDark">

    <router-view/>
    
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>

    <v-snackbar
      :timeout="snack.timeout"
      :color="snack.color"
      multi-line
      :vertical="snack.vertical"
      :value="snack.open"
      @close="CLOSE_SNACK()"
    >
      <span v-html="snack.message"></span>
      <v-btn dark flat @click.native="CLOSE_SNACK()" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'App',

  data() {
    return {}
  },

  computed: {
    ...mapState(['isDark']),
    ...mapState({
      snack: state => state.snack,
    }),
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations('snack', ['CLOSE_SNACK']),    
  }
}
</script>
