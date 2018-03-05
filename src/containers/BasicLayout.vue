<template>
    
  <section>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in menu"
          :key="i"
          router
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
    >
        <v-btn icon @click.native.stop="TOGGLE_DARK_MODE()" >
          <v-icon>lightbulb_outline</v-icon>
        </v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </section>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      drawer: true,
      menu: [{
        name: 'Acceuil',
        path: '/',
        icon: 'dashboard',
        roles: ['admin', 'teacher', 'student'],
      }, {
        name: 'Promotions',
        path: '/students',
        icon: 'person',
        roles: ['admin'],
      }, {
        name: 'Modules',
        path: '/modules',
        icon: 'view_module',
        roles: ['admin'],
      }],
      title: 'CESI'
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_DARK_MODE']),
  },
  name: 'BasicLayout'
}
</script>
