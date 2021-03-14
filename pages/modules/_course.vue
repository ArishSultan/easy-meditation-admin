<template>
  <div>
    <v-card class="data-viewer">
      <v-card-title>
        <span>{{ name }}</span>
        <v-spacer />
        <v-btn
          color="primary"
          elevation="0"
          @click="addNew"
          style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
        >
          <v-icon small>mdi-plus</v-icon>
          Add New
        </v-btn>
        <v-btn icon @click="reload">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        class="data-table__content"
        height="500"
        fixed-header
        :headers="[
          { text: 'Name', value: 'name' },
          { text: 'Duration', value: 'length' },
          {
            text: 'Action',
            value: 'actions',
            width: 100,
            align: 'right',
            sortable: false,
            searchable: false
          }
        ]"
        :items="data"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon @click="play(item)">mdi-play</v-icon>
          <v-icon @click="del(item._id)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.length="{ item }">
          <span>{{ secondsToDuration(item.length) }}</span>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-if="player" v-model="player" width="400">
      <v-card height="100">
        <audio
          controls
          preload="none"
          :src="$axios.defaults.baseURL + '/courses/modules/' + moduleId"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="uploader" width="400">
      <simple-form
        @reset="onReset"
        :data="toFormData"
        endpoint="courses/modules"
        title="Add Module"
      >
        <v-text-field
          v-model="module.name"
          outlined
          label="Module Name"
          class="span-2"
        />
        <v-file-input
          dense
          v-model="module.file"
          accept="audio/*"
          outlined
          label="Music File"
          class="span-2"
        />
      </simple-form>
    </v-dialog>
  </div>
</template>

<script>
import SimpleForm from "~/common/ui/widgets/SimpleForm";

const modules = ["beginner", "intermediate", "advanced"];
export default {
  components: { SimpleForm },
  data: () => ({
    player: false,
    uploader: false,
    moduleId: "",

    data: [],
    module: {}
  }),

  computed: {
    name() {
      const name = this.$route.params.course;
      return name[0].toUpperCase() + name.substring(1);
    },

    courseNumber() {
      return modules.indexOf(this.$route.params.course).toString();
    }
  },

  methods: {
    play(item) {
      this.player = true;
      this.moduleId = item._id;
    },

    onReset() {
      this.uploader = false;
      this.reload();
    },

    async del(id) {
      await this.$axios.$delete("courses/modules/" + id);
      await this.reload();
    },

    addNew() {
      this.module = {};
      this.uploader = true;
    },

    async reload() {
      this.data = await this.$axios.$get("courses/" + this.courseNumber);
    },

    secondsToDuration(time) {
      const minute = Math.ceil(time / 60);
      const rem = Math.ceil(time % 60);
      return `${minute}:${rem}`;
    },

    toFormData() {
      const data = new FormData();
      data.append("courseNumber", this.courseNumber);
      data.append("name", this.module.name);
      data.append("file", this.module.file);
      return data;
    }
  },

  async asyncData({ $axios, route }) {
    const courseNumber = modules.indexOf(route.params.course).toString();
    return { data: await $axios.$get("courses/" + courseNumber) };
  }
};
</script>

<style scoped></style>
