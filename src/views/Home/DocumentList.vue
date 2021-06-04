<template>
  <div>
    <LoadLayout v-if="isDocumentsLoading">
      <BaseLoading variant="success" />
    </LoadLayout>
    <b-container v-else class="mt-5">
      <b-row>
        <b-col v-for="(item, index) in files" :key="index" cols="12" md="auto">
          <FileCard
            :link="item.url"
            :title="item.title"
            :isVerified="item.is_verified"
            @accion="load($event)"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoadLayout from "@/layouts/LoadLayout";
import BaseLoading from "@/components/BaseLoading";
import FileCard from "@/components/FileCard";

export default {
  components: { LoadLayout, BaseLoading, FileCard },
  props: ["isDocumentsLoading", "files"],
  methods: {
    load(event) {
      if (event) {
        this.$emit("accion", true);
      }
    }
  },
  created() {
    this.load(true);
  }
};
</script>
