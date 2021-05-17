<template>
  <div>
    <v-card class="data-viewer">
      <v-card-title>
        <span>{{ name }}</span>
        <v-spacer/>
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
          :loading="loading"
          fixed-header
          :headers="[
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'description', width: '400px' },
          { text: 'Duration (seconds)', value: 'length' },
          { text: 'Favorites', value: 'favorites', width: 100 },
          { text: 'Times Played', value: 'listened', width: 150 },
          {
            text: 'Action',
            value: 'actions',
            width: 120,
            align: 'right',
            sortable: false,
            searchable: false
          }
        ]"
          :items="data"
      >
        <template v-slot:item.description="{ item }">
          <v-tooltip bottom color="black">
            <template v-slot:activator="{ on, attrs }">
              <p v-bind="attrs"
                 v-on="on">{{ (item.description || '').substring(0, 50) }}</p>
            </template>
            <div style="overflow-wrap: anywhere; width: 400px">{{ item.description }}</div>
          </v-tooltip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="edit(item)" small>mdi-pencil</v-icon>
          <v-icon @click="play(item)">mdi-play</v-icon>
          <v-icon @click="del(item._id)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.length="{ item }">
          <span>{{ secondsToDuration(item.length) }}</span>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-if="player" v-model="player" width="400">
      <v-card>
        <audio
            controls
            style="width: 100%; outline: none"
            autoplay
            :src="$axios.defaults.baseURL + 'courses/modules/' + moduleId"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="uploader" width="500">
      <simple-form
          @reset="onReset"
          :data="toFormData"
          style="margin: 0"
          :method="mode === 'edit' ? 'patch' : 'post'"
          endpoint="courses/modules"
          title="Add Module"
      >
        <v-text-field
            v-model="module.name"
            outlined
            label="Module Name"
            class="span-2"
        />
        <v-textarea
            v-model="module.description"
            outlined
            label="Module Description"
            class="span-2"
        />

        <p v-if="mode !== 'new'" class="span-2">NOTE: Select an Audio File from below, if and only if you want to update
          the current audio
          otherwise ignore
          the field below</p>

        <v-file-input
            dense
            v-model="module.file"
            accept=".mp3"
            outlined
            @change="audioPicked"
            label="Music File"
            class="span-2"
        />
      </simple-form>
    </v-dialog>
    <v-dialog v-if="loading" persistent>
      <v-card>
        <v-progress-circular/>
        <p style="margin-left: 10px">Please wait...</p>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SimpleForm from "~/common/ui/widgets/SimpleForm";

const modules = ["beginner", "intermediate", "advanced"];
export default {
  components: {SimpleForm},
  data: () => ({
    mode: '',
    player: false,
    uploader: false,
    moduleId: "",
    loading: false,

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
      console.log(this.$axios.defaults.baseURL + 'courses/modules/' + this.moduleId);
    },

    edit(item) {
      this.mode = 'edit'
      this.module = item
      this.uploader = true;
    },

    audioPicked() {
      if (!this.module.file) return
      const audio = document.createElement('audio');

      if (!this.module.file.name.endsWith('.mp3')) {
        this.module.file = null
        alert('Select .mp3 files only')
      } else {
        audio.src = URL.createObjectURL(this.module.file)
        audio.onloadedmetadata = () => {
          this.module.length = audio.duration
        }
      }
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
      this.mode = 'new'
      this.module = {};
      this.uploader = true;
    },

    async reload() {
      this.loading = true
      this.data = await this.$axios.$get("courses/" + this.courseNumber)
      this.loading = false
    },

    secondsToDuration(time) {
      const minute = Math.floor(time / 60);
      const rem = Math.floor(time % 60);
      return `${minute}:${rem}`;
    },

    toFormData() {
      const data = new FormData();
      data.append("courseNumber", this.courseNumber);
      data.append("name", this.module.name);
      data.append("length", this.module.length);
      data.append("description", this.module.description);
      data.append("file", this.module.file);

      if (this.mode === 'edit') {
        data.append('_id', this.module._id)
        data.append('trackId', this.module.trackId)
      }
      return data;
    }
  },

  async asyncData({$axios, route}) {
    const courseNumber = modules.indexOf(route.params.course).toString();
    return {data: await $axios.$get("courses/" + courseNumber)};
  }
};
</script>

<style scoped></style>
