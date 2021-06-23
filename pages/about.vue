<template>
  <div>
    <v-card width="500" style="margin: 0 auto; margin-top: 50px; padding: 40px">
      <v-card-title>About Application</v-card-title>
      <v-textarea v-model="about" outlined placeholder="Enter Some value"/>
      <v-btn width="100%" elevation="0" color="primary" @click="saveAbout">Submit</v-btn>
    </v-card>
    <v-card width="500" style="margin: 0 auto; margin-top: 20px; padding: 40px">
      <v-card-title>Contact Us</v-card-title>
      <v-textarea v-model="contactUs" outlined placeholder="Enter Some value"/>
      <v-btn width="100%" elevation="0" color="primary" @click="saveContactUs">Submit</v-btn>
    </v-card>

    <loading-dialog v-model="loading"/>
  </div>
</template>

<script>
import LoadingDialog from "../common/ui/widgets/LoadingDialog";

export default {
  name: "about",
  components: {LoadingDialog},
  data: () => ({
    about: '',
    contactUs: '',
    loading: false,
  }),

  async asyncData({ $axios }) {
    return {
      about: await $axios.$get('/about'),
      contactUs: await $axios.$get('/about/contact-us'),
    }
  },

  methods: {
    async saveAbout() {
      window.console.log('here')
      this.loading = true
      await this.$axios.$post('/about', {value: this.about})
      this.loading = false
    },
    async saveContactUs() {
      this.loading = true
      await this.$axios.$post('/about/contact-us', {value: this.contactUs})
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>