export type Character = {
  name: string;
  id: string;
  imagePath: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  // "more-left" | "left" | "center" | "right" | "more-right";
  effect: "" | "enter-right" | "enter-left" | "leave-right" | "leave-left";
};

export type Scenario = {
  name: string;
  message: string;
  backgroundImagePath: string;
  bgmPath: string;
  sePath: string;
  talkingCharacterId: string;
  characters: Character[];
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
