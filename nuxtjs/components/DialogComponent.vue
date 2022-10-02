<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 primary lighten-2">
          <span v-text="titleHeader" />
        </v-card-title>

        <v-card-text>
          <div class="mt-5">
            <span v-text="titleContent" />
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="$emit('onClose', false)"
          >
            I undestand
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: true
    },
    titleHeader: {
      type: String,
      default: 'Title',
      required: false
    },
    titleContent: {
      type: String,
      default: 'Content',
      required: false
    }
  },
  computed: {
    dialog () {
      return this.isOpen
    }
  }
}
</script>
