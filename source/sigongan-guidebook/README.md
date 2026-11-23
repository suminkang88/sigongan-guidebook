# 시공간 웹 접근성 실무 가이드

Astro + TypeScript + MDX로 만든 한국어 정적 가이드북입니다. 사용자 첨부의 6개 장 본문·예시·표·FAQ·출처를 보존하고, 문서 탐색·한국어 검색·읽기 환경 설정을 제공합니다. 회사는 **시공간**, 대체텍스트 서비스는 **에이택**입니다.

현재는 공개 전 검토본입니다. 공개 Vercel 배포와 회사 도메인 수정은 수행하지 않았습니다. 검토용 Sites 호스팅은 소유자 전용으로 설정합니다.

## 요구 환경

- Node.js 24 LTS 권장 (Astro 7의 최소 지원: 22.23.4)
- npm 9.6.5 이상
- 의존성의 정확한 설치 버전은 `package-lock.json`에 고정

## 실행

```sh
npm ci
npm run build
npm run dev
```

터미널이 출력한 Local URL에서 `/ko/guide/`를 엽니다. 검색 인덱스는 렌더링된 HTML에서 생성하므로 콘텐츠를 편집한 뒤 `npm run build`로 다시 만드세요. `npm run dev`는 Astro 개발 서버입니다. 코드·구조 검증만 하려면 `npm run check`를 실행합니다.

최종 정적 산출물을 확인할 때는 다음을 실행합니다.

```sh
npm run build
npm run preview -- --port 4173
```

프리뷰의 루트는 `/ko/guide/`로 이동합니다. 서버는 이 명령을 실행하는 동안 동작합니다. 관리형 Codex 환경에서는 `sites-preview`가 서버를 소유하며 다른 서버를 병행하지 않습니다.

## 검증

프리뷰를 실행한 상태의 별도 터미널에서:

```sh
npm test
```

기본 검사 주소는 `http://127.0.0.1:4173`입니다. 다른 프리뷰 서버라면 `BASE_URL` 환경변수를 지정하세요. 테스트는 시스템 Chromium이 있으면 사용하고, 없으면 Playwright Chromium을 사용합니다.

```sh
npx playwright install chromium
npm test
```

- `npm run check`: 6개 MDX·메타·경로·고정 앵커·제외 대상 검증 → Astro/TypeScript 검사
- `npm run build`: check → 정적 빌드 → 원문/렌더링 487개 항목 대조 → 내부 링크·앵커·표 검증 → 검색 인덱스 64개 섹션 생성
- `npm test`: 탐색·검색·설정·저장소 차단·JS 비활성·표·복사·axe·화면 크기·시각 캡처
- `docs/review-log.md`: 실제 실행 결과와 수정·재검증·미실시 항목
- `docs/kwcag-review.md`, `docs/wcag-review.md`: 각각의 기준에 대한 별도 검토표

자동 검사 통과는 WCAG 전체 준수 또는 WA 인증을 뜻하지 않습니다. 보조기술 실기기·실제 브라우저 400% 확대는 미실시이며 공개 전 남은 검증입니다.

## Vercel 배포 준비

이 프로젝트는 정적 Astro 사이트이므로 SSR adapter·DB·서버 환경변수가 필요하지 않습니다.

1. 소스 폴더를 원하는 Git 저장소에 올리고 Vercel의 Import Project로 가져옵니다. 소스 ZIP을 풀어 사용해도 됩니다.
2. Framework Preset **Astro**, Node.js **24.x**, Build Command `npm run build`, Output Directory `dist`, Install Command `npm ci`를 사용합니다.
3. 먼저 별도의 검토 프로젝트 또는 브랜치에 배포하고 Vercel의 Deployment Protection 등으로 접근을 제한합니다. Preview라는 이름만으로 비공개가 보장되지는 않습니다. 실제 사용 가능한 보호 기능은 계정 요금제·설정을 확인하세요.
4. `/`, 6개 장의 직접 접속·새로고침, 3장 `#concise` 등 앵커, 검색, 없는 URL의 404를 확인합니다.
5. 검토 후에 공개 프로덕션 배포 여부를 결정합니다. 현재 `robots.txt`, robots meta 및 `vercel.json`의 `X-Robots-Tag`는 모두 noindex 상태입니다. 이는 검색 노출 방지이며 접근 제한 수단이 아닙니다.
6. 실제 도메인이 정해지면 `SITE_URL`을 설정해 다시 빌드합니다. 공개 승인 시 robots meta/header와 robots.txt를 검토하고 sitemap·OG URL을 추가합니다. 현재는 도메인 미정이므로 canonical을 임의의 회사 주소로 만들지 않았고 sitemap도 생성하지 않습니다.

`vercel.json`에는 `/` 리다이렉트만 있으며 광범위한 SPA rewrite가 없습니다. `/ko/guide/.../`의 trailing slash를 통일합니다. 기존 회사 사이트·DNS·Vercel 계정에는 변경하지 않았습니다. `.openai/hosting.json`은 비공개 검토용 Sites 설정이며 Vercel 빌드에는 사용하지 않습니다. 검토 자료의 `/review/` 폴더는 별도 패키징 시 산출물에만 추가하며 일반 `npm run build`의 공개 사이트에는 포함하지 않습니다.

## 콘텐츠 편집

- 본문: `src/content/guide/*.mdx`
- 그룹·순서·경로·탐색 제목: `src/data/navigation.json`
- 브랜드 URL: `src/data/brand.ts`
- 섹션 ID·목차: 각 MDX의 `sections`와 실제 H2/H3의 명시적 ID를 같이 관리
- 검색 인덱스: 빌드 후 HTML에서 생성; API 키·외부 검색 서버 불필요
- 설정 키: `sigongan-guide-preferences-v1` (이 키만 초기화)
- 체크 상태: 페이지 임시 상태이며 새로고침 시 초기화
- 내부 원문·편집 기록: `docs/` (정적 공개 폴더가 아님)

출처의 확인일은 원문인 2026-11-23을 유지합니다. 법적 의무·실무 권장·기관별 인증 조건을 구분하며 임의의 성능 수치·보장 문구를 추가하지 마세요. 로고 자산의 출처는 `docs/brand-assets.md`를 참고하고 Pretendard의 OFL 라이선스를 보존하세요.

## 후속 디자인 수정

시공간 심벌과 이름은 `src/components/BrandName.astro`, 에이택 로고는 `ServiceCallout.astro`에서 관리합니다. 이미지 파일은 `public/images/brand/`에 포함됩니다. Do/Don’t는 테두리·아이콘·가운뎃점을 제거하고 낮은 채도의 배경과 굵은 제목으로 조정했습니다. 접근성 안내에는 이용 예시를 추가했습니다. 검색의 정확한 규칙은 `docs/search-behavior.md`, 지정된 GitHub·Vercel 연결 절차는 `docs/github-vercel.md`를 참고하세요.
