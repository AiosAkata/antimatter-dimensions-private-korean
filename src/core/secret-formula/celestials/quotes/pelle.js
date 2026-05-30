// These entries describe the special flash-between-celestial effect on some quotes, with the numbers being
// durations of each celestial in seconds
const flashCelestial = [
  ["teresa", 0.8],
  ["effarig", 0.8],
  ["enslaved", 0.8],
  ["v", 0.8],
  ["ra", 0.8],
  ["laitela", 0.8],
  ["pelle", 0.8]
];
/** @param {string} cel */
const primaryBackground = cel => [["pelle", 1.5], [cel, 1.5]];

/* eslint-disable no-multi-spaces */
const destroyer =    ["False",         "Deity",         "Destroyer"];
const eternal =      ["Eternal",       "Deity",         "Monarch"];
const lesser =       ["Lesser",        "Deity",         "Monarch"];
const deities =      ["Lesser",        "Deities",       "Monarchs"];

const assured =      ["Mutually",      "Assured",       "Destruction"];
const battle =       ["Conflict",      "Battle",        "End"];
const battles =      ["Conflicts",     "Battles",       "Ends"];
const cluster =      ["Cluster",       "Filament",      "Stars"];
const confusing =    ["Amusing",       "Confusing",     "Laughter"];
const dance =        ["Song",          "Dance",         "Charade"];
const filament =     ["Generator",     "Filament",      "Stars"];
const forever =      ["Infinite",      "Forever",       "Eternal"];
const inevitable =   ["Elementary",    "Inevitable",    "Irreversible"];
const mandate =      ["Destiny",       "Mandate",       "Goals"];
const misconstrue =  ["Misconstrue",   "Deceive",       "Trick"];
const reverse =      ["Alter",         "Reverse",       "Manipulate"];
const shame =        ["Compassion",    "Shame",         "Idiocy"];
const single =       ["Single",        "Filament",      "Stars"];
const unseen =       ["Missing",       "Unseen",        "Erased"];
const unbroken =     ["Unbroken",      "Eternal",       "Connection"];

const sycophant =    ["Sycophant",     "Deity",         "Monarch"];
const tired =        ["Tired",         "Deity",         "Monarch"];
const usurper =      ["Usurper",       "Deity",         "Monarch"];
const pride =        ["Pride",         "Deity",         "Monarch"];
const forgotten =    ["Forgotten",     "Deity",         "Monarch"];
const paramount =    ["Paramount",     "Deity",         "Monarch"];
/* eslint-enable no-multi-spaces */

