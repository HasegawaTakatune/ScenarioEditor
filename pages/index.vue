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
        <select v-model="form.backgroundImagePath">
          <option
            v-for="(option, idx) in backgroundOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

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
        <select v-model="form.bgmPath">
          <option
            v-for="(option, idx) in bgmSoundOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <input
          id="bgmPath"
          type="text"
          class=""
          v-model="form.bgmPath"
          placeholder=".wav,.mp3"
        />

        <button class="btn-mg-x" @click="refFirstBGMPath.click()">
          ファイル選択
        </button>
        <input
          ref="refFirstBGMPath"
          type="file"
          accept=".wav,.mp3"
          @input="form.bgmPath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label for="nextChapterFilePath">次のチャプター名 </label>
        <input
          id="nextChapterFilePath"
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

      <div class="edit-input">
        <label>BGMを止める</label>
        <input type="checkbox" v-model="form.stopBGM" />
      </div>

      <div class="edit-input">
        <label>立ち絵全消し</label>
        <input type="checkbox" v-model="form.isCharacterAllKill" />
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
        <select v-model="value.screenEffect">
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
        <input type="text" v-model="value.talkingCharacterId" />

        <select
          name="talkingCharacterId"
          @input="
            (event: any) => {
              const option = charaNameOptions.find((vl) => vl.value == event.target.value);
              if (option) {
                if(option.value == null){
                  value.name = '';
                  value.talkingCharacterId = '';
                }else if(!value?.talkingCharacterId){
                  value.name = option.label;
                  value.talkingCharacterId = option.value;
                }else{
                  value.name = value?.name ? `${value.name},${option.label}` : option.label;
                  value.talkingCharacterId = value?.talkingCharacterId ? `${value.talkingCharacterId},${option.value}` : option.value;
                }
              }
            }
          "
        >
          <option
            v-for="(option, idx) in charaNameOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="edit-input">
        <label>後ろに位置するキャラクターID </label>

        <input type="text" style="display: block;" v-model="value.backCharacterId" />

        <select
          name="backCharacterId"
          @input="
            (event: any) => {
              const option = charaNameOptions.find((vl) => vl.value == event.target.value);
              if (option) {
                if(option.value == null){
                  value.backCharacterId = '';
                }else if(!value?.talkingCharacterId){
                  value.backCharacterId = option.value;
                }else{
                  value.backCharacterId = value?.talkingCharacterId ? `${value.talkingCharacterId},${option.value}` : option.value;
                }
              }
            }
          "
        >
          <option
            v-for="(option, idx) in charaNameOptions"
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
          placeholder=".wav,.mp3"
        />

        <button class="btn-mg-x" @click="refVoicePath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refVoicePath"
          type="file"
          accept=".wav,.mp3"
          @input="value.voicePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label>背景画像ファイル名 </label>
        <select v-model="value.backgroundImagePath">
          <option
            v-for="(option, idx) in backgroundOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

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
        <select v-model="value.bgmPath">
          <option
            v-for="(option, idx) in bgmSoundOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <input
          type="text"
          class=""
          v-model="value.bgmPath"
          placeholder=".wav,.mp3"
        />

        <button class="btn-mg-x" @click="refBGMPath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refBGMPath"
          type="file"
          accept=".wav,.mp3"
          @input="value.bgmPath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <div class="edit-input">
        <label>SEファイル名 </label>
        <select v-model="value.sePath">
          <option
            v-for="(option, idx) in seSoundOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <input
          type="text"
          class=""
          v-model="value.sePath"
          placeholder=".wav,.mp3"
        />

        <button class="btn-mg-x" @click="refSEPath[index].click()">
          ファイル選択
        </button>
        <input
          ref="refSEPath"
          type="file"
          accept=".wav,.mp3"
          @input="value.sePath = UploadResourceFile($event)"
          hidden
        />
      </div>

      <template v-if="value.still">
        <div class="edit-input">
          <label>スチル番号 </label>
          <input type="number" class="" v-model="value.still.no" />
        </div>

        <div class="edit-input">
          <label>スチル画像 </label>
          <select v-model="value.still.imagePath">
            <option
              v-for="(option, idx) in stillOptions"
              :key="idx"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>

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
      </template>

      <p>キャラクター</p>
      <!-- キャラクター編集 -->
      <div
        v-for="(val, idx) in value.characters"
        :key="idx"
        class="edit-wrapper border-color-blue-600 bg-color-blue-400"
      >
        <div class="edit-input">
          <label>キャラクタ名 </label>
          <select
            v-model="val.id"
            @input="
            (event: any) => {
              if(!event.target.value)return;
              const option = charaNameOptions.find((vl) => vl.value == event.target.value);
              if (option) {
                val.name = option.label;
              }
            }
          "
          >
            <option
              v-for="(option, i) in charaNameOptions"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="edit-input">
          <label>キャラクターID </label>
          <input type="text" class="" v-model="val.id" disabled />
        </div>

        <div class="edit-input">
          <label>キャラクター画像ファイル名 </label>
          <select v-model="val.imagePath">
            <option
              v-for="(option, i) in getCharacterFaceOptions(val.id)"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
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
        <select v-model="value.endingType">
          <option
            v-for="(option, idx) in endingOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="edit-input">
        <label>間</label>
        <input type="checkbox" v-model="value.sleep" />
      </div>

      <div class="edit-input">
        <label>暗転</label>
        <input type="checkbox" v-model="value.fadeOut" />
      </div>

      <div class="edit-input">
        <label>暗転（バック）</label>
        <input type="checkbox" v-model="value.fadeOutBack" />
      </div>

      <div class="edit-input">
        <label>明転</label>
        <input type="checkbox" v-model="value.fadeIn" />
      </div>

      <div class="edit-input">
        <label>メッセージ継続</label>
        <input type="checkbox" v-model="value.continueMessage" />
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
  { label: "一番左端", value: { x: -12, y: 0, z: 0 } },
  { label: "左端", value: { x: -9, y: 0, z: 0 } },
  { label: "左", value: { x: -6, y: 0, z: 0 } },
  { label: "中央", value: { x: -3, y: 0, z: 0 } },
  { label: "右", value: { x: 0, y: 0, z: 0 } },
  { label: "右端", value: { x: 3, y: 0, z: 0 } },
  { label: "一番右端", value: { x: 6, y: 0, z: 0 } },
];

