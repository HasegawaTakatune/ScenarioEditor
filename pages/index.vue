<template>
  <div>
    <h1>シナリオ編集</h1>

    <button @click="DownloadJson()">シナリオファイル出力</button>
    <!-- チャプター編集 -->
    <div class="edit-input">
      <label for="fileName">ファイル名 </label>
      <input
        id="fileName"
        type="text"
        v-model="form.fileName"
        placeholder=".json"
      />
    </div>

    <div class="edit-input">
      <label for="title">タイトル </label>
      <input id="title" type="text" v-model="form.title" />
    </div>

    <div class="edit-input">
      <label for="chapterNo">チャプター番号 </label>
      <input id="chapterNo" type="number" v-model="form.chapterNo" />
    </div>

    <div class="edit-input">
      <label for="backgroundImagePath">背景画像ファイル名 </label>
      <input
        id="backgroundImagePath"
        type="text"
        v-model="form.backgroundImagePath"
        placeholder=".png .jpg .jpeg"
      />
    </div>

    <div class="edit-input">
      <label for="bgmPath">BGMファイル名 </label>
      <input
        id="bgmPath"
        type="text"
        v-model="form.bgmPath"
        placeholder=".wav"
      />
    </div>

    <div class="edit-input">
      <label for="nextChapter">次のチャプター名 </label>
      <input id="nextChapter" type="text" v-model="form.nextChapter" />
    </div>

    <div class="edit-input">
      <label for="keepScene">前のシーンを維持する </label>
      <input
        type="checkbox"
        name="keepScene"
        id="keepScene"
        v-model="form.keepScene"
      />
    </div>

    <!-- シナリオ編集 -->
    <div
      v-for="(value, index) in form.scenario"
      :key="index"
      class="edit-wrapper"
    >
      <p>シナリオ</p>
      <div class="edit-input">
        <label for="name">キャラクタ名 </label>
        <input id="name" type="text" v-model="value.name" />
      </div>

      <div class="edit-input">
        <label for="message">メッセージ </label>
        <input id="message" type="text" v-model="value.message" />
      </div>

      <div class="edit-input">
        <label for="talkingCharacterId">話しているキャラクターID </label>
        <input
          id="talkingCharacterId"
          type="text"
          v-model="value.talkingCharacterId"
        />
      </div>

      <p>キャラクター</p>
      <!-- キャラクター編集 -->
      <div
        v-for="(val, idx) in value.characters"
        :key="idx"
        class="edit-wrapper"
      >
        <div class="edit-input">
          <label for="characterId">キャラクターID </label>
          <input id="characterId" type="text" v-model="val.id" />
        </div>

        <div class="edit-input">
          <label for="imagePath">キャラクター画像ファイル名 </label>
          <input
            id="imagePath"
            type="text"
            v-model="val.imagePath"
            placeholder=".png .jpg .jpeg"
          />
        </div>

        <div class="edit-input">
          <label for="position">座標 </label>
          <select name="position" id="position" v-model="val.position">
            <option
              v-for="(option, i) in positionOptions"
              :value="option.value"
              :key="i"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="edit-input">
          <label for="effect">エフェクト </label>
          <select name="effect" id="effect" v-model="val.effect">
            <option
              v-for="(option, i) in effectOptions"
              :value="option.value"
              :key="i"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <button @click="DeleteCharacter(value, idx)">キャラクター削除</button>
      </div>
      <button @click="AddCharacter(value.characters)">キャラクター追加</button>

      <button @click="DeleteScenario(index)">シナリオ削除</button>
    </div>

    <button @click="AddScenario()">シナリオ追加</button>
    <button @click="DownloadJson()">シナリオファイル出力</button>
  </div>
</template>
<script setup lang="ts">
import { Chapter, Scenario, Character } from "types/TChapter.ts";

const positionOptions = [
  { label: "-", value: "" },
  { label: "左端", value: { x: -9, y: 0, z: 0 } },
  { label: "左", value: { x: -6, y: 0, z: 0 } },
  { label: "中央", value: { x: -3, y: 0, z: 0 } },
  { label: "右", value: { x: 0, y: 0, z: 0 } },
  { label: "右端", value: { x: 3, y: 0, z: 0 } },
];

const effectOptions = [
  { label: "-", value: "" },
  { label: "右入場", value: "enter-right" },
  { label: "左入場", value: "enter-left" },
  { label: "右退場", value: "leave-right" },
  { label: "左退場", value: "leave-left" },
];

const form = reactive<Chapter>({
  fileName: "",
  title: "",
  chapterNo: 0,
  backgroundImagePath: "",
  bgmPath: "",
  nextChapter: "",
  keepScene: false,
  scenario: [],
});

function DeleteScenario(index: number) {
  form.scenario.splice(index, 1);
}

function AddScenario() {
  form.scenario.push({
    name: "",
    message: "",
    talkingCharacterId: "",
    characters: [],
  });
}

function DeleteCharacter(scenario: Scenario, index: number) {
  scenario.characters = scenario.characters.filter(
    (value, idx) => idx != index
  );
}

function AddCharacter(characters: Character[]) {
  characters.push({
    id: "",
    position: "",
    effect: "",
  });
}

function DownloadJson() {
  const json = JSON.stringify(form, null, "  ");
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "chapter.json");
  a.click();
  a.remove();
}
</script>
<style>
.edit-wrapper {
  border: solid;
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-bottom: 0.5rem;
}

.edit-input {
  margin: 0.5rem;
}

.edit-input label {
  display: block;
}

button {
  display: block;
  margin: 0 0.5rem 0.5rem 0.5rem;
}
</style>
