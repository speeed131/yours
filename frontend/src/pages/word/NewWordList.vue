<template>
  <div>
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success p-mr-2"
            @click="openNew"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedWords || !selectedWords.length"
          />
        </template>

        <template #end>
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            class="p-mr-2 p-d-inline-block"
          />
          <Button label="Export" icon="pi pi-upload" class="p-button-help" />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="words"
        v-model:selection="selectedWords"
        dataKey="id"
        :paginator="true"
        :rows="5"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div
            class="
              table-header
              p-d-flex p-flex-column p-flex-md-row p-jc-md-between
            "
          >
            <h5 class="p-mb-2 p-m-md-0 p-as-md-center">単語一覧</h5>
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
          style="min-width: 12rem"
        ></Column>
        <Column
          field="meaning_japanese"
          header="意味"
          :sortable="true"
          style="min-width: 16rem"
        ></Column>
        <!-- <Column header="Image">
          <template #body="slotProps">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              :alt="slotProps.data.image"
              class="word-image"
            />
          </template>
        </Column> -->
        <Column
          field="memo"
          header="メモ"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="remember_rating"
          header="記憶定着度"
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
        <!-- <Column -->
        <!-- field="rememberd_at"
          header="記憶済み"
          :sortable="true"
          style="min-width: 6rem"
        >
          <template #body="slotProps">
            <template v-if="slotProps.data.rememberd_at === ''">
              <i  class="pi pi-check"></i>
            </template>
          <template>
        </Column> -->
        <Column
          field="rememberd_at"
          header="記憶済み"
          :sortable="true"
          style="min-width: 6rem"
        >
          <template #body="slotProps">
            <span v-if="slotProps.data.rememberd_at !== ''">
              <i class="pi pi-check"></i>
            </span>
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <!-- <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editProduct(slotProps.data)"
            /> -->
            <Button
              icon="pi pi-check"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
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
        <label class="p-mb-3">記憶定着度</label>
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
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="word"
          >Are you sure you want to delete <b>{{ word.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteProduct"
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
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="word"
          >Are you sure you want to delete the selected products?</span
        >
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
import FileUpload from "primevue/fileupload";
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
import { IWord, IWord, IWordRequest } from "@/interfaces/api";
import { api } from "@/api";

export default defineComponent({
  components: {
    Button,
    FileUpload,
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
    const products = ref([
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1001",
        code: "nvklal433",
        name: "Black Watch",
        description: "Product Description",
        image: "black-watch.jpg",
        price: 72,
        category: "Accessories",
        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1002",
        code: "zz21cz3c1",
        name: "Blue Band",
        description: "Product Description",
        image: "blue-band.jpg",
        price: 79,
        category: "Fitness",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
      },
      {
        id: "1003",
        code: "244wgerg2",
        name: "Blue T-Shirt",
        description: "Product Description",
        image: "blue-t-shirt.jpg",
        price: 29,
        category: "Clothing",
        quantity: 25,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1004",
        code: "h456wer53",
        name: "Bracelet",
        description: "Product Description",
        image: "bracelet.jpg",
        price: 15,
        category: "Accessories",
        quantity: 73,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1005",
        code: "av2231fwg",
        name: "Brown Purse",
        description: "Product Description",
        image: "brown-purse.jpg",
        price: 120,
        category: "Accessories",
        quantity: 0,
        inventoryStatus: "OUTOFSTOCK",
        rating: 4,
      },
    ]);
    const productDialog = ref(false);
    const deleteProductDialog = ref(false);
    const deleteProductsDialog = ref(false);
    //@TODO: このwordをstoreで管理する?
    const word = ref<IWordRequest>({
      user_id: 0,
      name: "",
      part_of_speech: "",
      meaning_japanese: "",
      meaning_english: "",
      memo: "",
      remember_rating: 0,
      rememberd_at: "",
    });
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
      // word.value = {};
      submitted.value = false;
      productDialog.value = true;
    };
    const hideDialog = () => {
      productDialog.value = false;
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
          console.log(requestData);
          requestData.user_id = store.getters["auth/loginUser"].id;

          await api.word.postWord(requestData);
          // const load = async () => {
          //   const res = await dispatchPostWord(requestData);
          //   console.log(res);
          // };
          // load();
          // useToast.add({
          //   severity: "success",
          //   summary: "Successful",
          //   detail: "Product Created",
          //   life: 3000,
          // });
        } finally {
          await store.dispatch("word/getWords");
          productDialog.value = false;
        }
      }
    };
    const editProduct = (prod: any) => {
      word.value = { ...prod };
      productDialog.value = true;
    };
    const confirmDeleteProduct = (word: any) => {
      word.value = word;
      deleteProductDialog.value = true;
    };
    const deleteProduct = () => {
      // products.value = products.value.filter((val) => val.id !== word.value.id);

      deleteProductDialog.value = false;
      // word.value = {};
      // useToast.add({
      //   severity: "success",
      //   summary: "Successful",
      //   detail: "Product Deleted",
      //   life: 3000,
      // });
    };
    const findIndexById = (id: any) => {
      let index = -1;
      for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    };
    const createId = () => {
      let id = "";
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };
    const exportCSV = () => {
      dt.value.exportCSV();
    };
    const confirmDeleteSelected = () => {
      deleteProductsDialog.value = true;
    };
    const deleteSelectedWords = () => {
      products.value = products.value.filter(
        (val) => !selectedWords.value.includes(val)
      );
      deleteProductsDialog.value = false;
      selectedWords.value = null;
      // useToast.add({
      //   severity: "success",
      //   summary: "Successful",
      //   detail: "Products Deleted",
      //   life: 3000,
      // });
    };

    return {
      dt,
      products,
      productDialog,
      deleteProductDialog,
      deleteProductsDialog,
      word,
      selectedWords,
      filters,
      submitted,
      openNew,
      hideDialog,
      saveProduct,
      editProduct,
      confirmDeleteProduct,
      deleteProduct,
      findIndexById,
      createId,
      exportCSV,
      confirmDeleteSelected,
      deleteSelectedWords,
      words: computed(() => store.getters["word/words"]),
      selectedPartOfSpeech,
      part_of_speech,
      ratings,
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