const screenEffectOptions = [
  { label: "-", value: "" },
  { label: "取り消す", value: "none" },
  { label: "色褪せた印象", value: "sepia-color" },
  { label: "渦を巻く炎", value: "flame-vortex" },
];

const charaMoveOptions = [
  { label: "-", value: "" },
  { label: "出現", value: "one-shot" },
  { label: "右入場", value: "enter-right" },
  { label: "左入場", value: "enter-left" },
  { label: "フェードイン", value: "fade-in" },
  { label: "右退場", value: "leave-right" },
  { label: "左退場", value: "leave-left" },
  { label: "フェードアウト", value: "fade-out" },
  { label: "移動", value: "move" },
];

const charaEffectOptions = [
  { label: "-", value: "" },
  { label: "取り消す", value: "none" },
  // { label: "黒いオーラ", value: "black-aura" },
  { label: "姿を消す", value: "hide" },
  { label: "姿を現す", value: "show-up" },
];

const charaNameOptions = [
  { label: "-", value: null },
  { label: "黒（ヘイ）", value: "hei" },
  { label: "紅（ホン）", value: "hon" },
  { label: "黄（ホァン）", value: "holan" },
  { label: "青（ラン）", value: "ran" },
  { label: "緑（リュウ）", value: "ryuu" },
  { label: "桃（フェンホン）", value: "fenhon" },
  { label: "白（パイ）", value: "pai" },
  { label: "紫（ズー）", value: "zuu" },
  { label: "橙（チォン）", value: "chon" },
  { label: "灰（フゥイ）", value: "fuyi" },
  { label: "銀（イン）", value: "inn" },
  { label: "伊（イ）", value: "" },
  { label: "女子生徒", value: "" },
  { label: "教師", value: "" },
  { label: "手下", value: "" },
  { label: "取引相手", value: "" },
];

const getCharacterFaceOptions = (characterId: string) => {
  switch (characterId) {
    case "hei":
      return heiCharaFaceOptions;
    case "hon":
      return honCharaFaceOptions;
    case "holan":
      return holanCharaFaceOptions;
    case "ran":
      return ranCharaFaceOptions;
    case "ryuu":
      return ryuuCharaFaceOptions;
    case "fenhon":
      return fenhonCharaFaceOptions;
    case "pai":
      return paiCharaFaceOptions;
    case "zuu":
      return zuuCharaFaceOptions;
    case "chon":
      return chonCharaFaceOptions;
    case "fuyi":
      return fuyiCharaFaceOptions;
    case "inn":
      return innCharaFaceOptions;
    default:
      return [{ label: "-", value: "" }];
  }
};

