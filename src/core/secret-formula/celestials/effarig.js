import { DC } from "../../constants";

export const effarigUnlocks = {
  adjuster: {
    id: 0,
    description: "조정 가능한 글리프 레벨 계수 가중치",
    cost: 1e7,
    onPurchased: () => {
      Effarig.quotes.unlockWeights.show();
      ui.view.tabs.reality.openGlyphWeights = true;
      Tab.reality.glyphs.show();
    }
  },
  glyphFilter: {
    id: 1,
    description: "글리프 필터링",
    cost: 2e8,
    onPurchased: () => {
      Effarig.quotes.unlockGlyphFilter.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.FILTER_SETTINGS;
    }
  },
  setSaves: {
    id: 2,
    description: "글리프 프리셋",
    cost: 3e9,
    onPurchased: () => {
      Effarig.quotes.unlockSetSaves.show();
      player.reality.showSidebarPanel = GLYPH_SIDEBAR_MODE.SAVED_SETS;
    }
  },
  run: {
    id: 3,
    description: "에파리그의 현실",
    cost: 5e11,
    onPurchased: () => {
      Effarig.quotes.unlockRun.show();
    }
  },
  infinity: {
    id: 4,
    label: "무한",
    get description() {
      return ` 복제체 상한선은 무한에 따라 배수됩니다
        무한은 최대 복제체 갤럭시를 증가시킵니다
        기본 무한 포인트 획득은 에파리그의 현실에서 ${format(DC.E200)}로 제한됩니다
        각 무한 포인트 배율 유형은 에파리그의 현실에서 ${format(DC.E50)}로 제한됩니다`;
    },
  },
  eternity: {
    id: 5,
    label: "영원",
    get description() {
      return ` 영원은 무한을 생성합니다
        무한 포인트는 더 이상 에파리그의 현실에서 제한되지 않습니다
        이름없는 자를 해금했습니다`;
    },
  },
  reality: {
    id: 6,
    label: "현실",
    get description() {
      return " 에파리그 글리프를 해금했습니다 (최대 1개를 장착할 수 있으며 일부 효과는 상호배타적입니다)";
    },
  }
};
