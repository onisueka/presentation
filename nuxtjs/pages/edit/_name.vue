<template>
  <formsDessertFormComponent v-if="is_loaded" :form-object="form" />
</template>

<script>
export default {
  data () {
    return {
      is_loaded: false,
      form: {}
    }
  },
  async fetch () {
    const name = this.$route.params?.name || ''
    const resultData = await this.$store.state.desserts.datas
    this.form = resultData.find(i => i.name === name)
    this.form.editName = name

    this.is_loaded = true
  }
}
</script>