// （年齢）_ キャラ_ 服装_ 表情_ オプション１_ オプション２
// 14_ hei_ private_clothes_ normal_ dark_circles_ non_highlight
const heiCharaFaceOptions = [
  { label: "14 ノーマル//制服", value: "14_hei_school_uniform_normal.png" },
  { label: "14 ノーマル//私服", value: "14_hei_private_clothes.png" },
  {
    label: "14 ノーマル//私服(目の下に隈。虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_normal_dark_circles_non_highlight.png",
  },
  {
    label: "14 ノーマル//私服(目の下に隈。目は普通(ハイライトあり))",
    value: "14_hei_private_clothes_normal_dark_circles_highlight.png",
  },

  { label: "14 笑う//制服", value: "14_hei_school_uniform_happy.png" },
  { label: "14 笑う//私服", value: "14_hei_private_clothes_happy.png" },
  {
    label: "14 にっこり笑う//制服",
    value: "14_hei_school_uniform_smile_softly.png",
  },

  {
    label: "14 満面の笑み//制服",
    value: "14_hei_school_uniform_big_smile.png",
  },
  {
    label: "14 満面の笑み//私服",
    value: "14_hei_private_clothes_big_smile.png",
  },

  { label: "14 微笑み//制服", value: "14_hei_school_uniform_smile.png" },
  { label: "14 微笑み//私服", value: "14_hei_private_clothes_smile.png" },

  {
    label: "14 弱々しく笑う//私服",
    value: "14_hei_private_clothes_smile_weakly.png",
  },
  {
    label: "14 弱々しく笑う//私服(目の下に隈、虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_smile_weakly_dark_circles_non_highlight.png",
  },
  {
    label: "14 弱々しく笑う//私服(目の下に隈、目は普通(ハイライトあり))",
    value: "14_hei_private_clothes_smile_weakly_dark_circles_highlight.png",
  },

  {
    label: "14 驚き(呆然)(ぽかんとする)//制服",
    value: "14_hei_school_uniform_surprise.png",
  },
  {
    label: "14 驚き(呆然)(ぽかんとする)//私服",
    value: "14_hei_private_clothes_surprise.png",
  },
  {
    label:
      "14 驚き(呆然)(ぽかんとする)//私服(目の下に隈、虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_surprise_circles_non_highlight.png",
  },

  {
    label: "14 泣きそう(悲しげ)(しょんぼり)//制服",
    value: "14_hei_school_uniform_sadness.png",
  },
  {
    label: "14 泣きそう(悲しげ)(しょんぼり)//私服",
    value: "14_hei_private_clothes_sadness.png",
  },
  {
    label:
      "14 泣きそう(悲しげ)(しょんぼり)//私服(目の下に隈、虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_sadness_dark_circles_non_highlight.png",
  },

  { label: "14 泣く//制服", value: "14_hei_school_uniform_cry.png" },
  { label: "14 泣く//私服", value: "14_hei_private_clothes_cry.png" },
  {
    label: "14 泣く//私服(目の下に隈、虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_cry_dark_circles_non_highlight.png",
  },

  {
    label: "14 疑問(考える)//制服",
    value: "14_hei_school_uniform_question.png",
  },
  {
    label: "14 疑問(考える)//私服",
    value: "14_hei_private_clothes_question.png",
  },
  {
    label: "14 疑問(考える)//私服(目の下に隈、虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_question_dark_circles_non_highlight.png",
  },

  {
    label: "14 動揺(戸惑う)(おどおど)(焦り)(あわてる)//制服",
    value: "14_hei_school_uniform_disturbance.png",
  },
  {
    label: "14 動揺(戸惑う)(おどおど)(焦り)(あわてる)//私服",
    value: "14_hei_private_clothes_disturbance.png",
  },

  {
    label: "14 照れ(恥ずかしい)//制服",
    value: "14_hei_school_uniform_feel_shy.png",
  },
  {
    label: "14 照れ(恥ずかしい)//私服",
    value: "14_hei_private_clothes_feel_shy.png",
  },

  {
    label: "14 キリッ//制服",
    value: "14_hei_school_uniform_confident_face.png",
  },
  {
    label: "14 キリッ//私服",
    value: "14_hei_private_clothes_confident_face.png",
  },

  { label: "14 青ざめる(恐怖)//制服", value: "14_hei_school_uniform_fear.png" },
  {
    label: "14 青ざめる(恐怖)//私服",
    value: "14_hei_private_clothes_fear.png",
  },
  {
    label: "14 青ざめる(恐怖)//私服(目の下に隈、虚ろな目(ハイライト無し))",
    value: "14_hei_private_clothes_fear_dark_circles_non_highlight.png",
  },

  {
    label: "14 耐える(難しい顔)//制服",
    value: "14_hei_school_uniform_endure.png",
  },
  {
    label: "14 耐える(難しい顔)//私服",
    value: "14_hei_private_clothes_endure.png",
  },

  { label: "14 必死//私服", value: "14_hei_private_clothes_desperately.png" },

  { label: "14 眠り//私服", value: "14_hei_private_clothes_sleep.png" },
  {
    label: "14 眠り//私服(目の下に隈)",
    value: "14_hei_private_clothes_sleep_dark_circles_non_highlight.png",
  },
  { label: "14 まぶたを腫らして寝てる//私服", value: "14_hei_private_clothes_sleep_with_swollen_eyelids.png" },

  { label: "14 苦し気//私服", value: "14_hei_private_clothes_painful.png" },

  { label: "14 真剣//私服", value: "14_hei_private_clothes_earnest.png" },

  { label: "14 呆れ//私服", value: "14_hei_private_clothes_ridiculous.png" },

  { label: "17 ノーマル//制服", value: "17_hei_school_uniform_normal.png" },
  { label: "17 ノーマル//私服", value: "17_hei_private_clothes.png" },

  { label: "17 笑う//私服", value: "17_hei_private_clothes_happy.png" },

  { label: "17 微笑み//私服", value: "17_hei_private_clothes_smile.png" },

  {
    label: "17 満面の笑み//私服",
    value: "17_hei_private_clothes_big_smile.png",
  },

  {
    label: "17 目をつむる//私服",
    value: "17_hei_private_clothes_close_eyes.png",
  },

  {
    label: "17 驚き(ぽかんとする)//私服",
    value: "17_hei_private_clothes_surprise.png",
  },

  {
    label: "17 泣きそう//私服",
    value: "17_hei_private_clothes_about_to_cry.png",
  },

  { label: "17 泣く//私服", value: "17_hei_private_clothes_cry.png" },

  { label: "17 疑問//制服", value: "17_hei_school_uniform_question.png" },
  { label: "17 疑問(考える)//私服", value: "17_hei_private_clothes_question.png" },

  { label: "17 照れ//制服", value: "17_hei_school_uniform_feel_shy.png" },
  { label: "17 照れ(恥ずかしい)//私服", value: "17_hei_private_clothes_feel_shy.png" },

  {
    label: "17 動揺(戸惑う)(おどおど)(焦り)//制服",
    value: "17_hei_school_uniform_disturbance.png",
  },
  {
    label: "17 動揺(戸惑う)(おどおど)(焦り)//私服",
    value: "17_hei_private_clothes_disturbance.png",
  },

  { label: "17 必死//私服", value: "17_hei_private_clothes_desperately.png" },

  { label: "17 キリッ(怒り)//制服", value: "17_hei_school_uniform_anger.png" },
  { label: "17 キリッ(怒り)//私服", value: "17_hei_private_clothes_anger.png" },

  {
    label: "17 悲しげ(しょんぼり)//制服",
    value: "17_hei_school_uniform_sadness.png",
  },
  {
    label: "17 悲しげ(しょんぼり)//私服",
    value: "17_hei_private_clothes_sadness.png",
  },

  {
    label: "17 青ざめる(恐怖)//私服",
    value: "17_hei_private_clothes_fear.png",
  },

  { label: "17 耐える//私服", value: "17_hei_private_clothes_endure.png" },

  { label: "17 呆れ//私服", value: "17_hei_private_clothes_ridiculous.png" },

  { label: "17 真剣//私服", value: "17_hei_private_clothes_earnest.png" },
];

