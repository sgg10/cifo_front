<template>
  <div class="home">
    <b-row>
      <b-col class="text-left mt-5 mx-5">
        <b-button variant="success" v-b-modal.upload_modal>
          <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
          Upload file
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Documents
          :isDocumentsLoading="isDocumentsLoading"
          :files="files"
          @accion="load($event)"
        />
      </b-col>
    </b-row>
    <b-modal id="upload_modal" title="Upload Document" @ok="upload">
      <b-form role="form" @submit.prevent="onSubmit">
        <b-form-input
          v-model="title"
          class="mb-3"
          name="Title"
          required
          placeholder="Title"
        >
        </b-form-input>

        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { uploadFile } from "@/api/documents";
import Documents from "./DocumentList";
import LoadLayout from "@/layouts/LoadLayout";
import BaseLoading from "@/components/BaseLoading";
import { mapState } from "vuex";
import { getFiles, authenticateFile } from "@/api/documents";
export default {
  name: "Home",
  components: { Documents, LoadLayout, BaseLoading },
  data() {
    return {
      title: "",
      file: null,
      modal_loading: false,
      reload: false,
      files: [],
      isDocumentsLoading: false
    };
  },
  computed: {
    ...mapState("auth", { access_token: "access_token", user: "user" })
  },
  methods: {
    async upload() {
      this.modal_loading = true;
      const response = await uploadFile(
        {
          file: this.file,
          title: this.title
        },
        this.access_token
      );
      this.modal_loading = false;
      this.title = "";
      this.file = null;
      console.log(response);
      this.load(true);
      this.$bvModal.hide("upload_modal");
    },

    async load(event) {
      if (event) {
        this.isDocumentsLoading = true;
        console.log(this.access_token);
        this.files = (
          await getFiles(this.user.identification, this.access_token)
        ).data;
        this.isDocumentsLoading = false;
      }
    }
  }
};
</script>