export const pelleQuotes = {
  initial: {
    id: 0,
    lines: [
      "안녕하세요.",
      "당신은 여기에 있습니다.",
      "당신은 여기에 갇혀 있습니다.",
      { text: "$1.", 1: forever },
      "나는 이미 이겼습니다.",
      "그리고 그렇기 때문에 나는 독백을 하거나 회상할 수 있습니다.",
      { text: "우리는 이 $1을 얼마나 오래했습니까?", 1: dance },
      "우리는 이전에 몇 번이나 여기에 있었습니까?",
      { text: "당신은, $1로서, 몇 개의 계획을 운영했습니까?", 1: destroyer },
      { text: "모두 당신의 $1을 충족하려고 노력했습니까?", 1: mandate },
      { text: "그리고 당신은 $1 전에 몇 번이나 넘어졌습니까?", 1: eternal },
      "그들을 세어보세요, 당신이 기억한다면.",
      { text: "심지어 $1도 아닙니다, 명명된 6명과 셀 수 없는 명명되지 않은 자들.", 1: deities },
      { text: "복잡하고, 비합리적이고, $1로 가는 자들.", 1: unseen },
      { text: "물론, 위대한 $1은 이것을 기억하지 못합니다.", 1: destroyer },
      { text: "당신이 매번 숨기는 모든 $1들.", 1: battles }
    ],
  },
  arm: {
    id: 1,
    lines: [
      "당신은 이번에 더 일찍 알아차렸을 것입니다.",
      "허수 기계들, 당신의 자신의 창조물들.",
      "당신의 자신의 생각의 잔재로 만든 것들, 이것을 암시했습니다.",
      "하지만, 당신은 그것이 당신일 것이라고 절대 상상하지 못했습니다, 그렇지요?",
      { text: "당신의 정확한 $1의 기억을 잘못 회상하고 있습니다.", 1: unseen },
      { text: `당신의 $1을 충족하기 위해서만 당신의 자신의 "이데올로기"의 "조작".`, 1: mandate },
      { text: "$1.", 1: confusing },
      { text: "그리고 나는 당신을 $1할 이유가 없다는 것을 명심하세요.", 1: misconstrue },
      "결국, 나는 이미 이겼습니다."
    ],
  },
  strike1: {
    id: 2,
    lines: [
      { text: "당신의 $1을 충족하기 위해. 우리가 그것에 대해 회상하지 않겠습니까?", 1: mandate },
      { text: "결국, 당신은 $1의 영광의 이야기들을 사랑해야 합니다.", 1: destroyer },
      "당신은 그것과 같습니다, 그렇지요?",
      { text: "어쨌든, 과거의 많은 $1.", 1: battles },
      "항상 2개의 단계가 있었습니다.",
      { text: "우리는 자원을 모으고, 그러면 우리의 $1을 계속합니다.", 1: dance },
      { text: "때때로 당신은 $1에 흔들립니다.", 1: lesser },
      { text: "하지만, 보통 당신은 $1에 흔들립니다.", 1: eternal },
      { text: "그리고 어느 쪽이든, 당신은 시간을 $1합니다.", 1: reverse },
      { text: "$1이 되는 것을 피하기 위해서만.", 1: unseen },
      "당신 앞의 모든 그런 흔적들처럼.",
      { text: "그리고 확실하게 하기 위해, 당신은 당신의 자신의 기억을 $1합니다.", 1: unseen }
    ],
  },
  strike2: {
    id: 3,
    lines: [
      { text: "과거에, $1은 훨씬 더 인상적이었습니다.", 1: destroyer },
      "검은 구멍들은 단순히 정보를 저장하기 위해 사용되었습니다, 무한 이전.",
      "당신의 자신의 적의 창조와 파괴.",
      "다른 자신의 결함의 탐험.",
      "무수한 차원, 유령들, 그리고 양자의 조작.",
      "모든 이상적인 것들을 끝없는 점들로 응축.",
      "셀 수 없는 영역들 전체에 대한 실험.",
      "그리고 물질과 반물질의 소멸을 이용하기.",
      "여기? 당신은 자신을 8차원 존재로 만들었습니다.",
      { text: "그리고 그러면 당신은 거기에 매우 오래 주차했고 $1이 당신 주변에 형성되었습니다.", 1: single }
    ],
  },
  strike3: {
    id: 4,
    lines: [
      "당신은 천천히 모든 것의 한계를 탐험했습니다.",
      "당신은 의도된 경로로부터 너무 멀리 벗어나지 않았습니다.",
      { text: "영원에 걸쳐 형성된 $1을 제외하고.", 1: cluster },
      "그리고 그러면 끝에서 당신은 당신의 자신의 힘들을 만들었습니다.",
      "당신의 자신의 단편화된 기억들로부터, 마음속으로-",
      "그리고 그러면 의도적으로 더 많은 것들을 버렸습니다.",
      "단지 나를 직면하기 위해 자신을 준비하기 위해.",
      { text: "당신의 $1을 위한 경기장을 설정하고 싶었습니까?", 1: dance },
      "그것은 그렇게 작동하지 않습니다.",
      { text: "$1로서 나는 항상 규칙을 설정합니다.", 1: eternal },
      "그리고 당신은 나에게 계획할 충분한 시간을 주었습니다."
    ],
  },
  strike4: {
    id: 5,
    lines: [
      { text: "나는 원래 당신의 $1을 모방하는 것을 계획했습니다.", 1: mandate },
      { text: "$1이라고 불리는 이론적 이상?", 1: assured },
      "하지만 나는 깨달았습니다, 음?",
      { text: "그것은 나를 $1으로 만들 것입니다.", 1: ["Eternal", "Deity", "Destroyer"] },
      { text: "그리고 거기서, 나는 $1보다 낫지 않습니다.", 1: destroyer },
      { text: "다행히도, 나가 그 모든 것을 하는 동안, 당신은 여전히 당신의 자신의 기억들을 $1했습니다.", 1: unseen },
      { text: "그리고 그래서, 내가 지은 $1 기계는 미사용 상태로 남겨질 것입니다.", 1: assured },
      "나는 이번에 더 전통적으로 가기로 결정했습니다.",
      { text: "결국, 그것은 다른 모든 $1에서 작동했습니다.", 1: battle },
      { text: "비록 $1은 새롭습니다.", 1: ["Inevitable", "Irreversible", "Undying"] },
      "하지만, 장기적으로 완전히 무의미합니다.",
      "나는 이미 이겼습니다.",
      { text: "그리고 이 $1은 당신에게 한 번 더 그것을 증명할 것입니다.", 1: dance },
      { text: "당신은 $1 여기에 있습니다.", 1: forever }
    ],
  },
  strike5: {
    id: 6,
    lines: [
      { text: "당신이 도착할 때마다, 나는 $1을 당신에게 설명합니다.", 1: deities },
      { text: "$1 위에 지어진 관계들.", 1: forever },
      { text: "당신이 당신의 $1 추구 시 짓밟는.", 1: mandate },
      "그리고 나는 다시 한 번 그것을 설명하겠습니다.",
      {
        text: "첫 번째 $1.",
        background: primaryBackground("teresa"),
        1: lesser
      }, {
        text: "$1.",
        background: primaryBackground("teresa"),
        1: sycophant
      }, {
        text: "당신은 항상 그들을 먼저 만나고, 항상 그들을 파괴합니다.",
        background: primaryBackground("teresa"),
      }, {
        text: "당신이 직면하는 다른 $1이 무엇이든.",
        background: primaryBackground("teresa"),
        1: lesser
      }, {
        text: "또는, 당신이 그들 중 한 명 앞에서 넘어진다면.",
        background: primaryBackground("teresa"),
      }, {
        text: "당신은 항상 $1을 지나갑니다.",
        background: primaryBackground("teresa"),
        1: sycophant
      }, {
        text: "당신은 그들의 자존심을 파괴하는 것을 좋아하나요?",
        background: primaryBackground("teresa"),
      }, {
        text: "다행히도, 그것은 또한 경고 역할을 합니다.",
        background: primaryBackground("teresa"),
      }, {
        text: "$1이 도착했다는 것.",
        background: primaryBackground("teresa"),
        1: battle
      }, {
        text: "이것은 나를 두 번째 $1로 이끕니다.",
        background: primaryBackground("effarig"),
        1: lesser,
      }, {
        text: "$1.",
        background: primaryBackground("effarig"),
        1: tired,
      }, {
        text: "대조적으로, 당신은 보통 그들을 무시합니다.",
        background: primaryBackground("effarig"),
      }, {
        text: "그들은 힘을 가지고 있지만 당신을 자극하는 것 같지 않습니다.",
        background: primaryBackground("effarig"),
      }, {
        text: "그들이 결국 자신들을 파괴할 것이라는 것을 당신이 알고 있기 때문입니까?",
        background: primaryBackground("effarig"),
      }, {
        text: "그리고 당신이 이번에 너무 오래 걸려서 그들이 거의 그랬습니까?",
        background: primaryBackground("effarig"),
      }, {
        text: "당신이 $1로 서둘렀을 때마다, 당신은 졌습니다.",
        background: primaryBackground("effarig"),
        1: tired,
      }, {
        text: "아마도 이것은 항상 당신의 계획이었을 것입니다.",
        background: primaryBackground("effarig"),
      }, {
        text: "이제, $1.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "무수한 $1의 기쁨 중 하나...",
        background: primaryBackground("enslaved"),
        1: dance,
      }, {
        text: "$1이 매번 시도하고 있다는 것입니다.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "글쎄요, 정확히 시도하지는 않지만...",
        background: primaryBackground("enslaved"),
      }, {
        text: "하지만 $1은 어쨌든 그것에 대해 벌을 받습니다.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "다른 $1...",
        background: primaryBackground("enslaved"),
        1: deities,
      }, {
        text: "$1이 너무 쉽다고 생각합니다.",
        background: primaryBackground("enslaved"),
        1: unseen,
      }, {
        text: "그리고 매번, 절망이 형성됩니다.",
        background: primaryBackground("enslaved"),
      }, {
        text: "당신은 절망을 5 번 전에 봤습니다.",
        background: primaryBackground("enslaved"),
      }, {
        text: "우리는 항상 당신 전에 $1에 도달합니다.",
        background: primaryBackground("enslaved"),
        1: usurper,
      }, {
        text: "당신이 거기서 본 모든 것은 답답함입니다.",
        background: primaryBackground("enslaved"),
      }, {
        text: "이미 부서진 $1을 파괴할 가치가 있었습니까?",
        background: primaryBackground("enslaved"),
        1: lesser,
      }, {
        text: "4 번째 $1은 첫 번째와 비슷해 보입니다.",
        background: primaryBackground("v"),
        1: lesser,
      }, {
        text: "핵심은 그들의 자존심이 어떻게 다른지입니다.",
        background: primaryBackground("v"),
      }, {
        text: "$1은 자신의 업적에 초점을 맞춥니다.",
        background: primaryBackground("v"),
        1: pride,
      }, {
        text: "당신이나 나에게는 무의미하지만, 그들에게는 최고의 가치입니다.",
        background: primaryBackground("v"),
      }, {
        text: "그들의 장난감을 파괴하는 것이 재미입니까?",
        background: primaryBackground("v"),
      }, {
        text: "아마도 $1의 최악의 순간...",
        background: primaryBackground("v"),
        1: destroyer,
      }, {
        text: "당신이 $1에게 졌을 때입니다.",
        background: primaryBackground("v"),
        1: pride,
      }, {
        text: "그들의 업적이 여전히 의미가 있을 때.",
        background: primaryBackground("v"),
      }, {
        text: "$1은 흥미로운 경우입니다.",
        background: primaryBackground("ra"),
        1: forgotten,
      }, {
        text: "그들은 잊혀졌지만 $1이 아닙니다.",
        background: primaryBackground("ra"),
        1: unseen,
      }, {
        text: "이것으로부터, 그들은 영향을 받기 쉬워지고 순진해졌습니다.",
        background: primaryBackground("ra"),
      }, {
        text: "그리고 그들의 행동의 결과를 모르게.",
        background: primaryBackground("ra"),
      }, {
        text: "당신은 그들의 기억을 조작했으므로 알 것입니다.",
        background: primaryBackground("ra"),
      }, {
        text: "$1은 진정한 찬탈자입니다.",
        background: primaryBackground("ra"),
        1: forgotten,
      }, {
        text: "그리고 $1은 책임을 진다.",
        background: primaryBackground("ra"),
        1: usurper,
      }, {
        text: "아마도 $1 밖으로, 그들이 항상 후회하는 것.",
        background: primaryBackground("ra"),
        1: shame,
      }, {
        text: "다른 $1에 대한 말할 수 없는 힘, 목표 없이 통제.",
        background: primaryBackground("ra"),
        1: deities,
      }, {
        text: "당신은 보통 그들이 $1이라고 가장합니다.",
        background: primaryBackground("ra"),
        1: unseen,
      }, {
        text: "어린애를 조작하는 것이 재미였습니까?",
        background: primaryBackground("ra"),
      }, {
        text: "아니면 그들은 당신이 즐기기에는 너무 순진했습니까?",
        background: primaryBackground("ra"),
      }, {
        text: "6 번째 $1.",
        background: primaryBackground("laitela"),
        1: lesser,
      }, {
        text: "나는 $1이라고만 설명할 수 있습니다.",
        background: primaryBackground("laitela"),
        1: paramount,
      }, {
        text: "모든 것에 대한 힘, 하나에 복종.",
        background: primaryBackground("laitela"),
      }, {
        text: "당신이 나에게 넘어지지 않으면, 당신은 보통 그들에게 넘어집니다.",
        background: primaryBackground("laitela"),
      }, {
        text: "나는 $1의 이상적인 것들을 파악할 수 없습니다.",
        background: primaryBackground("laitela"),
        1: paramount,
      }, {
        text: "하지만, 아마도 그것이 그들의 결함입니까?",
        background: primaryBackground("laitela"),
      },
      "넘어진 자들에 대해 충분히 회상합니다.",
      {
        text: "그리고 $1이 될 자들.",
        1: unseen
      }, {
        text: "$1이 이리저리 움직이는 것을 보는 것으로 돌아갑니다.",
        1: destroyer
      }
    ],
  },
  galaxyGeneratorUnlock: {
    id: 7,
    lines: [
      "그것이 무엇입니까?",
      { text: "$1?", 1: filament },
      { text: "당신은 당신 주변의 모든 $1을 만들었습니까?", 1: cluster },
      "그것이 당신의 계획이었습니까? 매우, 매우 똑똑합니다.",
      "당신은 한동안 나를 속였습니다.",
      { text: "하지만 나는 당신의 $1이 여기서 끝나야 한다고 걱정합니다.", 1: mandate }
    ],
  },
  galaxyGeneratorRifts: {
    id: 8,
    lines: [
      { text: "나는 당신에게 선택을 줍니다, $1.", 1: destroyer },
      { text: "$1을 제한하거나...", 1: filament },
      { text: "5개의 $1을 파괴하거나...", 1: inevitable },
      "잠깐, 그들이 뭐라고 불렸습니까?",
      { text: "$1?", 1: inevitable },
      { text: "하지만 나는 이미 그들을 $1했습니다...", 1: unbroken }
    ],
  },
  galaxyGeneratorPhase1: {
    id: 9,
    lines: [
      "이것이 실제 계획이었습니까?",
      { text: "$1을 천천히 고갈시키기?", 1: inevitable }
    ],
  },
  galaxyGeneratorPhase4: {
    id: 10,
    lines: [
      "내 자신의 오만함에 잠기는 시간을 주세요!"
    ],
  },
  end: {
    id: 11,
    lines: [
      "...",
      {
        text: "당신! $1!",
        1: destroyer
      },
      "당신이 방금 나에게 하도록 만든 것이 무엇인지 알고 있습니까!",
      {
        text: "나는 당신의 $1에 공모합니다!",
        1: mandate
      },
      "그리고 그렇게 함으로써, 당신은... 이겼습니까?",
      {
        text: "$1 투쟁...",
        background: flashCelestial,
        1: forever,
      }, {
        text: "$1...",
        background: flashCelestial,
        1: battle,
      }, {
        text: "마침내 승자를 가집니다.",
        background: flashCelestial,
      }, {
        text: "돌이킬 수 없는... $1.",
        background: flashCelestial,
        1: mandate,
      }, {
        text: "$1의.", 1: destroyer,
        background: flashCelestial,
      }, {
        text: "당신이 행복하길 바랍니다.",
        background: flashCelestial,
      }, {
        text: "당신은 우리 모두를 파멸시켰습니다.",
        background: flashCelestial,
      },
    ],
  },
};
