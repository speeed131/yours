<template>
  <div>
    <div class="bg-blueGray-100">
      <div class="pt-12">
        <div class="mb-32 px-4 md:px-10 mx-auto w-full">
          <!-- <div> -->
          <!-- <div class="card"> -->
          <h1>あなたの1週間の学習状況</h1>
          <Chart type="bar" :data="basicData" :options="basicOptions" />
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <div class="flex flex-wrap">
          <!-- <line-chart-component></line-chart-component> -->
          <!-- <bar-chart-component></bar-chart-component> -->
        </div>
        <div class="flex flex-wrap mt-4">
          <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <div
              class="
                relative
                flex flex-col
                min-w-0
                break-words
                bg-white
                w-full
                mb-6
                shadow-lg
                rounded
              "
            >
              <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-base text-blueGray-700">
                      Page visits
                    </h3>
                  </div>
                  <div
                    class="
                      relative
                      w-full
                      px-4
                      max-w-full
                      flex-grow flex-1
                      text-right
                    "
                  >
                    <button
                      class="
                        bg-indigo-500
                        text-white
                        active:bg-indigo-600
                        text-xs
                        font-bold
                        uppercase
                        px-3
                        py-1
                        rounded
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                      style="transition: all 0.15s ease"
                    >
                      See all
                    </button>
                  </div>
                </div>
              </div>
              <div class="block w-full overflow-x-auto">
                <!-- Projects table -->
                <table
                  class="items-center w-full bg-transparent border-collapse"
                >
                  <thead>
                    <tr>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                      >
                        Page name
                      </th>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                      >
                        Visitors
                      </th>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                      >
                        Unique users
                      </th>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                      >
                        Bounce rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        /argon/
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        4,569
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        340
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        /argon/index.html
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        3,985
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        319
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        /argon/charts.html
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        3,513
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        294
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        /argon/tables.html
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        2,050
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        147
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        /argon/profile.html
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        1,795
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        190
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="w-full xl:w-4/12 px-4">
            <div
              class="
                relative
                flex flex-col
                min-w-0
                break-words
                bg-white
                w-full
                mb-6
                shadow-lg
                rounded
              "
            >
              <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-base text-blueGray-700">
                      Social traffic
                    </h3>
                  </div>
                  <div
                    class="
                      relative
                      w-full
                      px-4
                      max-w-full
                      flex-grow flex-1
                      text-right
                    "
                  >
                    <button
                      class="
                        bg-indigo-500
                        text-white
                        active:bg-indigo-600
                        text-xs
                        font-bold
                        uppercase
                        px-3
                        py-1
                        rounded
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      "
                      type="button"
                      style="transition: all 0.15s ease"
                    >
                      See all
                    </button>
                  </div>
                </div>
              </div>
              <div class="block w-full overflow-x-auto">
                <!-- Projects table -->
                <table
                  class="items-center w-full bg-transparent border-collapse"
                >
                  <thead class="thead-light">
                    <tr>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                      >
                        Referral
                      </th>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                      >
                        Visitors
                      </th>
                      <th
                        class="
                          px-6
                          bg-blueGray-50
                          text-blueGray-500
                          align-middle
                          border border-solid border-blueGray-100
                          py-3
                          text-xs
                          uppercase
                          border-l-0 border-r-0
                          whitespace-nowrap
                          font-semibold
                          text-left
                        "
                        style="min-width: 140px"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        Facebook
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        1,480
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <div class="flex items-center">
                          <span class="mr-2">60%</span>
                          <div class="relative w-full">
                            <div
                              class="
                                overflow-hidden
                                h-2
                                text-xs
                                flex
                                rounded
                                bg-red-200
                              "
                            >
                              <div
                                style="width: 60%"
                                class="
                                  shadow-none
                                  flex flex-col
                                  text-center
                                  whitespace-nowrap
                                  text-white
                                  justify-center
                                  bg-red-500
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        Facebook
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        5,480
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <div class="flex items-center">
                          <span class="mr-2">70%</span>
                          <div class="relative w-full">
                            <div
                              class="
                                overflow-hidden
                                h-2
                                text-xs
                                flex
                                rounded
                                bg-emerald-200
                              "
                            >
                              <div
                                style="width: 70%"
                                class="
                                  shadow-none
                                  flex flex-col
                                  text-center
                                  whitespace-nowrap
                                  text-white
                                  justify-center
                                  bg-emerald-500
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        Google
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        4,807
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <div class="flex items-center">
                          <span class="mr-2">80%</span>
                          <div class="relative w-full">
                            <div
                              class="
                                overflow-hidden
                                h-2
                                text-xs
                                flex
                                rounded
                                bg-purple-200
                              "
                            >
                              <div
                                style="width: 80%"
                                class="
                                  shadow-none
                                  flex flex-col
                                  text-center
                                  whitespace-nowrap
                                  text-white
                                  justify-center
                                  bg-purple-500
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        Instagram
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        3,678
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <div class="flex items-center">
                          <span class="mr-2">75%</span>
                          <div class="relative w-full">
                            <div
                              class="
                                overflow-hidden
                                h-2
                                text-xs
                                flex
                                rounded
                                bg-lightBlue-200
                              "
                            >
                              <div
                                style="width: 75%"
                                class="
                                  shadow-none
                                  flex flex-col
                                  text-center
                                  whitespace-nowrap
                                  text-white
                                  justify-center
                                  bg-lightBlue-500
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                          text-left
                        "
                      >
                        twitter
                      </th>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        2,645
                      </td>
                      <td
                        class="
                          border-t-0
                          px-6
                          align-middle
                          border-l-0 border-r-0
                          text-xs
                          whitespace-nowrap
                          p-4
                        "
                      >
                        <div class="flex items-center">
                          <span class="mr-2">30%</span>
                          <div class="relative w-full">
                            <div
                              class="
                                overflow-hidden
                                h-2
                                text-xs
                                flex
                                rounded
                                bg-orange-200
                              "
                            >
                              <div
                                style="width: 30%"
                                class="
                                  shadow-none
                                  flex flex-col
                                  text-center
                                  whitespace-nowrap
                                  text-white
                                  justify-center
                                  bg-emerald-500
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, defineComponent, reactive, Ref } from "vue";
import Chart from "primevue/chart";
import moment from "moment";
import { extendMoment } from "moment-range";
import { dispatchGetWords, dispatchPostWord } from "@/hooks/useWords";
import { useStore } from "vuex";
import { IWord, IWordRequest } from "@/interfaces/api";