const honCharaFaceOptions = [
  { label: "ノーマル//制服", value: "hon_school_uniform_normal.png" },
  { label: "ノーマル//私服", value: "hon_private_clothes_normal.png" },

  { label: "笑う//制服", value: "hon_school_uniform_happy.png" },
  { label: "笑う//私服", value: "hon_private_clothes_happy.png" },
  { label: "笑う//ジャージ", value: "hon_tracksuit_happy.png" },

  { label: "にかっと笑う//制服", value: "hon_school_uniform_more_happy.png" },
  { label: "にかっと笑う//私服", value: "hon_private_clothes_more_happy.png" },

  { label: "怒る//制服", value: "hon_school_uniform_anger.png" },
  { label: "怒る//私服", value: "hon_private_clothes_anger.png" },
  {
    label: "怒る//私服（顔上半分影）",
    value: "hon_private_clothes_anger_half_face_shadow.png",
  },

  { label: "ムッとする(不機嫌)//制服", value: "hon_school_uniform_grumpy.png" },
  {
    label: "ムッとする(不機嫌)//私服",
    value: "hon_private_clothes_grumpy.png",
  },

  { label: "照れ//制服", value: "hon_school_uniform_feel_shy.png" },

  { label: "驚き//私服", value: "hon_private_clothes_surprise.png" },

  { label: "諦め//制服", value: "hon_school_uniform_give_up.png" },
  { label: "諦め//私服", value: "hon_private_clothes_give_up.png" },

  { label: "苦し気//私服", value: "hon_private_clothes_painful.png" },

  { label: "呆れ//制服", value: "hon_school_uniform_ridiculous.png" },

  { label: "必死//私服", value: "hon_private_clothes_desperately.png" },
];

