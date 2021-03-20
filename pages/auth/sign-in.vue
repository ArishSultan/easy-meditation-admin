<template>
  <div class="sign-in-container">
    <v-card class="sign-in-card" style="text-align: center">
      <center>
        <img src="@/assets/logo.png" alt="" width="100" style="text-align: center" />
      </center>
      <div class="sign-in-card__header">

        <div style="display: flex; flex-direction: column; width: 100%; justify-content: center">
          <p
              style="font-family: google-sans, serif; font-size: 22px; margin-bottom: 5px"
          >
            Authenticate yourself
          </p>
          <p>provide your credentials</p>
        </div>
      </div>

      <v-text-field v-model="username" label="Username" outlined dense/>
      <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
      />

      <v-btn color="primary" width="100%" elevation="0" @click="signIn"
      >Submit
      </v-btn
      >
    </v-card>

    <v-snackbar v-model="error">{{ error }}</v-snackbar>
  </div>
</template>

<script>
export default {
  layout: "none",

  data: () => ({
    error: {},
    username: "",
    password: "",
  }),

  methods: {
    async signIn() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        });
      } catch (e) {
        console.log(e.response)
        if (e.response.status === 401) {
          this.error = 'Username or password is incorrect'
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.sign-in-container
  width: 100%
  height: 90vh
  display: flex
  align-items: center
  justify-content: center

.sign-in-card
  width: 400px
  padding: 40px 40px 36px

  &__header
    display: flex
    padding-bottom: 20px
</style>
