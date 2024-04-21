export type Still = {
  no: number;
  imagePath: string;
};

export type ChoiceOption = {
  label: string;
  chapterFilePath: string;
};

export type Character = {
  name: string;
  id: string;
  imagePath: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  moveEffect: "" | "enter-right" | "enter-left" | "leave-right" | "leave-left";
  effect: "" | "dark-aura";
};

export type Scenario = {
  name: string;
  message: string;
  voicePath: string;
  splashMessage: string;
  talkingCharacterId: string;
  backCharacterId: string;

  choiceOptions: ChoiceOption[];
  characters: Character[];

  backgroundImagePath: string;

  still: Still;

  bgmPath: string;
  sePath: string;

  screenEffect: "" | "lose-color";

  isCharacterAllKill: boolean;
  isStopBGM: boolean;
  endingType: number;
  sleep: boolean;
  fadeOut: boolean;
  fadeOutBack: boolean;
  fadeIn: boolean;
  continueMessage: boolean;
};

export type Chapter = {
  chapterFilePath: string;
  nextChapterFilePath: string;
  title: string;
  chapterNo: number;
  backgroundImagePath: string;
  bgmPath: string;
  keepScene: boolean;
  scenario: Scenario[];
  stopBGM: boolean;
  isCharacterAllKill: boolean;
};