const holanCharaFaceOptions = [
  { label: "ノーマル//制服", value: "holan_school_uniform_normal.png" },
  { label: "ノーマル//私服", value: "holan_private_clothes_normal.png" },
  { label: "ノーマル//ジャージ", value: "holan_tracksuit_normal.png" },

  { label: "笑う//制服", value: "holan_school_uniform_happy.png" },
  { label: "笑う//私服", value: "holan_private_clothes_happy.png" },

  { label: "ムッとする//制服", value: "holan_school_uniform_grumpy.png" },
  { label: "ムッとする//私服", value: "holan_private_clothes_grumpy.png" },

  { label: "怒り(凄む)//制服", value: "holan_school_uniform_anger.png" },
  { label: "怒り(凄む)//私服", value: "holan_private_clothes_anger.png" },

  { label: "甘える//制服", value: "holan_school_uniform_spoiled.png" },

  { label: "残念//制服", value: "holan_school_uniform_regret.png" },

  {
    label: "弱々しい(悲しげ)(おそるおそる)(泣きそう)//制服",
    value: "holan_school_uniform_sadness.png",
  },
  {
    label: "弱々しい(悲しげ)(おそるおそる)(泣きそう)//私服",
    value: "holan_private_clothes_sadness.png",
  },

  {
    label: "難しい顔(考え込む)//制服",
    value: "holan_school_uniform_ponder.png",
  },
  {
    label: "難しい顔(考え込む)//私服",
    value: "holan_private_clothes_ponder.png",
  },

  { label: "動揺//制服", value: "holan_school_uniform_disturbance.png" },

  {
    label: "驚き(ぽかんとする)//制服",
    value: "holan_school_uniform_surprise.png",
  },
  {
    label: "驚き(ぽかんとする)//私服",
    value: "holan_private_clothes_surprise.png",
  },

  {
    label: "焦り(狼狽える)//制服",
    value: "holan_school_uniform_impatience.png",
  },
  {
    label: "焦り(狼狽える)//私服",
    value: "holan_private_clothes_impatience.png",
  },

  { label: "真剣//私服", value: "holan_private_clothes_earnest.png" },

  { label: "目をつむる//制服", value: "holan_school_uniform_close_eyes.png" },

  { label: "呆れ//制服", value: "holan_school_uniform_ridiculous.png" },
  { label: "呆れ//私服", value: "holan_private_clothes_ridiculous.png" },

  { label: "呆気にとられる//私服", value: "holan_private_clothes_be_taken_aback.png" },

  {
    label: "開き直る//私服",
    value: "holan_private_clothes_become_defiant.png",
  },

  {
    label: "言葉につまる//私服",
    value: "holan_private_clothes_speechless.png",
  },
];

const ryuuCharaFaceOptions = [
  { label: "ノーマル//制服", value: "ryuu_school_uniform_normal.png" },
  { label: "ノーマル//私服", value: "ryuu_private_clothes_normal.png" },
  { label: "ノーマル//ジャージ", value: "ryuu_tracksuit_normal.png" },

  { label: "笑う//制服", value: "ryuu_school_uniform_happy.png" },
  { label: "笑う//私服", value: "ryuu_private_clothes_happy.png" },

  { label: "怒る(厳しい顔)//制服", value: "ryuu_school_uniform_anger.png" },
  { label: "怒る(厳しい顔)//私服", value: "ryuu_private_clothes_anger.png" },

  { label: "驚き//制服", value: "ryuu_school_uniform_surprise.png" },
  { label: "驚き//私服", value: "ryuu_private_clothes_surprise.png" },

  { label: "呆れ//制服", value: "ryuu_school_uniform_ridiculous.png" },
  { label: "呆れ//ジャージ", value: "ryuu_tracksuit_ridiculous.png" },
  { label: "呆れ//私服", value: "ryuu_private_clothes_ridiculous.png" },

  { label: "焦り//制服", value: "ryuu_school_uniform_impatience.png" },
  { label: "焦り//私服", value: "ryuu_private_clothes_impatience.png" },

  { label: "難しい顔//制服", value: "ryuu_school_uniform_ponder.png" },
  { label: "難しい顔//私服", value: "ryuu_private_clothes_ponder.png" },

  { label: "疑問//制服", value: "ryuu_school_uniform_question.png" },
  { label: "疑問//私服", value: "ryuu_private_clothes_question.png" },

  {
    label: "心配(申し訳なさそう)//制服",
    value: "ryuu_school_uniform_worry.png",
  },
  {
    label: "心配(申し訳なさそう)//私服",
    value: "ryuu_private_clothes_worry.png",
  },
];

const ranCharaFaceOptions = [
  { label: "ノーマル//制服", value: "ran_school_uniform_normal.png" },
  { label: "ノーマル//私服", value: "ran_private_clothes_normal.png" },
  { label: "ノーマル//ジャージ", value: "ran_tracksuit_normal.png" },

  { label: "笑う//私服", value: "ran_private_clothes_happy.png" },

  { label: "呆れる//制服", value: "ran_school_uniform_ridiculous.png" },

  { label: "心配//制服", value: "ran_school_uniform_worry.png" },

  { label: "戸惑い//私服", value: "ran_private_clothes_bewildered.png" },

  { label: "疑問//私服", value: "ran_private_clothes_question.png" },

  { label: "怒り//私服", value: "ran_private_clothes_anger.png" },
];

