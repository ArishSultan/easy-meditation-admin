<template>
  <v-app>
    <v-navigation-drawer
        v-if="navigation"
        v-model="state.drawer"
        app
        class="drawer"
    >
      <span class="drawer__list">
        <v-list nav dense style="height: 100%; max-height: 100%">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <img src="@/assets/logo.png" width="50px">
            <img src="@/assets/title.png" width="150px" style="display: inline-block">
          </div>

          <v-divider style="margin: 20px 0" />
          <v-list-item-group color="primary">
            <v-list-item v-if="flag" to="/users" class="list-item" dense>
              <v-list-item-avatar>
                <v-icon small>mdi-account-group</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Users</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/customers" class="list-item" dense>
              <v-list-item-avatar>
                <v-icon small>mdi-account-group</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Customers</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>Modules</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list-item to="/modules/beginner" class="list-item" dense>
                    <v-list-item-avatar>
                      <v-icon small>mdi-music</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Beginner</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                      to="/modules/intermediate"
                      class="list-item"
                      dense
                  >
                    <v-list-item-avatar>
                      <v-icon small>mdi-music</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Intermediate</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item to="/modules/advanced" class="list-item" dense>
                    <v-list-item-avatar>
                      <v-icon small>mdi-music</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Advanced</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list-item-group>
        </v-list>
      </span>
    </v-navigation-drawer>
    <v-app-bar dark dense elevate-on-scroll app color="primary">
      <v-app-bar-nav-icon
          v-if="navigation"
          @click.stop="state.drawer = !state.drawer"
      />
      <v-toolbar-title class="title">Easy Meditation (Admin)</v-toolbar-title>
      <v-spacer/>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-content class="my-container">
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {defineComponent, reactive, ref} from "@vue/composition-api";
import {resolveNav} from "@/utils/navigation/resolver";

export default defineComponent({
  setup(_, context) {
    const auth = context.root.$auth;
    const navigation = ref(null);

    const state = reactive({
      drawer: false
    });

    function logout() {
      context.root.$auth.logout();
    }

    navigation.value = {};
    // resolveNav(auth?.user?.scope);
    // console.log(auth.user)

    return {state, navigation, logout, flag: auth.hasScope(0)};
  }
});
</script>

<style lang="sass" scoped>
.drawer
  height: 100% !important
  display: flex !important
  flex-direction: column !important

  &__list
    flex: 1 auto !important
    display: block !important
    overflow-y: auto !important

.title
  font-size: 17px !important
  font-weight: bold !important
  padding-top: 2px !important
  font-family: google-sans, sans-serif !important

.home-page-link
  border: 2px solid rgba(black, 0.3) !important

.separator
  width: calc(100% - 50px)
  height: 1px
  margin-left: 25px
  margin-right: 25px
  margin-top: 20px
  border-top: 1px solid rgba(black, 0.14) !important

.list-item
  height: 40px !important

  &--no-radius
    border-radius: 0 !important

  *
    color: rgba(black, 0.65) !important

.my-container
  display: flex
  justify-content: center
  height: 100vh !important
  background: linear-gradient(#DE9600 35%, white 35%)
</style>

<style lang="sass">
.v-navigation-drawer__content
  display: flex !important
  flex-direction: column !important

.v-subheader
  font-size: 13px !important
  font-weight: 600
  font-family: google-sans, sans-serif !important
</style>
