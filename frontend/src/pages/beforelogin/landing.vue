<template>
  <div>
    <div class="bg-blueGray-100">
      <div class="pt-12">
        <div class="mb-32 px-4 md:px-10 mx-auto w-full">
          <p>
            本やオンライン英会話などいろんな媒体で学んだ英単語を一括で管理したい...
          </p>
          <p>学習記録を見て、英語学習のモチベーションを上げたい...</p>
          <p>
            その思いから作られた yours は
            あなたの英語学習を手助けするアプリです。
          </p>
        </div>
        <Card style="width: 25em">
          <template #header>
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
              style="height: 15rem"
            />
          </template>
          <template #title> Advanced Card </template>
          <template #subtitle> Card subtitle </template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
          <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button
              icon="pi pi-times"
              label="Cancel"
              class="p-button-secondary"
              style="margin-left: 0.5em"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, defineComponent, reactive, Ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";

type HowToUseItems = { title: string; imageSrc: string; body: string };

export default defineComponent({
  components: { Card, Button },
  setup() {
    const target = `本やオンライン英会話などいろんな媒体で学んだ英単語を一括で管理したい...
                      学習記録を見て、英語学習のモチベーションを上げたい...
                      その思いから作られた yours は あなたの英語学習を手助けするアプリです。
    `;
    const howToUseItems: HowToUseItems[] = [
      {
        title: "１，まずはユーザ登録をしましょう",
        imageSrc: "signin.png",
        body: "名前とパスワードだけで簡単に登録できます。",
      },
      {
        title: "２，ホームでは、あなたの学習記録を見ることができます",
        imageSrc: "home.png",
        body: "学習記録を積み上げ、モチベーションアップに。",
      },
      {
        title:
          "３, 未習得の単語一覧では、あなたの覚えたい単語を登録し、一括管理することができます。",
        imageSrc: "home2.jpg",
        body: "「New」のボタンで単語を新規登録しましょう。また、覚えた単語を選択し、「Remembered」ボタンで覚えた単語一覧に移動できます。",
      },
      {
        title:
          "４, 覚えた単語一覧では、あなたが覚えた単語を一括管理することができます。",
        imageSrc: "favorite.jpg",
        body: `「New」のボタンで単語を新規登録しましょう。また、覚えた単語を選択し、「Remembered」ボタンで覚えた単語一覧に移動できます。`,
      },
    ];
  },
});
</script>