const fenhonCharaFaceOptions = [
  { label: "ノーマル//制服", value: "fenhon_school_uniform_normal.png" },
  { label: "ノーマル//私服", value: "fenhon_private_clothes_normal.png" },

  { label: "笑う//制服", value: "fenhon_school_uniform_happy.png" },
  { label: "笑う//私服", value: "fenhon_private_clothes_happy.png" },
  { label: "満面の笑み//制服", value: "fenhon_school_uniform_big_smile.png" },

  {
    label: "満面の笑み//制服(装飾品:ゴゴゴ的な黒いアレ)",
    value: "fenhon_school_uniform_big_smile_dark_aura.png",
  },

  { label: "怒る(厳しい顔)//制服", value: "fenhon_school_uniform_anger.png" },
  { label: "怒る(厳しい顔)//私服", value: "fenhon_private_clothes_anger.png" },

  { label: "呆れ//制服", value: "fenhon_school_uniform_ridiculous.png" },
  { label: "呆れ//私服", value: "fenhon_private_clothes_ridiculous.png" },
];

const paiCharaFaceOptions = [
  {
    label: "ノーマル//私服//ゴーグルあり",
    value: "pai_private_clothes_goggles_normal.png",
  },

  {
    label: "凄む//私服//ゴーグルあり",
    value: "pai_private_clothes_goggles_threaten.png",
  },

  {
    label: "呆れ//私服//ゴーグルあり",
    value: "pai_private_clothes_goggles_ridiculous.png",
  },

  {
    label: "難しい顔//私服//ゴーグルあり",
    value: "pai_private_clothes_goggles_ponder.png",
  },

  { label: "影", value: "pai_private_clothes_shadow.png" },
  { label: "ノーマル//私服", value: "pai_private_clothes_normal.png" },
  { label: "ノーマル//ジャージ", value: "pai_private_clothes_normal.png" },

  { label: "笑う//私服", value: "pai_private_clothes_happy.png" },

  { label: "目をつむる//私服", value: "pai_private_clothes_close_eyes.png" },

  { label: "呆れ//私服", value: "pai_private_clothes_ridiculous.png" },

  {
    label: "凄む(怒り、不機嫌、難しい顔)//私服",
    value: "pai_private_clothes_threaten.png",
  },

  { label: "疑問(考える)//私服", value: "pai_private_clothes_question.png" },

  { label: "真剣//私服", value: "pai_private_clothes_earnest.png" },

  {
    label: "悲しげ(弱々しく、心配)//私服",
    value: "pai_private_clothes_sadness.png",
  },

  { label: "焦り//私服", value: "pai_private_clothes_impatience.png" },

  { label: "驚き//私服", value: "pai_private_clothes_surprise.png" },
];

const zuuCharaFaceOptions = [
  { label: "15 ノーマル", value: "15_zuu_private_clothes_normal.png" },
  { label: "15 疑問(考える)", value: "15_zuu_private_clothes_question.png" },
  { label: "15 笑う", value: "15_zuu_private_clothes_happy.png" },
  { label: "15 満面の笑み", value: "15_zuu_private_clothes_big_smile.png" },
  {
    label: "15 不機嫌(怒り)(厳しい顔)(自棄)",
    value: "15_zuu_private_clothes_grumpy.png",
  },
  {
    label: "15 不機嫌(怒り)(厳しい顔)(自棄)(目の下に隈)",
    value: "15_zuu_private_clothes_grumpy_dark_circles.png",
  },
  { label: "15 焦り", value: "15_zuu_private_clothes_impatience.png" },
  { label: "15 呆れ", value: "15_zuu_private_clothes_ridiculous.png" },
  {
    label: "15 疲れきった様子。目の下に隈。",
    value: "15_zuu_private_clothes_exhausted_dark_circles.png",
  },
  { label: "15 照れ", value: "15_zuu_private_clothes_feel_shy.png" },
  { label: "15 驚き", value: "15_zuu_private_clothes_surprise.png" },

  { label: "15 真剣", value: "15_zuu_private_clothes_earnest.png" },
  { label: "15 難しい顔", value: "15_zuu_private_clothes_ponder.png" },
  { label: "15 必死", value: "15_zuu_private_clothes_desperately.png" },

  { label: "18 ノーマル", value: "18_zuu_private_clothes_normal.png" },
  {
    label: "18 ノーマル(髪の毛切った)",
    value: "18_zuu_private_clothes_normal_cut_hair.png",
  },
  { label: "18 不機嫌(怒り)", value: "18_zuu_private_clothes_anger.png" },
  { label: "18 笑う", value: "18_zuu_private_clothes_happy.png" },
  {
    label: "18 笑う(髪の毛切った)",
    value: "18_zuu_private_clothes_happy_cut_hair.png",
  },
  {
    label: "18 悪そうに笑う",
    value: "18_zuu_private_clothes_grin_wickedly.png",
  },
  { label: "18 満面の笑み", value: "18_zuu_private_clothes_big_smile.png" },
  { label: "18 焦り", value: "18_zuu_private_clothes_impatience.png" },
  { label: "18 しょんぼり", value: "18_zuu_private_clothes_sadness.png" },
  {
    label: "18 驚き(ぽかんとする)",
    value: "18_zuu_private_clothes_surprise.png",
  },
  { label: "18 照れ", value: "18_zuu_private_clothes_feel_shy.png" },
];

