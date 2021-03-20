<template>
  <div style="display: flex; align-items: center; justify-content: center; height: 90vh;">
    <v-card class="sign-in-card" style="text-align: center; padding: 20px" width="500">
      <div class="sign-in-card__header">
        <div style="display: flex; flex-direction: column; width: 100%; justify-content: center">
          <p
              style="font-family: google-sans, serif; font-size: 22px; margin-bottom: 5px; font-weight: bold"
          >
            Invalid Account
          </p>
          <p>It appears that the current account is not a valid admin account, click the following
            button and retry logging in with a valid admin account</p>
        </div>
      </div>

      <v-btn color="primary" elevation="0" width="100%" @click="retrySignIn"
      >Retry Sign In
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'none',
  name: "invalid-account",

  methods: {
    retrySignIn() {
      this.$auth.logout();
    }
  }
}
</script>

<style scoped>

</style>