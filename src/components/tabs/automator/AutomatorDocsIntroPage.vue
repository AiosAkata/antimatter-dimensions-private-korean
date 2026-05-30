<script>
export default {
  name: "AutomatorDocsIntroPage",
};
</script>

<template>
  <div>
    반물질 차원 오토메이터에 오신 것을 환영합니다!
    <br>
    <br>
    이 페이지는 오토메이터로 할 수 있는 모든 것에 대한 광범위한 개요를 제공하는 소개 페이지입니다.
    다양한 기능에 대한 구체적인 세부사항은 방법 설명 또는 관련 탭에서 찾을 수 있습니다.
    <br>
    <br>
    <b>스크립팅 언어:</b> 오토메이터는 특정 게임 동작을 수행하기 위해 사용자 정의 스크립팅 언어를 사용합니다. <div class="fas fa-list c-automator-button-icon" />를 클릭하여 사용 가능한 명령 목록을 확인하세요. <div class="fas fa-book c-automator-button-icon" /> 페이지에서 다양한 값의 약칭으로 상수를 정의할 수도 있습니다.
    <br>
    <br>
    <b>레이아웃:</b> 오토메이터 자체는 두 개의 절반으로 나뉩니다. 왼쪽 절반에는 스크립트와 실행 시작, 정지 및 반복에 대한 컨트롤이 있고 오른쪽 절반에는 오토메이터 정보가 있습니다. 오른쪽 상단 모서리의 <div class="fas fa-expand-arrows-alt c-automator-button-icon" />를 클릭하면 오토메이터가 전체 브라우저 페이지를 차지하도록 확장되어 더 쉽게 편집할 수 있습니다.
    <br>
    <br>
    <b>편집기 모드:</b> 오토메이터 스크립트를 작성할 수 있는 두 가지 편집기가 있습니다 - 블록 기반 편집기(기본값)와 텍스트 기반 편집기. 왼쪽 절반의 오른쪽 상단 모서리에 있는 스위치로 두 편집기 유형을 전환할 수 있습니다. 오류가 있는 스크립트는 두 모드 간에 제대로 변환되지 않을 수 있으며 스크립트의 일부가 삭제될 수 있습니다.
    <br>
    <br>
    <b>스크립트 작성:</b> 두 번째 버튼 행의 드롭다운을 사용하여 여러 스크립트 간을 전환하거나 새 스크립트를 만들 수 있습니다. <div class="fas fa-edit c-automator-button-icon" />과 <div class="fas fa-trash c-automator-button-icon" /> 버튼으로 현재 스크립트의 이름을 바꾸거나 삭제할 수 있습니다. 오토메이터는 항상 편집할 스크립트를 최소한 하나 포함하며 마지막 스크립트를 삭제하면 자동으로 새로운 빈 스크립트가 만들어집니다.
    <br>
    <br>
    <b>스크립트 작성:</b> 블록 편집기의 스크립트는 블록 탭 <div class="fas fa-cubes c-automator-button-icon" />으로 이동하여 작성하고 텍스트 편집기의 스크립트는 왼쪽 절반에 텍스트 상자로 입력합니다. 두 편집기 모드 모두에서 템플릿 생성기 <div class="fas fa-file-code c-automator-button-icon" />에서 미리 만들어진 더 작은 스크립트를 사용할 수 있습니다. <div class="fas fa-arrow-rotate-left c-automator-button-icon" /> 또는 <div class="fas fa-arrow-rotate-right c-automator-button-icon" />을 사용하거나 해당 핫키를 사용하여 제한된 수의 편집을 실행 취소하거나 재실행할 수 있습니다. 편집 기록은 스크립트를 전환, 변환 또는 삭제할 때 지워집니다.
    <br>
    <br>
    <b>디버깅:</b> 스크립트를 수정하기 위한 두 가지 주요 도구는 스크립트를 실행할 수 없을 때 사용하는 오류 로그 <div class="fas fa-exclamation-triangle c-automator-button-icon" />과 스크립트가 실행되지만 예상한 대로 작동하지 않을 때 사용하는 이벤트 로그 <div class="fas fa-eye c-automator-button-icon" />입니다.
    <br>
    <br>
    <b>가져오기/내보내기:</b> 오토메이터 스크립트는 <div class="fas fa-file-export c-automator-button-icon" />과 <div class="fas fa-file-import c-automator-button-icon" /> 버튼을 각각 사용하여 텍스트 형식으로 내보내고 가져올 수 있습니다. 원하는 경우 추가 확장 내보내기 옵션 <div class="fas fa-window-restore c-automator-button-icon" />에 접근할 수도 있습니다.
    <br>
    <br>
    <b>스크립트 저장:</b> 스크립트 변경사항은 모든 경우에 컴퓨터에 즉시 저장되지 않습니다. 자세한 내용은 오토메이터 방법 설명 항목을 확인하세요. 또한 오토메이터 패널 위에 표시된 두 개의 문자 제한이 있어 지연을 줄입니다.
  </div>
</template>

<style scoped>
.c-automator-button-icon {
  padding: 0.3rem 0.8rem;
  width: 3.3rem;
  border: var(--var-border-width, 0.2rem) solid var(--color-automator-controls-border);
  border-radius: var(--var-border-radius, 0.3rem);
  color: var(--color-automator-docs-font);
  background-color: var(--color-automator-controls-inactive);
}
</style>
