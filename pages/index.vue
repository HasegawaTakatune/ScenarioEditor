<template>
  <div>
    <div class="header">
      <h1>シナリオ編集</h1>

      <div class="d-flex">
        <button class="d-block btn-mg-x btn-mg-bottom" @click="DownloadJson">
          シナリオファイル出力
        </button>
        <button
          class="d-block btn-mg-x btn-mg-bottom"
          @click="uploadJson.click()"
        >
          シナリオファイル読込
        </button>
        <input
          type="file"
          name="upload-json"
          id="upload-json"
          ref="uploadJson"
          @input="UploadJson"
          hidden
        />
      </div>

      <button class="d-block btn-mg-x btn-mg-bottom" @click="AddScenario">
        シナリオ追加
      </button>

      <!-- <div class="edit-input">
        <label for="fileName">シナリオを生成 </label>
        <div style="display: flex">
          <input
            id="fileName"
            type="number"
            class=""
            v-model="createScenarioCount"
          />
          <button class="d-block btn-mg-x" @click="CreateScenarioNumber">
            生成する
          </button>
        </div>
      </div> -->

      <!-- チャプター編集 -->
      <div class="edit-input">
        <label for="fileName">ファイル名 </label>
        <input
          id="fileName"
          type="text"
          class=""
          v-model="form.fileName"
          placeholder=".json"
        />
      </div>
    </div>

    <div>
      <div class="edit-input">
        <label for="title">タイトル </label>
        <input id="title" type="text" class="" v-model="form.title" />
      </div>

      <div class="edit-input">
        <label for="chapterNo">チャプター番号 </label>
        <input id="chapterNo" type="number" class="" v-model="form.chapterNo" />
      </div>

      <div class="edit-input">
        <label for="firstBackgroundImagePath">背景画像ファイル名 </label>

        <input
          id="firstBackgroundImagePath"
          type="text"
          class=""
          v-model="form.backgroundImagePath"
          placeholder=".png .jpg .jpeg"
        />

        <button class="btn-mg-x" @click="refFirstBackgroundImagePath.click()">
          ファイル選択
        </button>
        <input
          ref="refFirstBackgroundImagePath"
          type="file"
          accept=".png,.jpg,.jpeg"
          @input="form.backgroundImagePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label for="bgmPath">BGMファイル名 </label>
        <input
          id="bgmPath"
          type="text"
          class=""
          v-model="form.bgmPath"
          placeholder=".wav"
        />
      </div>

      <div class="edit-input">
        <label for="nextChapter">次のチャプター名 </label>
        <input
          id="nextChapter"
          type="text"
          class=""
          v-model="form.nextChapter"
        />
      </div>

      <div class="edit-input">
        <label for="keepScene">前のシーンを維持する </label>
        <input
          id="keepScene"
          type="checkbox"
          name="keepScene"
          v-model="form.keepScene"
        />
      </div>
    </div>

    <!-- シナリオ編集 -->
    <div
      v-for="(value, index) in form.scenario"
      :key="index"
      class="edit-wrapper border-color-blue-300 bg-color-blue-100"
    >
      <p>シナリオ</p>

      <div class="edit-input">
        <label for="talkingCharacterId">話しているキャラクターID </label>
        <select
          name="talkingCharacterId"
          id="talkingCharacterId"
          class="w-50per"
          v-model="value.talkingCharacterId"
          @input="
            (event: any) => {
              const option = characterIdOptions.find((vl) => vl.value == event.target.value);
              if (option) {
                value.name = option.label;
              }
            }
          "
        >
          <option
            v-for="(option, index) in characterIdOptions"
            :key="index"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="edit-input">
        <label for="message">メッセージ </label>
        <textarea
          name="message"
          id="message"
          cols="50"
          rows="5"
          v-model="value.message"
        ></textarea>
      </div>

      <div class="edit-input">
        <label for="name">背景画像ファイル名 </label>
        <input
          id="name"
          type="text"
          class=""
          v-model="value.backgroundImagePath"
        />
      </div>

      <div class="edit-input">
        <label for="name">BGMファイル名 </label>
        <input id="name" type="text" class="" v-model="value.bgmPath" />
      </div>

      <div class="edit-input">
        <label for="name">SEファイル名 </label>
        <input id="name" type="text" class="" v-model="value.sePath" />
      </div>

      <p>キャラクター</p>
      <!-- キャラクター編集 -->
      <div
        v-for="(val, idx) in value.characters"
        :key="idx"
        class="edit-wrapper border-color-blue-600 bg-color-blue-400"
      >
        <div class="edit-input">
          <label for="name">キャラクタ名 </label>
          <input id="name" type="text" class="" v-model="val.name" />
        </div>

        <div class="edit-input">
          <label for="characterId">キャラクターID </label>
          <input id="characterId" type="text" class="" v-model="val.id" />
        </div>

        <div class="edit-input">
          <label for="imagePath">キャラクター画像ファイル名 </label>
          <input
            id="imagePath"
            type="text"
            class=""
            v-model="val.imagePath"
            placeholder=".png .jpg .jpeg"
          />
        </div>

        <div class="edit-input">
          <label for="position">座標 </label>
          <select name="position" id="position" class="" v-model="val.position">
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
          <select name="effect" id="effect" class="" v-model="val.effect">
            <option
              v-for="(option, i) in effectOptions"
              :value="option.value"
              :key="i"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <button
          class="d-block btn-mg-x btn-mg-bottom btn-right"
          @click="DeleteCharacter(value, idx)"
        >
          キャラクター削除
        </button>
      </div>
      <button
        class="d-block btn-mg-x btn-mg-bottom btn-left"
        @click="AddCharacter(value.characters)"
      >
        キャラクター追加
      </button>

      <button
        class="d-block btn-mg-x btn-mg-bottom btn-right"
        @click="DeleteScenario(index)"
      >
        シナリオ削除
      </button>
    </div>

    <!-- <div class="d-flex">
      <button class="d-block btn-mg-x btn-mg-bottom" @click="AddScenario">
        シナリオ追加
      </button>
      <button class="d-block btn-mg-x btn-mg-bottom" @click="DownloadJson">
        シナリオファイル出力
      </button>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { Chapter, Scenario, Character } from "types/TChapter.ts";

