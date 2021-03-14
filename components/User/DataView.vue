<template>
  <data-viewer
    create
    title="Users"
    endpoint="users"
    change
    change-route="/users/$id/edit"
    remove
    remove-route="/users/$id"
    :columns="columns"
    create-route="/users/add"
  />
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import DataViewer from "../../common/ui/widgets/DataViewer.vue";

export default defineComponent({
  name: "UsersDataView",
  components: { DataViewer },

  setup() {
    const columns = ref([
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Username", value: "username" }
    ]);

    return { columns };
  }
});
</script>
