<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="form.name"
        :counter="20"
        :rules="notEmptyRules"
        label="Name"
        required
      />

      <v-text-field
        v-model="form.category"
        :counter="20"
        :rules="notEmptyRules"
        label="Category"
        required
      />

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="onSubmit"
      >
        <span v-if="formObject">Update</span>
        <span v-else>Create</span>
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="onCancel"
      >
        Cancle
      </v-btn>
    </v-form>
    <DialogComponent :is-open="showDialog" :title-header="formError.header" :title-content="formError.content" @onClose="showDialog = false" />
  </div>
</template>

<script>
export default {
  props: {
    formObject: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data: () => ({
    valid: false,
    form: {},
    formError: {},
    showDialog: false,
    notEmptyRules: [
      v => !!v || 'This field is required',
      v => (v && v.length <= 20) || 'This field must be less than 20 characters'
    ]
  }),
  fetch () {
    this.form = { ...(this.formObject || {}) }
  },
  methods: {
    async onSubmit () {
      this.formError = {}
      let dispatchUrl = 'desserts/add'
      if (this.formObject) {
        dispatchUrl = 'desserts/update'
      }
      const resultData = await this.$store.dispatch(dispatchUrl, this.form)
      if (resultData.error) {
        if (resultData.duplicate) {
          this.formError.header = 'This name is duplicate'
          this.formError.content = 'Please name it again.'
          this.showDialog = true
        }
      } else {
        this.$router.push('/')
      }
    },
    onCancel () {
      this.$router.push('/')
    }
  }
}
</script>