const chonCharaFaceOptions = [
  { label: "ノーマル", value: "chon_private_clothes_normal.png" },
  { label: "笑う", value: "chon_private_clothes_happy.png" },
  { label: "弱々しく笑う", value: "chon_private_clothes_smile_weakly.png" },
  { label: "満面の笑み", value: "chon_private_clothes_big_smile.png" },
  { label: "疑問", value: "chon_private_clothes_question.png" },
  { label: "眉を下げる", value: "chon_private_clothes_down_eyebrows.png" },
  { label: "怒り", value: "chon_private_clothes_anger.png" },
  { label: "焦り(あわてる)", value: "chon_private_clothes_impatience.png" },
  { label: "呆れ", value: "chon_private_clothes_ridiculous.png" },
  { label: "真剣", value: "chon_private_clothes_earnest.png" },
  { label: "凄む", value: "chon_private_clothes_threaten.png" },
  { label: "眠り", value: "chon_private_clothes_sleep.png" },
  { label: "寝ぼけ", value: "chon_private_clothes_sleepiness.png" },
  { label: "驚き", value: "chon_private_clothes_surprise.png" },
  { label: "不満", value: "chon_private_clothes_dissatisfaction.png" },
  { label: "不機嫌", value: "chon_private_clothes_grumpy.png" },
];

const fuyiCharaFaceOptions = [
  { label: "影", value: "fuyi_private_clothes_shadow.png" },
  { label: "ノーマル", value: "fuyi_private_clothes_normal.png" },
  { label: "怒り(凄む)(厳しい顔)", value: "fuyi_private_clothes_anger.png" },
  {
    label: "苛立たし気(鬱陶しそう)",
    value: "fuyi_private_clothes_irritated.png",
  },
  { label: "考える", value: "fuyi_private_clothes_question.png" },
  { label: "笑う", value: "fuyi_private_clothes_happy.png" },
  { label: "爆笑", value: "fuyi_private_clothes_big_smile.png" },
  { label: "嘲笑", value: "fuyi_private_clothes_scoff.png" },
  { label: "呆れ", value: "fuyi_private_clothes_ridiculous.png" },
];

const innCharaFaceOptions = [
  { label: "ノーマル", value: "inn_private_clothes_normal.png" },
  { label: "笑う", value: "inn_private_clothes_happy.png" },
  { label: "不機嫌(ぐずる)", value: "inn_private_clothes_grumpy.png" },
  {
    label: "舌を出す。あっかんべー",
    value: "inn_private_clothes_ridicule.png",
  },
];

const backgroundOptions = [
  { label: "-", value: "" },
  { label: "1_学園（中庭・昼）", value: "school_courtyard_daytime.png" },
  { label: "2_学校の中庭、夜", value: "school_courtyard_nighttime.png" },
  { label: "3_保健室、昼", value: "health_office_daytime.png" },
  { label: "4_教室、昼", value: "classroom_daytime.png" },
  { label: "5_職員室、朝", value: "staff_room_morning.png" },
  { label: "6_学校・廊下、昼", value: "school_corridor_daytime.png" },
  { label: "7_図書室、夕", value: "library_evening.png" },
  {
    label: "8_寮の部屋(似たものがあればそれでOK)、夜",
    value: "dorm_room_nighttime.png",
  },
  { label: "9_女子トイレ、夜", value: "girls_restroom_nighttime.png" },
  { label: "10_豪華な部屋、昼", value: "lavish_room_daytime.png" },
  {
    label: "11_灰達のアジト、夜(事務所風)",
    value: "ashes_hideout_nighttime_office-like.png",
  },
  { label: "12_灰達の事務所、昼間", value: "ashes_office_daytime.png" },
  { label: "13_灰組の事務所、朝", value: "ashes_group_office_morning.png" },
  {
    label: "14_灰組の事務所、深夜",
    value: "ashes_group_office_late_night.png",
  },
  {
    label: "15_灰組のアジト、廊下、朝",
    value: "ashes_hideout_corridor_morning.png",
  },
  { label: "16_橙の部屋、昼", value: "orange_room_daytime.png" },
  {
    label: "17_灰組のアジト、黒の部屋、夜",
    value: "ashes_hideout_black_room_nighttime.png",
  },
  { label: "18_灰組の事務「室」、昼", value: "ashes_group_office_daytime.png" },
  { label: "19_喫茶店、昼", value: "cafe_daytime.png" },
  { label: "20_廃墟、昼", value: "ruins_daytime.png" },
  { label: "21_ビル街、昼", value: "downtown_daytime.png" },
  { label: "22_ビル街、夕", value: "downtown_evening.png" },
  { label: "23_ビル街、夜", value: "downtown_nighttime.png" },
  { label: "24_薄暗い路地裏、昼", value: "dim_alley_daytime.png" },
  { label: "25_どこかの屋敷、夜", value: "mansion_nighttime.png" },
  {
    label: "26_海辺の倉庫？(ドラム缶がいっぱい置いてある所)、夜",
    value: "seaside_warehouse_nighttime_filled_with_barrels.png",
  },
  { label: "27_平野、青空", value: "plain_blue_sky.png" },
  { label: "28_大きな校舎、昼", value: "large_school_building_daytime.png" },
  {
    label: "29_化学準備室、昼",
    value: "chemistry_preparation_room_daytime.png",
  },
  {
    label: "30_化学準備室、夕",
    value: "chemistry_preparation_room_evening.png",
  },
  { label: "31_学校の屋上、昼", value: "school_rooftop_daytime.png" },
  { label: "32_体育館裏、昼", value: "behind_the_gymnasium_daytime.png" },
  { label: "33_学校のグラウンド、朝", value: "school_ground_morning.png" },
  { label: "34_新幹線の中、朝", value: "inside_the_bullet_train_morning.png" },
  { label: "35_なんか観光地的な所、昼", value: "touristy_place_daytime.png" },
  { label: "36_土産屋、昼", value: "souvenir_shop_daytime.png" },
  {
    label: "37_宿の中の部屋、夜(明かり付き)",
    value: "room_inside_the_inn_nighttime_with_lights_on.png",
  },
  {
    label: "38_宿の中の部屋、夜(明かり無し)",
    value: "room_inside_the_inn_nighttime_with_lights_off.png",
  },
  {
    label: "39_灰組の事務所、夜(明かり無し)",
    value: "ashes_office_nighttime_with_lights_off.png",
  },
  {
    label: "40_灰組のアジト、黒の部屋、夜(明かり無し)",
    value: "ashes_hideout_black_room_nighttime_with_lights_off.png",
  },
  {
    label: "41_黒（くろ）",
    value: "black.png",
  },
];

