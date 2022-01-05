<template>
  <div>
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #start>
          <Button
            label="Not Remembered"
            icon="pi pi-refresh"
            class="mr-2 bg-gray-700 border-white"
            @click="confirmDeleteSelected"
            :disabled="!selectedWords || !selectedWords.length"
          />
          <Button
            label="Skeleton meaning"
            icon="pi pi-eye-slash"
            class="border-white bg-indigo-500"
            @click="skeletonColor"
          />
        </template>

        <template #end>
          <!-- <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            class="mr-2 p-d-inline-block"
          /> -->
          <Button
            label="Export"
            icon="pi pi-upload"
            class="bg-indigo-800 border-white"
            @click="exportCSV()"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="words"
        sortMode="multiple"
        v-model:selection="selectedWords"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 25, 50, 100]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div
            class="
              table-header
              p-d-flex p-flex-column p-flex-md-row p-jc-md-between
            "
          >
            <h5 class="p-mb-2 p-m-md-0 p-as-md-center">習得済みの単語一覧</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>
        <Column
          field="name"
          header="単語名"
          :sortable="true"
          style="min-width: 12rem; max-width: 18rem; word-break: break-all"
        ></Column>
        <Column
          field="meaning_japanese"
          header="意味"
          :sortable="true"
          style="min-width: 16rem; max-width: 18rem; word-break: break-all"
          :style="{ color: meaningColor }"
        ></Column>
        <Column
          field="memo"
          header="メモ"
          :sortable="true"
          style="min-width: 14rem; max-width: 14rem; word-break: break-all"
        >
          <!-- <template #body="{ data }">
            {{ shrinkDescription(data.memo) }}
          </template> -->
        </Column>
        <Column
          field="remember_rating"
          header="重要度"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            <Rating
              :modelValue="slotProps.data.remember_rating"
              :readonly="true"
              :cancel="false"
            />
          </template>
        </Column>
        <Column
          header="登録日"
          field="created_at"
          :sortable="true"
          dataType="date"
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            {{ convertDate(data.created_at) }}
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 4rem">
          <template #body="slotProps">
            <!-- <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)"
            /> -->
            <Button
              icon="pi pi-refresh"
              class="p-button-rounded bg-gray-500 border-white"
              @click="confirmArchiveWord(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="wordDialog"
      :style="{ width: '450px' }"
      header="新規単語登録"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="name">単語名</label>
        <InputText
          id="name"
          v-model.trim="word.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !word.name }"
        />
        <small class="p-error" v-if="submitted && !word.name"
          >単語名は必要です</small
        >
      </div>
      <div class="p-field">
        <label for="price">意味</label>
        <InputText id="meaning_japanese" v-model="word.meaning_japanese" />
      </div>

      <div class="p-field">
        <label class="p-mb-3">品詞</label>
        <MultiSelect
          v-model="selectedPartOfSpeech"
          :options="part_of_speech"
          placeholder="Select Brands"
        />
      </div>

      <div class="p-field">
        <label class="p-mb-3">重要度</label>
        <div class="p-formgrid flex">
          <div
            class="p-field-radiobutton p-col-6 pr-3"
            v-for="(item, i) in ratings"
            :key="i"
          >
            <RadioButton
              :id="`remember_rating_${i}`"
              name="remember_rating"
              :value="item.value"
              v-model="word.remember_rating"
            />
            <label for="remember_rating"> {{ item.value }} </label>
          </div>
        </div>
      </div>

      <div class="p-field">
        <label for="description">メモ</label>
        <Textarea
          id="description"
          v-model="word.memo"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="archiveWordDialog"
      :style="{ width: '450px' }"
      header="確認"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="mr-3" style="font-size: 2rem" />
        <span v-if="word"
          >未習得に移動されますがよろしいですか？<b>{{ word.name }}</b></span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="archiveWordDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="NotArchivedWord()"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="word">選択したものを未習得にしてよろしいですか？</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedWords"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import "primeicons/primeicons.css";
// import "primeicons/prime.css";
import { ref, onMounted, computed, defineComponent } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
// import ProductService from "@/hooks/ProductService";
import Button from "primevue/button";
// import FileUpload from "primevue/fileupload";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Rating from "primevue/rating";
import DataTable from "primevue/datatable";
import Textarea from "primevue/textarea";
// import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
// import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Dialog from "primevue/dialog";
import { dispatchGetWords, dispatchPostWord } from "@/hooks/useWords";
import { useStore } from "vuex";
import { IWord, IWordRequest } from "@/interfaces/api";
import { api } from "@/api";
import moment from "moment";

