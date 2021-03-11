<template>
  <div class="container">

    <div>
      <input
        type="file"
        @change="previewFiles"
        accept=".heic"
        multiple
      />

      <button
        class="converter-button"
        @click="runConverter()"
        :disabled="isLoadingAny || !hasImages"
      >
        Convert All
      </button>

      <button
        class="converter-button"
        @click="runDownload()"
        :disabled="isLoadingAny || !hasImagesToDownload"
      >
        Download All
      </button>
    </div>

    <div class="main-content bg-white" v-if="!hasImages">
      No images found
    </div>

    <table class="main-content bg-white" v-else>
      <tbody>
        <tr v-for="image in filesArray" :key="image.key">
          <td>{{ image.name }}</td>
          <td>
            <img
              v-if="image.url"
              class="thumb"
              :src="image.url"
            />

            <button
              :disabled="image.isLoading"
              @click="convertImage(image.blob, image.index)"
              v-else
            >
              <template v-if="image.isLoading">Loading...</template>
              <template v-else>Convert</template>
            </button>
          </td>
          <td>
            <a :href="image.url" :download="getNewName(image)">
              <button type="button" :disabled="!image.url">
                Download
              </button>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import heic2any from "heic2any";
import JSZip from "jszip";
import FileSaver from "file-saver";

export default {
  name: 'ImageConverter',

  data() {
    return {
      files: null,
      filesArray: [],
    };
  },

  computed: {
    isLoadingAny() {
      return this.filesArray.some(image => image.isLoading);
    },

    hasImages() {
      return this.filesArray.length > 0;
    },

    hasImagesToDownload() {
      return this.filesArray.some(image => image.newBlob);
    },
  },

  methods: {
    previewFiles(event) {
      const { files } = event.target;
      this.files = files;
      this.filesArray = [];

      this.files.forEach(
        (file, index) => this.createImageOnList(file, index)
      );
    },

    runConverter() {
      this.filesArray.forEach((image) => {
        if (!image.url) this.convertImage(image.blob, image.index);
      });
    },

    getNewName(image) {
      return image.name.replace('.heic', '.jpg');
    },

    createImageOnList(image, index) {
      const newFile = {
        index,
        url: null,
        isLoading: false,
        name: image.name,
        blob: image,
        newBlob: null
      };
      this.filesArray.push(newFile);
    },

    convertImage(image, index) {
      this.filesArray[index].isLoading = true;

      heic2any({
        blob: image,
        toType: 'image/jpeg',
        quality: 0.8,
      })
        .then((result) => {
          this.filesArray[index].url = URL.createObjectURL(result);
          this.filesArray[index].newBlob = result;
        })
        .finally(() => {
          this.filesArray[index].isLoading = false;
        });
    },

    runDownload() {
      const files = this.filesArray.filter(image => image.newBlob);
      const zip = new JSZip();
      const cache = {};
      files.forEach(image => {
        zip.file(this.getNewName(image), image.newBlob, {binary: true }); // add files one by one
        cache[image.name] = image;
       });

      zip.generateAsync({ type: "blob" })
        .then(content => {
          FileSaver.saveAs(content, "Heic2Jpg.zip");
        });
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  margin-top: 50px;
}

.bg-white {
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 4px #555555;
}

.thumb {
  max-width: 30px;
  height: auto;
}

tbody td {
  padding: .75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}

.converter-button {
  height: 35px;
  margin-left: 10px;
}
</style>
