<template>
  <div>
    <v-app-bar
      color="pink accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>NuxtJs</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
        class="px-0"
      >
        <v-list-item-group
          v-model="group"
          active-class="pink--text text--accent-4"
        >
          <v-list-item to="/" class="mb-0">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/create" class="mb-0">
            <v-list-item-title>Create Desert</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
