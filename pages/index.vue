<template>
  <client-only>
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

      <!-- チャプター編集 -->
      <div class="edit-input">
        <label for="fileName">ファイル名 </label>
        <input
          id="fileName"
          type="text"
          class=""
          v-model="form.chapterFilePath"
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

        <div>
          <button
            v-for="(option, i) in backgroundOptions"
            @click="
              () => {
                form.backgroundImagePath += option.value;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

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

        <div>
          <button
            v-for="(option, i) in bgmSoundOptions"
            @click="
              () => {
                form.bgmPath += option.value;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

        <input
          id="bgmPath"
          type="text"
          class=""
          v-model="form.bgmPath"
          placeholder=".wav"
        />

        <button class="btn-mg-x" @click="refFirstBGMPath.click()">
          ファイル選択
        </button>
        <input
          ref="refFirstBGMPath"
          type="file"
          accept=".wav"
          @input="form.bgmPath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label for="nextChapter">次のチャプター名 </label>
        <input
          id="nextChapter"
          type="text"
          class=""
          v-model="form.nextChapterFilePath"
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
        <label>BGMを止める</label>
        <input type="checkbox" v-model="value.isCharacterAllKill" />
      </div>

      <div class="edit-input">
        <label>立ち絵全消し</label>
        <input type="checkbox" v-model="value.isStopBGM" />
      </div>

      <div class="edit-input">
        <label>画面エフェクト </label>

        <select class="w-10per" v-model="value.screenEffect">
          <option
            v-for="(option, idx) in screenEffectOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="edit-input">
        <label>話しているキャラクターID </label>

        <input type="text" v-model="value.name" />

        <select
          name="talkingCharacterId"
          class="w-10per"
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
            v-for="(option, idx) in characterIdOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="edit-input">
        <label>中央メッセージ </label>
        <input type="text" class="" v-model="value.splashMessage" />
      </div>

      <div class="edit-input">
        <label>メッセージ </label>
        <textarea
          name="message"
          cols="50"
          rows="5"
          v-model="value.message"
        ></textarea>
      </div>

      <div class="edit-input">
        <label>音声ファイル名 </label>
        <input
          type="text"
          class=""
          v-model="value.voicePath"
          placeholder=".wav"
        />

        <button class="btn-mg-x" @click="refVoicePath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refVoicePath"
          type="file"
          accept=".wav"
          @input="value.voicePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label>背景画像ファイル名 </label>
        <input
          type="text"
          class=""
          v-model="value.backgroundImagePath"
          placeholder=".png .jpg .jpeg"
        />

        <button class="btn-mg-x" @click="refBackgroundImagePath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refBackgroundImagePath"
          type="file"
          accept=".png,.jpg,.jpeg"
          @input="value.backgroundImagePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label>BGMファイル名 </label>

        <div>
          <button
            v-for="(option, i) in bgmSoundOptions"
            @click="
              () => {
                value.bgmPath += option.value;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

        <input
          type="text"
          class=""
          v-model="value.bgmPath"
          placeholder=".wav"
        />

        <button class="btn-mg-x" @click="refBGMPath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refBGMPath"
          type="file"
          accept=".wav"
          @input="value.bgmPath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label>SEファイル名 </label>

        <div>
          <button
            v-for="(option, i) in seSoundOptions"
            @click="
              () => {
                value.sePath += option.value;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

        <input type="text" class="" v-model="value.sePath" placeholder=".wav" />

        <button class="btn-mg-x" @click="refSEPath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refSEPath"
          type="file"
          accept=".wav"
          @input="value.sePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <div class="edit-input">
          <label>スチル番号 </label>
          <input type="number" class="" v-model="value.still.no" />
        </div>

        <label>スチル画像 </label>
        <div>
          <button
            v-for="(option, i) in stillOptions"
            @click="
              () => {
                value.still.imagePath += option.value;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

        <input
          type="text"
          class=""
          v-model="value.still.imagePath"
          placeholder=".png"
        />

        <button class="btn-mg-x" @click="refStill[index].click()">
          ファイル選択
        </button>
        <input
          ref="refStill"
          type="file"
          accept=".png"
          @input="value.still.imagePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <p>キャラクター</p>
      <!-- キャラクター編集 -->
      <div
        v-for="(val, idx) in value.characters"
        :key="idx"
        class="edit-wrapper border-color-blue-600 bg-color-blue-400"
      >
        <div class="edit-input">
          <label>キャラクタ名 </label>
          <input type="text" class="" v-model="val.name" />

          <select
            class="w-10per"
            v-model="val.id"
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
              v-for="(option, i) in characterIdOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="edit-input">
          <label>キャラクターID </label>
          <input type="text" class="" v-model="val.id" />
        </div>

        <div>
          <button
            v-for="(option, i) in charaNameOptions"
            @click="
              () => {
                val.imagePath += option.value;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

        <div>
          <button
            v-for="(option, i) in charaFaceOptions"
            @click="
              () => {
                val.imagePath += `_${option.value}`;
              }
            "
          >
            {{ option.label }}
          </button>
        </div>

        <div class="edit-input">
          <label>キャラクター画像ファイル名 </label>
          <input
            type="text"
            class=""
            v-model="val.imagePath"
            placeholder=".png .jpg .jpeg"
          />

          <button
            class="btn-mg-x"
            @click="refCharacterImagePath[index].click()"
          >
            ファイル選択
          </button>
          <input
            ref="refCharacterImagePath"
            type="file"
            accept=".png,.jpg,.jpeg"
            @input="val.imagePath = UploadResourceFile($event)"
            hidden
          />
        </div>

        <div class="edit-input">
          <label>座標 </label>
          <select name="position" class="" v-model="val.position">
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
          <label>キャラ移動 </label>
          <select name="moveEffect" class="" v-model="val.moveEffect">
            <option
              v-for="(option, i) in charaMoveOptions"
              :value="option.value"
              :key="i"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="edit-input">
          <label>キャラエフェクト </label>
          <select name="effect" class="" v-model="val.effect">
            <option
              v-for="(option, i) in charaEffectOptions"
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

      <p>選択肢</p>
      <!-- 選択肢編集 -->
      <div
        v-for="(val, idx) in value.choiceOptions"
        :key="idx"
        class="edit-wrapper border-color-blue-600 bg-color-blue-400"
      >
        <div class="edit-input">
          <label>ラベル </label>
          <input type="text" class="" v-model="val.label" />
        </div>

        <div class="edit-input">
          <label> </label>
          <input
            type="text"
            class=""
            v-model="val.chapterFilePath"
            placeholder=".json"
          />

          <button
            class="btn-mg-x"
            @click="refChoiceOptionChapterFilePath[index].click()"
          >
            ファイル選択
          </button>
          <input
            ref="refChoiceOptionChapterFilePath"
            type="file"
            accept=".json"
            @input="val.chapterFilePath = UploadResourceFile($event)"
            hidden
          />
        </div>

        <button
          class="d-block btn-mg-x btn-mg-bottom btn-right"
          @click="DeleteChoiceOption(value, idx)"
        >
          選択肢削除
        </button>
      </div>

      <div class="edit-input">
        <label>エンディング種別 </label>

        <select class="w-10per" v-model="value.endingType">
          <option
            v-for="(option, idx) in endingOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="d-block btn-left">
        <button
          class="btn-mg-x btn-mg-bottom"
          @click="AddCharacter(value.characters)"
        >
          キャラクター追加
        </button>

        <button
          class="btn-mg-x btn-mg-bottom"
          @click="AddChoiceOption(value.choiceOptions)"
        >
          選択肢追加
        </button>

        <button
          class="btn-mg-x btn-mg-bottom"
          @click="AddScenarioToIndex(index + 1)"
        >
          シナリオ追加
        </button>
      </div>

      <button
        class="d-block btn-mg-x btn-mg-bottom btn-right"
        @click="DeleteScenario(index)"
      >
        シナリオ削除
      </button>
    </div>
  </client-only>
</template>
<script setup lang="ts">
import {
  Chapter,
  Scenario,
  Character,
  ChoiceOption,
  Still,
} from "types/TChapter.ts";

const refFirstBackgroundImagePath = ref();
const refFirstBGMPath = ref();

const refBackgroundImagePath = ref();
const refVoicePath = ref();
const refBGMPath = ref();
const refSEPath = ref();
const refStill = ref();

const refCharacterImagePath = ref();
const refChoiceOptionChapterFilePath = ref();

const positionOptions = [
  { label: "-", value: "" },
  { label: "左端", value: { x: -9, y: 0, z: 0 } },
  { label: "左", value: { x: -6, y: 0, z: 0 } },
  { label: "中央", value: { x: -3, y: 0, z: 0 } },
  { label: "右", value: { x: 0, y: 0, z: 0 } },
  { label: "右端", value: { x: 3, y: 0, z: 0 } },
];

const screenEffectOptions = [
  { label: "-", value: "" },
  { label: "色褪せた印象", value: "sepia-color" },
];

const charaMoveOptions = [
  { label: "-", value: "" },
  { label: "右入場", value: "enter-right" },
  { label: "左入場", value: "enter-left" },
  { label: "右退場", value: "leave-right" },
  { label: "左退場", value: "leave-left" },
];

const charaEffectOptions = [
  { label: "-", value: "" },
  { label: "黒いオーラ", value: "black-aura" },
];

const charaNameOptions = [
  { label: "黒", value: "hei" },
  { label: "紅", value: "hon" },
  { label: "黄", value: "holan" },
  { label: "青", value: "ran" },
  { label: "緑", value: "ryuu" },
  { label: "桃", value: "fenhon" },
  { label: "白", value: "pai" },
  { label: "紫", value: "zuu" },
  { label: "橙", value: "chon" },
  { label: "灰", value: "fuyi" },
  { label: "銀", value: "inn" },
  { label: "伊", value: "yi" },
];

const charaFaceOptions = [
  { label: "普通", value: "normal" },
  { label: "微笑み", value: "smile" },
  { label: "怒り", value: "anger" },
  { label: "悲しみ", value: "sadness" },
  { label: "笑顔", value: "happy" },
  { label: "驚き", value: "surprise" },
  { label: "恐れ", value: "fear" },
  { label: "期待", value: "expectation" },
  { label: "嫌悪", value: "disgust" },
  { label: "爆笑", value: "laughter" },
  { label: "心配", value: "worry" },
  { label: "激怒", value: "rage" },
  { label: "動揺", value: "disturbance" },
  { label: "不安", value: "anxiety" },
  { label: "笑顔（目開き）", value: "smile_open_eye" },
  { label: "寝惚け", value: "drowsiness" },
  { label: "眠り", value: "sleep" },
  { label: "諦め", value: "give_up" },
  { label: "あきれる", value: "ridiculous" },
  { label: "疑問", value: "question" },
  { label: "照れる", value: "feel_embarrassed" },
];

const backgroundOptions = [
  { label: "1_", value: "1_" },
  { label: "2_", value: "2_" },
  { label: "3_保健室、昼", value: "3_infirmary_daytime.png" },
  { label: "4_教室、昼", value: "4_classroom_daytime.png" },
  { label: "5_", value: "5_" },
  { label: "6_学校・廊下、昼", value: "6_school-corridor_daytime.png" },
  { label: "7_図書室、夕", value: "7_library_evening.png" },
  { label: "8_", value: "8_" },
  { label: "9_女子トイレ、夜", value: "9_girls-restroom_night.png" },
];

const seSoundOptions = [
  { label: "アスファルトの上を歩く", value: "Walking on asphalt.mp3" },
  { label: "ガラスが割れる", value: "Glass breaking.mp3" },
  { label: "ドラゴンが火を吐く", value: "A dragon breathing fire.mp3" },
  { label: "バタンと倒れる", value: "Falling with a thud.mp3" },
  { label: "学校のチャイム", value: "School bell.mp3" },
  { label: "打撃", value: "Impact.mp3" },
  { label: "机をドンと叩く", value: "Slapping the desk with a thud.mp3" },
  { label: "風に揺れる草木", value: "Grass and trees swaying in the wind.mp3" },
];

const bgmSoundOptions = [
  { label: "3月の澄んだ空", value: "Clear sky in March.mp3" },
  { label: "4本のリコーダー", value: "Four recorders.mp3" },
  { label: "6人のラッパ吹き", value: "Six trumpet players.mp3" },
  { label: "エナジー", value: "Energy.mp3" },
  { label: "エレジー・フォー・ストリングス", value: "Elegy for Strings.mp3" },
  { label: "チェス", value: "Chess.mp3" },
  { label: "プルキンエ・フェノミナン", value: "Pushkin's Phenomena.mp3" },
  { label: "ラブリーフラワー", value: "Lovely flower.mp3" },
  { label: "レトロパーティー", value: "Retro party.mp3" },
  { label: "三毛猫のワルツ", value: "Calico cat waltz.mp3" },
  { label: "傾きかけた日差し", value: "Tilting sunlight.mp3" },
  { label: "夏の霧", value: "Summer mist.mp3" },
  { label: "夏休みの探検", value: "Summer vacation exploration.mp3" },
  { label: "寂寞", value: "Loneliness.mp3" },
  { label: "悲しみの曖昧な対象", value: "Ambiguous object of sorrow.mp3" },
  { label: "抜き足差し足", value: "Coming and going.mp3" },
  { label: "放課後の夕空", value: "After-school evening sky.mp3" },
  { label: "日々是好日", value: "Every day is a good day.mp3" },
  { label: "日向ぼっこ", value: "Basking in the sun.mp3" },
  { label: "月明かりの灯台", value: "Moonlit lighthouse.mp3" },
  { label: "水に沈むピアノ", value: "Piano sinking in water.mp3" },
  { label: "水槽に沈む月", value: "Moon sinking in the aquarium.mp3" },
  { label: "超深海の遊泳", value: "Deep-sea swimming.mp3" },
  { label: "長靴でお出かけ", value: "Outing in rubber boots.mp3" },
  { label: "雨の日のネオン", value: "Neon on a rainy day.mp3" },
  { label: "騎兵戦", value: "Cavalry battle.mp3" },
];

const stillOptions = [
  {
    label:
      "写真。黒以外は薄い影(黒(くろ)ではなく限りなく薄い緑や水色。背景:ビル街、昼、青空)黒は17歳時のもの。",
    value: ".png",
  },
  {
    label:
      "机をバンッと叩き立ち上がる黄。混乱する黒。周りで笑っている学園組。背景:喫茶店",
    value: ".png",
  },
  {
    label:
      "ぽかんとする黒(中央)、薄く笑う白(中央)、ぽかんとする橙、紫(ミニキャラ)、冷静な灰(ミニキャラ)。背景:灰組の事務所",
    value: ".png",
  },
  {
    label:
      "おろおろする黒(中央)、苦笑いをする紅(中央)、周りに怒りながら立ち上がる緑と青、黄、にこやかに笑うが後ろにゴゴゴと黒い影がある桃。背景:喫茶店",
    value: ".png",
  },
  {
    label:
      "中央に大きく黒の額に口付けする橙。後ろに茶化す様子の紫、白、灰のミニキャラ",
    value: ".png",
  },
  {
    label:
      "中央におろおろ黒、笑いながら顔に汗の橙、周りに戦闘態勢の学園組。背景：喫茶店",
    value: ".png",
  },
  {
    label:
      "紫が黒の顎を指で持ち上げながらキス（背景は描いても描かなくてもいいです。一応背景は灰組の事務所です）",
    value: ".png",
  },
  { label: "白が黒の事を抱き締める（背景は上記と同じ）", value: ".png" },
  {
    label: "黄と手を取り合う黒（背景はｒｙ。一応背景は黄龍会の部屋）",
    value: ".png",
  },
  {
    label:
      "中央に学級日誌的な物を抱える黒とチョークを持つ灰。後ろに各キャラクターのドタバタ。無理そうなら黒と灰だけでいいです。その場合は平野と青空を背景に。",
    value: ".png",
  },
];

const endingOptions = [
  { label: "-", value: null },
  { label: "表-紅ルート", value: 0 },
  { label: "表-黄ルート", value: 1 },
  { label: "表-白ルート", value: 2 },
  { label: "表-橙ルート", value: 3 },

  { label: "裏-白ルート", value: 4 },
  { label: "裏-橙ルート", value: 5 },
  { label: "裏-紫ルート", value: 6 },
  { label: "裏-黄ルート", value: 7 },
  { label: "裏-灰ルート", value: 8 },
];

const uploadJson = ref();
const form = ref<Chapter>({
  chapterFilePath: "",
  nextChapterFilePath: "",
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
    voicePath: "",
    splashMessage: "",
    talkingCharacterId: "",

    choiceOptions: [],
    characters: [],

    backgroundImagePath: "",

    still: {
      no: 0,
      imagePath: "",
    },

    bgmPath: "",
    sePath: "",

    screenEffect: "",

    isCharacterAllKill: false,
    isStopBGM: false,
  });
}

function AddScenarioToIndex(index: number) {
  const data = {
    name: "",
    message: "",
    voicePath: "",
    splashMessage: "",
    talkingCharacterId: "",

    choiceOptions: [],
    characters: [],

    backgroundImagePath: "",

    still: {
      no: 0,
      imagePath: "",
    },

    bgmPath: "",
    sePath: "",

    screenEffect: "",

    isCharacterAllKill: false,
    isStopBGM: false,
  };
  form.value.scenario.splice(index, 0, data);
}

// キャラクタ入力項目の削除
function DeleteCharacter(scenario: Scenario, index: number) {
  scenario.characters = (scenario.characters as Character[]).filter(
    (_, idx) => idx != index
  );
}

// キャラクタ入力項目の追加
function AddCharacter(characters: Character[]) {
  characters.push({
    name: "",
    id: "",
    imagePath: "",
    position: "",
    moveEffect: "",
    effect: "",
  });
}

// 選択肢入力項目の削除
function DeleteChoiceOption(choiceOption: ChoiceOption, index: number) {
  choiceOption = (choiceOption as ChoiceOption[]).filter(
    (_, idx) => idx != index
  );
}

// 選択肢入力項目の追加
function AddChoiceOption(choiceOption: ChoiceOption[]) {
  choiceOption.push({
    no: 0,
    imagePath: "",
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
      voicePath: "",
      splashMessage: "",
      talkingCharacterId: "",

      choiceOptions: [],
      characters: [],

      backgroundImagePath: "",

      still: {
        no: 0,
        imagePath: "",
      },

      bgmPath: "",
      sePath: "",

      screenEffect: "",

      isCharacterAllKill: false,
      isStopBGM: false,
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
input[type="text"],
textarea,
select {
  font-weight: bold;
}

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

.w-10per {
  width: 10%;
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
