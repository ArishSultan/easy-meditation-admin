<template>
  <div style="display: flex; align-items: center; justify-content: center; height: 90vh;">
    <simple-form v-if="isValid" :data="getData" endpoint="users/change-forgotten-password" title="Reset password"
                 style="width: 400px" return>
      <v-text-field v-model="restPassword" label="New Password" class="span-2" outlined dense type="password"
                    :rules="[(v) => !!v || 'Enter some value',(v) => v.length >= 8 || 'Minimum 8 characters are required']"/>
      <v-text-field label="Confirm Password" class="span-2" outlined dense
                    :rules="[(v) => restPassword === v || 'Both passwords must be same']"/>
    </simple-form>
    <v-card v-else class="sign-in-card" style="text-align: center; padding: 20px" width="500">
      <div class="sign-in-card__header">
        <div style="display: flex; flex-direction: column; width: 100%; justify-content: center">
          <p
              style="font-family: google-sans, serif; font-size: 22px; margin-bottom: 5px; font-weight: bold"
          >
            Invalid Token
          </p>
          <p>It seems like as if the token has been expired or is invalid, please make new forgot password request
            from the mobile application and retry with the new link provided in the email</p>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script>
import SimpleForm from "../../common/ui/widgets/SimpleForm";

export default {
  name: "_token",
  components: {SimpleForm},
  layout: 'none',
  auth: false,

  data: () => ({
    isValid: false,
    restPassword: '',
  }),

  methods: {
    getData() {
      return {
        'token': this.$route.params.token,
        'password': this.restPassword
      }
    }
  },

  async asyncData({route, $axios}) {
    const token = route.params.token

    const resp = await $axios.$post('users/is-valid-token/' + token)
    if (resp.result) {
      return {
        isValid: true
      }
    }

    return {
      isValid: false
    }
  }
}
</script>

<style scoped>

</style>