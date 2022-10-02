<template>
  <div>
    <div class="d-flex justify-space-between">
      <h2>Dessert Table</h2>
      <v-btn to="/create">
        Create
      </v-btn>
    </div>

    <v-divider class="my-5" />

    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      item-key="name"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
      :search="search"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          value: 'name'
        },
        { text: 'Category', value: 'category' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    desserts () {
      return this.$store.state.desserts.datas
    }
  },
  methods: {
    editItem (item) {
      this.$router.push('/edit/' + item.name)
    },
    deleteItem (item) {
      this.$store.dispatch('desserts/delete', item)
    }
  }
}
</script>