const refFirstBackgroundImagePath = ref();

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
const uploadJson = ref();
const form = ref<Chapter>({
  fileName: "",
  title: "",
  chapterNo: 0,
  backgroundImagePath: "",
  bgmPath: "",
  nextChapter: "",
  keepScene: false,
  scenario: [],
});

// 話しているキャラクタの選択肢生成
const characterIdOptions = computed(() => {
  let options: any[] = [];
  form.value.scenario?.forEach((value: Scenario) => {
    const result = value.characters
      .filter((vl: Character) => {
        return (
          typeof vl.id == "string" &&
          vl.id != "" &&
          !options.find((element) => element.value == vl.id)
        );
      })
      .map((vl: Character) => {
        return {
          label: vl.name,
          value: vl.id,
        };
      });
    options = options.concat(result);
  });

  return options;
});

// シナリオ入力項目の削除
function DeleteScenario(index: number) {
  form.value.scenario.splice(index, 1);
}

// シナリオ入力項目の追加
function AddScenario() {
  form.value.scenario.push({
    name: "",
    message: "",
    talkingCharacterId: "",
    characters: [],
  });
}

// キャラクタ入力項目の削除
function DeleteCharacter(scenario: Scenario, index: number) {
  scenario.characters = (scenario.characters as Character[]).filter(
    (value, idx) => idx != index
  );
}

// キャラクタ入力項目の追加
function AddCharacter(characters: Character[]) {
  characters.push({
    id: "",
    position: "",
    effect: "",
  });
}

// JSONファイルの生成・ダウンロード
function DownloadJson() {
  let filename = "";
  if (/\.json$/.test(form.value.fileName)) {
    filename = form.value.fileName;
  } else {
    filename = `${form.value.fileName}.json`;
  }

  const json = JSON.stringify(form.value, null, "  ");
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
  a.remove();
}

// JSONファイルから編集内容の復元
function UploadJson(event: any) {
  const file = event.target.files[0];
  event.file = null;
  const reader = new FileReader();

  reader.readAsText(file);
  reader.onload = function (event: any) {
    const json = JSON.parse(event.target?.result);
    form.value = json;
  };
}

// 要素数分のシナリオ入力項目の追加
const createScenarioCount = ref(0);
function CreateScenarioNumber() {
  form.value.scenario = [];
  for (let index = 0; index < createScenarioCount.value; index++) {
    form.value.scenario.push({
      name: "",
      message: "",
      talkingCharacterId: "",
      characters: [],
      backgroundImagePath: "",
      bgmPath: "",
      sePath: "",
    });
  }
}

function UploadResourceFile(event: any) {
  const file = event.target.files[0];
  const fileName = file.name;
  event.target.files = null;
  return fileName;
}
</script>
<style>
html {
  background-color: #f1feff;
}

.header {
  position: sticky;
  top: 0;
  background: #acacff;
  padding: 1rem;
}

.edit-wrapper {
  border: solid;
  padding: 0.5rem 0.5rem 2rem 0.5rem;
  margin-bottom: 0.5rem;
}

.edit-input {
  margin: 0.5rem;
}

.edit-input label {
  display: block;
}

.w-50per {
  width: 50%;
}

.d-block {
  display: block;
}

.d-flex {
  display: flex;
}

.btn-mg-x {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.btn-mg-bottom {
  margin-bottom: 0.5rem;
}

.btn-left {
  float: left;
}

.btn-right {
  float: right;
}

.border-color-blue-300 {
  border-color: #a2b8d7;
}

.border-color-blue-600 {
  border-color: #3579d7;
}

.bg-color-blue-100 {
  background-color: #d3f3ff;
}

.bg-color-blue-400 {
  background-color: #9cc1ff;
}
</style>
