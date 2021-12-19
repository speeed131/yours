<template>
  <div>
    <div class="bg-blueGray-100">
      <div class="pt-12">
        <div class="mb-32 px-4 md:px-10 mx-auto w-full">
          <h1>あなたの1週間の学習状況</h1>
          <Chart type="bar" :data="basicData" :options="basicOptions" />
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
    const delayed = ref(false);
    const maxNumbers = ref([5, 10, 20, 50, 100, 200]);
    const maxNum = ref(10);
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
          backgroundColor: "#f97316",
          data: wordsDataByCreatedAtForGraph,
        },
        {
          label: "記憶した単語",
          backgroundColor: "#0ea5e9",
          data: wordsDataByRememberedAtForGraph,
        },
      ],
    });

    const basicOptions = ref({
      animation: {
        onComplete: () => {
          delayed.value = true;
        },
        delay: (context: any) => {
          let delay = 0;
          if (
            context.type === "data" &&
            context.mode === "default" &&
            !delayed.value
          ) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      plugins: {
        autocolors: false,
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          suggestedMax: maxNum.value, // 最大値
          ticks: {
            stepSize: Math.floor(maxNum.value / 2), // 間隔
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
      maxNum,
      maxNumbers,
      week,
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
