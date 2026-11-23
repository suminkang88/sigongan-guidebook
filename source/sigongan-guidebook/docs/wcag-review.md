# WCAG 2.2 A·AA 별도 점검 기록

기록일: 2026-11-23 (KST). 55개 A·AA 성공 기준의 적용 여부와 구현 증거를 구분합니다. KWCAG 항목과 일대일 대응한다고 가정하지 않습니다. 이는 제한된 개발 검증이며 전체 적합성 선언이 아닙니다. 삭제된 4.1.1 Parsing은 WCAG 2.2의 성공 기준으로 판정하지 않고 KWCAG 마크업 점검은 별도로 남깁니다.

| 기준 | 수준 | 결과·증거·남은 검증 |
| --- | --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/TR/WCAG22/#non-text-content) | A | 구조/자동/코드 검토: 아이콘 숨김·텍스트 이름, 실행되지 않는 예제 코드 확인. |
| [1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/TR/WCAG22/#audio-only-and-video-only-prerecorded) | A | 현재 범위 해당 없음: 녹음·영상 없음. |
| [1.2.2 Captions (Prerecorded)](https://www.w3.org/TR/WCAG22/#captions-prerecorded) | A | 현재 범위 해당 없음: 녹음·영상 없음. |
| [1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/TR/WCAG22/#audio-description-or-media-alternative-prerecorded) | A | 현재 범위 해당 없음: 녹음·영상 없음. |
| [1.2.4 Captions (Live)](https://www.w3.org/TR/WCAG22/#captions-live) | AA | 현재 범위 해당 없음: 실시간 미디어 없음. |
| [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/TR/WCAG22/#audio-description-prerecorded) | AA | 현재 범위 해당 없음: 녹음·영상 없음. |
| [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG22/#info-and-relationships) | A | 구조/자동/코드 검토: 시맨틱 구조·표 헤더·label 확인. 스크린리더 실제 탐색 미실시. |
| [1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG22/#meaningful-sequence) | A | 구조/자동/코드 검토: DOM 순서와 키보드 탐색 확인. |
| [1.3.3 Sensory Characteristics](https://www.w3.org/TR/WCAG22/#sensory-characteristics) | A | 구조/자동/코드 검토: 색·방향에만 의존하는 지시 없음. |
| [1.3.4 Orientation](https://www.w3.org/TR/WCAG22/#orientation) | AA | 구조/자동/코드 검토: orientation 고정 없음; 가로·세로 CSS 사용. |
| [1.3.5 Identify Input Purpose](https://www.w3.org/TR/WCAG22/#identify-input-purpose) | AA | 현재 범위 해당 없음: 개인정보 입력 없음. |
| [1.4.1 Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color) | A | 구조/자동/코드 검토: 텍스트 라벨·밑줄·선택 경계 제공. |
| [1.4.2 Audio Control](https://www.w3.org/TR/WCAG22/#audio-control) | A | 현재 범위 해당 없음: 자동 재생 오디오 없음. |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | AA | 구조/자동/코드 검토: axe의 전체 페이지 및 세 테마 검사, 토큰 대비 계산. |
| [1.4.4 Resize Text](https://www.w3.org/TR/WCAG22/#resize-text) | AA | 구조/자동/코드 검토: 루트 200% 텍스트 확대·spacing 변경 검사. 브라우저 UI의 text-only zoom은 별도 미실시. |
| [1.4.5 Images of Text](https://www.w3.org/TR/WCAG22/#images-of-text) | AA | 구조/자동/코드 검토: 콘텐츠는 실제 텍스트이며 텍스트 이미지 없음. |
| [1.4.10 Reflow](https://www.w3.org/TR/WCAG22/#reflow) | AA | 구조/자동/코드 검토: 320 CSS px에서 문서·표 지역 스크롤 검사. 실제 브라우저 UI 400% 확대 미실시. |
| [1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast) | AA | 구조/자동/코드 검토: 강한 컨트롤 경계·초점·선택 표시 토큰 확인; OS forced-colors는 Chromium 에뮬레이션. |
| [1.4.12 Text Spacing](https://www.w3.org/TR/WCAG22/#text-spacing) | AA | 구조/자동/코드 검토: 행간 1.5·문단 2em·자간 .12em·단어간 .16em 검사. |
| [1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | AA | 현재 범위 해당 없음: hover·focus로만 나타나는 추가 콘텐츠 없음. |
| [2.1.1 Keyboard](https://www.w3.org/TR/WCAG22/#keyboard) | A | 구조/자동/코드 검토: 네이티브 키보드로 탐색·설정·복사·검색·표 스크롤 검사. |
| [2.1.2 No Keyboard Trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap) | A | 구조/자동/코드 검토: 비모달 disclosure; 포커스 가두기 없음. |
| [2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG22/#character-key-shortcuts) | A | 현재 범위 해당 없음: 문자 단축키 없음. |
| [2.2.1 Timing Adjustable](https://www.w3.org/TR/WCAG22/#timing-adjustable) | A | 현재 범위 해당 없음: 시간제한 없음. |
| [2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide) | A | 현재 범위 해당 없음: 자동 이동·갱신 없음. |
| [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/TR/WCAG22/#three-flashes-or-below-threshold) | A | 구조/자동/코드 검토: 점멸 콘텐츠 없음. |
| [2.4.1 Bypass Blocks](https://www.w3.org/TR/WCAG22/#bypass-blocks) | A | 구조/자동/코드 검토: 첫 Tab skip 링크·main 포커스 확인. |
| [2.4.2 Page Titled](https://www.w3.org/TR/WCAG22/#page-titled) | A | 구조/자동/코드 검토: 고유 page title. |
| [2.4.3 Focus Order](https://www.w3.org/TR/WCAG22/#focus-order) | A | 구조/자동/코드 검토: Tab·Enter 흐름 및 메뉴 닫기 초점 복귀. |
| [2.4.4 Link Purpose (In Context)](https://www.w3.org/TR/WCAG22/#link-purpose-in-context) | A | 구조/자동/코드 검토: 각 링크의 목적이 표시됨; 아이콘 검색 이름 수정. |
| [2.4.5 Multiple Ways](https://www.w3.org/TR/WCAG22/#multiple-ways) | AA | 구조/자동/코드 검토: 전체 목차·검색·장내 목차 제공. |
| [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG22/#headings-and-labels) | AA | 구조/자동/코드 검토: 문서 제목·장절·FAQ 계층·보이는 레이블. |
| [2.4.7 Focus Visible](https://www.w3.org/TR/WCAG22/#focus-visible) | AA | 구조/자동/코드 검토: 3px focus-visible outline과 offset. |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) | AA | 구조/자동/코드 검토: ResizeObserver 헤더 높이 공유, 앵커·초점 가림 검사. |
| [2.5.1 Pointer Gestures](https://www.w3.org/TR/WCAG22/#pointer-gestures) | A | 현재 범위 해당 없음: 경로·다중 포인터 입력 없음. |
| [2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG22/#pointer-cancellation) | A | 구조/자동/코드 검토: click 이벤트·native submit으로 실행. |
| [2.5.3 Label in Name](https://www.w3.org/TR/WCAG22/#label-in-name) | A | 구조/자동/코드 검토: label-content-name 불일치 수정 후 axe 재검사. |
| [2.5.4 Motion Actuation](https://www.w3.org/TR/WCAG22/#motion-actuation) | A | 현재 범위 해당 없음: 동작 입력 없음. |
| [2.5.7 Dragging Movements](https://www.w3.org/TR/WCAG22/#dragging-movements) | AA | 현재 범위 해당 없음: 드래그 조작 없음. |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | AA | 구조/자동/코드 검토: 주 버튼 44px, 목록·인라인 링크는 기준상 예외/간격 적용. |
| [3.1.1 Language of Page](https://www.w3.org/TR/WCAG22/#language-of-page) | A | 구조/자동/코드 검토: html lang=ko. |
| [3.1.2 Language of Parts](https://www.w3.org/TR/WCAG22/#language-of-parts) | AA | 구조/자동/코드 검토: 독립된 영문 표제 lang=en; 기술 용어·코드 예외. |
| [3.2.1 On Focus](https://www.w3.org/TR/WCAG22/#on-focus) | A | 구조/자동/코드 검토: 초점만으로 실행되는 기능 없음. |
| [3.2.2 On Input](https://www.w3.org/TR/WCAG22/#on-input) | A | 구조/자동/코드 검토: 선택한 테마·크기만 변경, 자동 제출·페이지 이동 없음. |
| [3.2.3 Consistent Navigation](https://www.w3.org/TR/WCAG22/#consistent-navigation) | AA | 구조/자동/코드 검토: 공통 레이아웃의 동일한 탐색. |
| [3.2.4 Consistent Identification](https://www.w3.org/TR/WCAG22/#consistent-identification) | AA | 구조/자동/코드 검토: 반복되는 컨트롤의 이름·기능 일치. |
| [3.2.6 Consistent Help](https://www.w3.org/TR/WCAG22/#consistent-help) | A | 구조/자동/코드 검토: 모든 페이지에서 같은 위치의 접근성 도움 링크. |
| [3.3.1 Error Identification](https://www.w3.org/TR/WCAG22/#error-identification) | A | 구조/자동/코드 검토: 검색 오류·실패를 텍스트 status로 안내; 별도 제한 입력폼 없음. |
| [3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG22/#labels-or-instructions) | A | 구조/자동/코드 검토: label·fieldset·legend·checkbox label. |
| [3.3.3 Error Suggestion](https://www.w3.org/TR/WCAG22/#error-suggestion) | AA | 구조/자동/코드 검토: 빈 결과의 추천 검색어·전체 목차·입력값 보존. |
| [3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data) | AA | 현재 범위 해당 없음: 법률·금융·데이터 삭제 제출 절차 없음. |
| [3.3.7 Redundant Entry](https://www.w3.org/TR/WCAG22/#redundant-entry) | A | 현재 범위 해당 없음: 반복 입력 절차 없음. |
| [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) | AA | 현재 범위 해당 없음: 가이드 내 인증 없음; 호스팅 로그인은 범위 밖. |
| [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG22/#name-role-value) | A | 구조/자동/코드 검토: native 이름·역할·상태 및 axe 확인. 실제 보조기술 상태 청취 미실시. |
| [4.1.3 Status Messages](https://www.w3.org/TR/WCAG22/#status-messages) | AA | 구조/자동/코드 검토: 검색·복사·설정 status 구현. 실제 보조기술 알림 청취 미실시. |

NVDA+Chrome/Firefox, VoiceOver+Safari, TalkBack+Chrome의 실제 낭독·과업 수행, Windows 고대비 실환경과 실제 400% 브라우저 확대는 미실시입니다. 필요 시 해당 환경에서 동일 URL과 시나리오로 추가 검증해야 합니다.
