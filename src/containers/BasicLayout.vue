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
        name: 'Gestion élèves',
        path: '/students',
        icon: 'person',
        roles: ['admin'],
      }],
      title: 'CESI'
    }
  },
  name: 'BasicLayout'
}
</script>
