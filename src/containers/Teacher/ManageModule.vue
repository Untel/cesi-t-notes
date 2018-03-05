<template>
  <v-layout>
    yo
  </v-layout>
</template>

<style scoped lang="scss">

</style>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: 'Login',
    components: { },
    data: () => {
    },

    created() {
      this.$store.dispatch('modules/getModules');
    },

    computed: {
      ...mapState('modules', ['modules']),
    },

    methods: {
      // ...mapMutations('', ['', '']),
      // ...mapActions('', ['']),
    }
  }
</script>