export default defineComponent({
  components: {
    Button,
    Toolbar,
    InputText,
    Column,
    Rating,
    DataTable,
    Textarea,
    MultiSelect,
    Dialog,
    RadioButton,
  },
  setup() {
    onMounted(() => {
      // console.log(productService);
      // console.log(products);
    });
    const dt = ref();
    const load = async () => {
      await dispatchGetWords();
    };
    load();
    const store = useStore();
    const selectedPartOfSpeech = ref([]);
    const wordDialog = ref(false);
    const archiveWordDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const meaningColor = ref("#3f3f46");

    //@TODO: このwordをstoreで管理する?
    const word = ref<IWordRequest>({
      user_id: 0,
      name: "",
      part_of_speech: "",
      meaning_japanese: "",
      meaning_english: "",
      memo: "",
      is_remembered: false,
      remember_rating: 0,
      remembered_at: "",
    });
    const updateWord = ref<any>({});
    // const productService = ref(new ProductService());
    const selectedWords = ref();
    const ratings = ref([
      {
        value: 1,
      },
      {
        value: 2,
      },
      {
        value: 3,
      },
      {
        value: 4,
      },
      {
        value: 5,
      },
    ]);
    const part_of_speech = ref(["名詞", "形容詞", "動詞", "副詞", "その他"]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const submitted = ref(false);

    const openNew = () => {
      word.value = {
        user_id: 0,
        name: "",
        part_of_speech: "",
        meaning_japanese: "",
        meaning_english: "",
        memo: "",
        is_remembered: false,
        remember_rating: 0,
        remembered_at: "",
      };
      submitted.value = false;
      wordDialog.value = true;
    };
    const hideDialog = () => {
      wordDialog.value = false;
      submitted.value = false;
    };
    const saveProduct = async () => {
      submitted.value = true;
      if (word.value.name.trim()) {
        const requestData = { ...word.value };
        requestData.part_of_speech = selectedPartOfSpeech.value.reduce(
          (accumulator: string, currentValue: string) => {
            return accumulator + currentValue;
          },
          ""
        );
        try {
          requestData.user_id = store.getters["auth/loginUser"].id;

          await api.word.postWord(requestData);
          // useToast.add({
          //   severity: "success",
          //   summary: "Successful",
          //   detail: "Product Created",
          //   life: 3000,
          // });
        } finally {
          await store.dispatch("word/getWords");
          wordDialog.value = false;
        }
      }
    };

    // const editProduct = async (thisWord: any) => {
    //   word.value = thisWord;
    //   wordDialog.value = true;
    // };

    const confirmArchiveWord = (thisWord: any) => {
      console.log(thisWord);
      updateWord.value = thisWord;
      archiveWordDialog.value = true;
    };
    //@TODO: updateWordのvalueで更新しているが、それなら引数で関数に入れたほうが良い書き方な気がするのでリファクタ
    const NotArchivedWord = async () => {
      const requestData = { ...updateWord.value };
      requestData.is_remembered = false;
      requestData.remembered_at = "";
      try {
        const res = await api.word.updateWord(requestData.id, requestData);
      } finally {
        await store.dispatch("word/getWords");
        archiveWordDialog.value = false;
      }
      // useToast.add({
      //   severity: "success",
      //   summary: "Successful",
      //   detail: "Product Deleted",
      //   life: 3000,
      // });
    };
    const exportCSV = () => {
      dt.value.exportCSV();
    };
    const confirmDeleteSelected = () => {
      deleteProductsDialog.value = true;
    };
    const skeletonColor = () => {
      meaningColor.value =
        meaningColor.value === "#3f3f46" ? "#fff" : "#3f3f46";
    };
    const deleteSelectedWords = async () => {
      try {
        selectedWords.value.forEach((item: IWord) => {
          updateWord.value = item;
          console.log(updateWord.value);
          NotArchivedWord();
        });
      } finally {
        await store.dispatch("word/getWords");
        deleteProductsDialog.value = false;
      }
      // useToast.add({
      //   severity: "success",
      //   summary: "Successful",
      //   detail: "Products Deleted",
      //   life: 3000,
      // });
    };

    function convertDate(date: Date) {
      return moment(date).format("YYYY-MM-DD");
    }

    return {
      dt,
      wordDialog,
      archiveWordDialog,
      deleteProductsDialog,
      word,
      selectedWords,
      filters,
      submitted,
      openNew,
      hideDialog,
      saveProduct,
      confirmArchiveWord,
      NotArchivedWord,
      exportCSV,
      confirmDeleteSelected,
      deleteSelectedWords,
      words: computed(() =>
        store.getters["word/words"].filter((item: IWord) => item.is_remembered)
      ),
      selectedPartOfSpeech,
      part_of_speech,
      ratings,
      updateWord,
      convertDate,
      meaningColor,
      skeletonColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.word-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .word-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
