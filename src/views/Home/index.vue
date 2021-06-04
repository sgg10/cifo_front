<template>
  <div class="home">
    <b-row>
      <b-col cols="2" class="text-center mt-5 ml-5">
        <b-button variant="success" v-b-modal.upload_modal>
          <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
          Upload file
        </b-button>
      </b-col>
      <b-col cols="8" class="text-left mt-5">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="search"
            type="search"
            placeholder="Search document"
          ></b-form-input>
        </b-input-group>
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
      <b-form role="form" @submit.prevent="upload">
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
      isDocumentsLoading: false,
      search: ""
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
      console.log(response);
      this.modal_loading = false;
      this.title = "";
      this.file = null;
      this.load(true);
      this.$bvModal.hide("upload_modal");
    },

    async load(event) {
      if (event) {
        this.isDocumentsLoading = true;
        this.files = (
          await getFiles({
            id: this.user.identification,
            access_token: this.access_token,
            search: this.search ? this.search : null
          })
        ).data;
        this.isDocumentsLoading = false;
      }
    }
  },

  watch: {
    search() {
      this.load(true);
    }
  }
};
</script>
