import { IWord, IWordRequest } from "@/interfaces/api";
import { ref, computed, Ref } from "vue";
import { useStore } from "vuex";

export const dispatchGetWords = async () => {
  const store = useStore();
  await store.dispatch("word/getWords");
};

export const dispatchPostWord = async (wordData: IWordRequest) => {
  const store = useStore();
  console.log(wordData);
  console.log("dispatchPostWord");
  await store.dispatch("word/postWord", wordData);
};

//＠MEMO:Composition API 内ではreturn computed しか使えない。。。。。 必要なさそう
// //@TODO:適切な型に変換する
// export const useGetWords = () => {
//   // await dispatchGetWords();
//   const store = useStore();
//   // const words = ref<IWord[]>([]);
//   // console.log(store.getters["word/words"]);
//   console.log(store);
//   const words: IWord[] = store.getters["word/words"];
//   console.log(words);
//   return {
//     words,
//   };
// };
