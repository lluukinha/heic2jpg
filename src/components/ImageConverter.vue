<template>
  <div class="container">
    <div clas="row">
      <div class="col">
        <input
          id="file-input"
          type="file"
          @change="previewFiles"
          accept=".heic"
          multiple
          v-show="false"
        />
        <button
          class="btn btn-primary mx-2"
          @click="runConverter()"
          :disabled="isLoadingAny || !hasImages"
        >
          Convert All
        </button>

        <button
          class="btn btn-primary ml-1"
          @click="runDownload()"
          :disabled="isLoadingAny || !hasImagesToDownload || isDownloading"
        >
          Download All
        </button>
      </div>
    </div>

    <div class="row">
      <label for="file-input" :class="{ bolder: isDragging }">
        <div
          id="drop-area"
          class="drop-area"
          :class="{ 'drop-area-hover': isDragging }"
          @drop.prevent="dropHandler"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false"
          @dragend="isDragging = false"
          @dragover.prevent
        >
          Drop .heic files here
        </div>
      </label>
    </div>

    <div class="row mt-3">
      <p class="error-msg" v-if="hasErrors">
        * There is {{ errors.length }} files that is not .heic format
      </p>
    </div>

    <div class="row main-content bg-white" v-if="!hasImages">
      <div class="col text-center">No images found</div>
    </div>

    <div class="row mt-5" v-else>
      <div class="col">
        <table class="table table-striped table-hover">
          <tbody>
            <tr v-for="image in filesArray" :key="image.key">
              <td>{{ image.name }}</td>
              <td>
                <img v-if="image.url" class="thumb" :src="image.url" />

                <button
                  @click="convertImage(image.blob, image.index)"
                  class="btn btn-success"
                  :class="{ disabled: image.isLoading }"
                  :disabled="image.isLoading"
                  v-else
                >
                  <template v-if="image.isLoading">Loading...</template>
                  <template v-else>Convert</template>
                </button>
              </td>
              <td>
                <a
                  :href="image.url"
                  :download="getNewName(image)"
                  class="btn btn-success"
                  :class="{ disabled: !image.url }"
                  :disabled="!image.url"
                >
                  Download
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import heic2any from "heic2any";
import JSZip from "jszip";
import FileSaver from "file-saver";

export default {
  name: "ImageConverter",

  data() {
    return {
      files: null,
      filesArray: [],
      isDragging: false,
      isDownloading: false,
      errors: [],
      queue: {
        total: 0,
        todo: [],
        running: [],
        complete: [],
        count: 0,
      },
    };
  },

  computed: {
    isLoadingAny() {
      return this.filesArray.some((image) => image.isLoading);
    },

    hasImages() {
      return this.filesArray.length > 0;
    },

    hasImagesToDownload() {
      return this.filesArray.some((image) => image.newBlob);
    },

    hasErrors() {
      return this.errors.length > 0;
    },

    canRunNextTask() {
      const { running, count, todo } = this.queue;
      return running.length < count && todo.length;
    },
  },

  methods: {
    dropHandler(event) {
      this.isDragging = false;
      this.filesArray = [];
      this.errors = [];
      this.bringFilesToArray(event.dataTransfer.files);
    },

    previewFiles(event) {
      this.filesArray = [];
      this.errors = [];
      this.bringFilesToArray(event.target.files);
    },

    bringFilesToArray(files) {
      files.forEach((file, index) => this.createImageOnList(file, index));
    },

    runConverter() {
      const promises = [];
      this.filesArray.forEach((image) => {
        if (!image.url)
          promises.push({
            method: this.convertImage,
            blob: image.blob,
            index: image.index,
          });
      });

      this.promiseQueue(promises, 5);
    },

    promiseQueue(tasks, concurrentCount = 1) {
      this.queue.total = tasks.length;
      this.queue.todo = tasks;
      this.queue.running = [];
      this.queue.complete = [];
      this.queue.count = concurrentCount;
      this.runTask();
    },

    runTask() {
      while (this.canRunNextTask) {
        const promise = this.queue.todo.shift();
        promise.method(promise.blob, promise.index).then(() => {
          this.queue.complete.push(this.queue.running.shift());
          this.runTask();
        });
        this.queue.running.push(promise);
      }
    },

    getImageExtension(image) {
      return image.name.split(".").pop();
    },

    getNewName(image) {
      return image.name.replace(".heic", ".jpg");
    },

    createImageOnList(image, index) {
      const imageExtension = this.getImageExtension(image);
      if (imageExtension !== "heic") {
        this.errors.push(
          `Image '${image.name}' is '${imageExtension}' format.`
        );
        return;
      }

      const newFile = {
        index,
        url: null,
        isLoading: false,
        name: image.name,
        blob: image,
        newBlob: null,
      };
      this.filesArray.push(newFile);
    },

    convertImage(image, index) {
      return new Promise((resolve) => {
        this.filesArray[index].isLoading = true;
        heic2any({
          blob: image,
          toType: "image/jpeg",
          quality: 0.8,
        })
          .then((result) => {
            this.filesArray[index].url = URL.createObjectURL(result);
            this.filesArray[index].newBlob = result;
          })
          .finally(() => {
            this.filesArray[index].isLoading = false;
            resolve("success");
          });
      });
    },

    runDownload() {
      const files = this.filesArray.filter((image) => image.newBlob);
      const zip = new JSZip();
      const cache = {};
      files.forEach((image) => {
        zip.file(this.getNewName(image), image.newBlob, { binary: true }); // add files one by one
        cache[image.name] = image;
      });

      this.isDownloading = true;
      zip
        .generateAsync({ type: "blob" })
        .then((content) => {
          FileSaver.saveAs(content, "Heic2Jpg.zip");
        })
        .finally(() => {
          this.isDownloading = false;
        });
    },
  },
};
</script>

<style scoped>
.drop-area {
  margin-top: 50px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #333;
  border-radius: 10px;
  cursor: pointer;
}

.drop-area:hover {
  border: 2px dashed #333;
  font-weight: bold;
}

.bolder {
  font-weight: bold;
}

.drop-area-hover {
  border: 4px dashed #333;
  background-color: #FFF;
}

.main-content {
  margin-top: 50px;
}

.thumb {
  max-width: 30px;
  height: auto;
}

.error-msg {
  color: red;
  text-shadow: 1px 1px 1px #fff333;
}
</style>
