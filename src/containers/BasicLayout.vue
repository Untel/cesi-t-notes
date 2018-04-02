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
          v-if="isAllowed(item.roles)"
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
        <!-- <pre>{{ user }}</pre> -->
      <v-btn icon @click.native.stop="TOGGLE_DARK_MODE()" >
        <v-icon>lightbulb_outline</v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="warning" @click.native.stop="LOGOUT()">Déconnexion</v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </section>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      drawer: true,
      menu: [{
        name: 'Mes notes',
        path: '/mymarks',
        icon: 'dashboard',
        roles: ['Student'],
      }, {
        name: 'Promotions',
        path: '/classes',
        icon: 'person',
        roles: ['Admin'],
      }, {
        name: 'Modules',
        path: '/modules',
        icon: 'view_module',
        roles: ['Admin'],
      }, {
        name: 'Modules',
        path: '/mymodules',
        icon: 'view_module',
        roles: ['Teacher'],
      }],
      title: 'CESI T Notes'
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_DARK_MODE', 'LOGOUT']),
  },
  computed: {
    ...mapGetters(['isAllowed']),
    ...mapState(['user']),
  },
  name: 'BasicLayout'
}
</script>