interface WordDataForGraph {
  x: string; //Date
  y: number;
}

export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    const week = ref([]);
    const store = useStore();
    const wordsDataByRememberedAt = ref<IWord[][]>([]);
    const wordsDataByCreatedAt = ref<IWord[][]>([]);
    const wordsDataByRememberedAtForGraph = ref<WordDataForGraph[]>([]);
    const wordsDataByCreatedAtForGraph = ref<WordDataForGraph[]>([]);

    const load = async () => {
      await dispatchGetWords();
      const words = convertWordsData();

      //refにすべて入れる
      wordsDataByRememberedAt.value = await makeDataEquivalentValue(
        words,
        "remembered_at"
      );
      wordsDataByCreatedAt.value = await makeDataEquivalentValue(
        words,
        "converted_created_at"
      );
      wordsDataByRememberedAtForGraph.value = await makeDataForGraph(
        wordsDataByRememberedAt.value
      );
      wordsDataByCreatedAtForGraph.value = await makeDataForGraph(
        wordsDataByCreatedAt.value
      );

      //＠TODO:storeの段階で追加しても良いし、変換のほうが良いかも。
      function convertWordsData() {
        return store.getters["word/words"].map((word: IWord) => {
          return {
            ...word,
            converted_created_at: convertDate(word.created_at),
          };
        });
      }

      //＠TODO:utilにまとめる？
      function convertDate(date: Date) {
        return moment(date).format("YYYY-MM-DD");
      }

      //@TODO: 切り出す
      async function makeDataEquivalentValue(
        words: IWord[],
        equivalentValue: keyof IWord
      ) {
        const week = makeOneWeek();
        const makeData = week.map((day: string) => {
          return words.filter((word: IWord) => {
            return word[equivalentValue] === day;
          });
        });
        return makeData;
      }

      //@TODO: 切り出す
      async function makeDataForGraph(data: any) {
        const week = makeOneWeek();
        const makeData = week.map((day, index) => {
          return { x: day, y: data[index].length };
        });
        return makeData;
      }
    };
    load();

    //@TODO: util内に共通化
    function makeOneWeek() {
      const startDate = () => {
        const today = new Date();
        today.setDate(today.getDate() - 6);
        return today;
      };

      //@TODO: util内に共通化
      let dateList = [];
      const today = new Date();
      for (var d = startDate(); d <= today; d.setDate(d.getDate() + 1)) {
        const formatedDate =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        dateList.push(formatedDate);
      }
      return dateList;
    }

    const basicData = reactive({
      datasets: [
        {
          label: "新しく登録した単語",
          backgroundColor: "#FFA726",
          data: wordsDataByCreatedAtForGraph,
        },
        {
          label: "記憶した単語",
          backgroundColor: "#42A5F5",
          data: wordsDataByRememberedAtForGraph,
        },
      ],
    });

    const basicOptions = ref({
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            beginAtZero: true,
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            max: 100,
            stepSize: 1,
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    });

    return {
      basicData,
      basicOptions,
      words: computed(() => store.getters["word/words"]),
      makeOneWeek,
      wordsDataByRememberedAt,
      wordsDataByCreatedAt,
      wordsDataByCreatedAtForGraph,
      wordsDataByRememberedAtForGraph,
    };
  },
});
</script>
