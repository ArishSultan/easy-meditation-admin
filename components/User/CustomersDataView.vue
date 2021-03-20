<template>
  <data-viewer
    title="Customers"
    endpoint="users/customers"
    :columns="columns"
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
      { text: "Username", value: "username" },
      { text: "Type", value: 'isPremium' }
    ]);

    return { columns };
  }
});
</script>
