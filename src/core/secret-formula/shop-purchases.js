import { STEAM } from "@/env";

// NOTE: IF ANY COSTS ARE CHANGED HERE, THEY ALSO NEED TO BE CHANGED ON THE BACKEND TOO
export const shopPurchases = {
  dimPurchases: {
    key: "dimPurchases",
    cost: 30,
    description: "모든 반물질 차원 배율을 2배로 증가시킵니다. 영구적으로.",
    multiplier: purchases => Math.pow(2, purchases),
    formatEffect: x => `×${x > 1000 ? Notation.scientific.formatDecimal(new Decimal(x), 2) : x.toFixed(0)}`,
  },
  allDimPurchases: {
    key: "allDimPurchases",
    cost: 60,
    description: () => {
      const dims = ["Antimatter"];
      if (InfinityDimension(1).isUnlocked || PlayerProgress.eternityUnlocked()) dims.push("Infinity");
      if (PlayerProgress.eternityUnlocked()) dims.push("Time");
      return `모든 차원 배율을 2배로 증가시킵니다 (${makeEnumeration(dims)}; 32배까지 곱셈 방식). 영구적으로.`;
    },
    multiplier: purchases => (purchases > 4 ? 32 + (purchases - 5) * 2 : Math.pow(2, purchases)),
    formatEffect: x => `×${x.toFixed(0)}`,
  },
  IPPurchases: {
    key: "IPPurchases",
    cost: 40,
    description: "모든 출처의 무한 포인트 획득량을 2배로 증가시킵니다. (덧셈 방식)",
    multiplier: purchases => (purchases === 0 ? 1 : 2 * purchases),
    formatEffect: x => `×${x.toFixed(0)}`,
    isUnlocked: () => PlayerProgress.infinityUnlocked(),
    lockText: "Infinity",
  },
  replicantiPurchases: {
    key: "replicantiPurchases",
    cost: 60,
    description: "복제체 획득량을 50% 증가시킵니다. (덧셈 방식)",
    multiplier: purchases => (purchases === 0 ? 1 : 1 + 0.5 * purchases),
    formatEffect: x => `×${x.toFixed(1)}`,
    isUnlocked: () => Replicanti.areUnlocked || PlayerProgress.eternityUnlocked(),
    lockText: "Replicanti",
  },
  EPPurchases: {
    key: "EPPurchases",
    cost: 50,
    description: "모든 출처의 영원 포인트 획득량을 3배로 증가시킵니다. (덧셈 방식)",
    multiplier: purchases => (purchases === 0 ? 1 : 3 * purchases),
    formatEffect: x => `×${x.toFixed(0)}`,
    isUnlocked: () => PlayerProgress.eternityUnlocked(),
    lockText: "Eternity",
  },
  dilatedTimePurchases: {
    key: "dilatedTimePurchases",
    cost: 40,
    description: "팽창된 시간 획득량을 50% 증가시킵니다. (덧셈 방식)",
    multiplier: purchases => (purchases === 0 ? 1 : 1 + 0.5 * purchases),
    formatEffect: x => `×${x.toFixed(1)}`,
    isUnlocked: () => PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
    lockText: "Dilation",
  },
  RMPurchases: {
    key: "RMPurchases",
    cost: 60,
    description: "현실 기계 획득량을 100% 증가시킵니다. (덧셈 방식)",
    multiplier: purchases => purchases + 1,
    formatEffect: x => `×${x.toFixed(0)}`,
    isUnlocked: () => PlayerProgress.realityUnlocked(),
    lockText: "Reality",
  },
  smallTimeSkip: {
    key: "smallTimeSkip",
    cost: 10,
    description: "6시간 분량의 오프라인 생산량을 받습니다. (자동구매기는 최대 속도로 작동하지 않음)",
    instantPurchase: true,
    onPurchase: () => {
      shop.purchaseTimeSkip();
    }
  },
  bigTimeSkip: {
    key: "bigTimeSkip",
    cost: 20,
    description: "24시간 분량의 오프라인 생산량을 받습니다. (자동구매기는 최대 속도로 작동하지 않음)",
    instantPurchase: true,
    onPurchase: () => {
      shop.purchaseLongerTimeSkip();
    }
  },
  singleCosmeticSet: {
    key: "singleCosmeticSet",
    cost: 20,
    description: "원하는 글리프 코스메틱 세트 하나를 해금합니다",
    instantPurchase: true,
    onPurchase: () => {
      // The actual unlocks are handled in the ShopPurchaseData object, so we just show notifications here
      GameUI.notify.info(
        `"${GlyphAppearanceHandler.chosenFromModal.name}" 글리프 코스메틱 세트를 구매했습니다!`,
        10000);
      GlyphAppearanceHandler.chosenFromModal = null;
      GlyphAppearanceHandler.applyNotification();
    },
    isUnlocked: () => PlayerProgress.realityUnlocked(),
    lockText: "Reality",
  },
  allCosmeticSets: {
    key: "allCosmeticSets",
    cost: () => {
      // Both of these are also on the payment backend, which would need to be changed as well
      const baseCost = 420;
      const totalSets = Object.keys(GameDatabase.reality.glyphCosmeticSets).length;

      // Using this instead of the actual set count maintains consistency with the backend price,
      // at the cost of the frontend UI being wrong for cheated saves
      const currentSetCount = GlyphAppearanceHandler.expectedSetCount;
      return Math.floor(baseCost * (totalSets - currentSetCount) / totalSets);
    },
    description: "남은 모든 글리프 코스메틱 세트를 한번에 해금합니다",
    instantPurchase: true,
    onPurchase: () => {
      // The actual unlocks are handled in the ShopPurchaseData object, so we just show notifications here
      GameUI.notify.info(`모든 글리프 코스메틱 세트를 해금했습니다!`, 15000);
      GlyphAppearanceHandler.applyNotification();
    },
    isUnlocked: () => PlayerProgress.realityUnlocked(),
    lockText: "Reality",
  },
};

if (STEAM) {
  delete shopPurchases.allCosmeticSets;
}