const seSoundOptions = [
  { label: "-", value: "" },
  { label: "アスファルトの上を歩く", value: "Walking on asphalt.mp3" },
  { label: "ガラスが割れる", value: "Glass breaking.mp3" },
  { label: "ドラゴンが火を吐く", value: "A dragon breathing fire.mp3" },
  { label: "バタンと倒れる", value: "Falling with a thud.mp3" },
  { label: "学校のチャイム", value: "School bell.mp3" },
  { label: "打撃", value: "Impact.mp3" },
  { label: "机をドンと叩く", value: "Slapping the desk with a thud.mp3" },
  { label: "風に揺れる草木", value: "Grass and trees swaying in the wind.mp3" },
  { label: "黒板に書く音", value: "Chalk screeching.mp3" },
  { label: "木々のざわめき", value: "Rustling of leaves.mp3" },
];

const bgmSoundOptions = [
  { label: "-", value: "" },
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
  { label: "-", value: "" },
  { label: "取り消す", value: "none" },
  {
    label:
      "写真。黒以外は薄い影(黒(くろ)ではなく限りなく薄い緑や水色。背景:ビル街、昼、青空)黒は17歳時のもの。",
    value: "still1.png",
  },
  {
    label:
      "机をバンッと叩き立ち上がる黄。混乱する黒。周りで笑っている学園組。背景:喫茶店",
    value: "still2.png",
  },
  {
    label:
      "ぽかんとする黒(中央)、薄く笑う白(中央)、ぽかんとする橙、紫(ミニキャラ)、冷静な灰(ミニキャラ)。背景:灰組の事務所",
    value: "still3.png",
  },
  {
    label:
      "おろおろする黒(中央)、苦笑いをする紅(中央)、周りに怒りながら立ち上がる緑と青、黄、にこやかに笑うが後ろにゴゴゴと黒い影がある桃。背景:喫茶店",
    value: "still4.png",
  },
  {
    label:
      "中央に大きく黒の額に口付けする橙。後ろに茶化す様子の紫、白、灰のミニキャラ",
    value: "still5.png",
  },
  {
    label:
      "中央におろおろ黒、笑いながら顔に汗の橙、周りに戦闘態勢の学園組。背景：喫茶店",
    value: "still6.png",
  },
  {
    label:
      "紫が黒の顎を指で持ち上げながらキス（背景は描いても描かなくてもいいです。一応背景は灰組の事務所です）",
    value: "still7.png",
  },
  { label: "白が黒の事を抱き締める（背景は上記と同じ）", value: "still8.png" },
  {
    label: "黄と手を取り合う黒（背景はｒｙ。一応背景は黄龍会の部屋）",
    value: "still9.png",
  },
  {
    label:
      "中央に学級日誌的な物を抱える黒とチョークを持つ灰。後ろに各キャラクターのドタバタ。無理そうなら黒と灰だけでいいです。その場合は平野と青空を背景に。",
    value: "still10.png",
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
function DeleteChoiceOption(scenario: Scenario, index: number) {
  scenario.choiceOptions = (scenario.choiceOptions as ChoiceOption[]).filter(
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
  if (/\.json$/.test(form.value.chapterFilePath)) {
    filename = form.value.chapterFilePath;
  } else {
    filename = `${form.value.chapterFilePath}.json`;
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
  width: 100%;
  max-width: 400px;
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
