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
  splashMessage: string;
  message: string;
  voicePath: string;
  backgroundImagePath: string;
  bgmPath: string;
  sePath: string;
  talkingCharacterId: string;
  characters: Character[];
  isCharacterAllKill: boolean;
  isStopBGM: boolean;
};

export type Chapter = {
  fileName: string;
  title: string;
  chapterNo: number;
  backgroundImagePath: string;
  bgmPath: string;
  nextChapter: string;
  keepScene: boolean;
  scenario: Scenario[];
};
