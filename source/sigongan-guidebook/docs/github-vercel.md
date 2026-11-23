# GitHub·Vercel 연결

사용자가 지정한 대상은 GitHub `suminkang88/sigongan-guidebook` **공개** 저장소와 Vercel **개인 계정**입니다.

## GitHub

GitHub 연결에는 새 저장소 생성 권한이 없어 최초 요청이 거절되었고, 사용자가 직접 공개 저장소를 생성했습니다. 사용자의 공개 선택을 유지합니다. 업로드 시 Sites 전용 설정과 인증 정보는 제외합니다. 업로드 후 최종 커밋과 저장소 공개 범위를 확인합니다.

제공되는 소스 ZIP에는 `.openai`의 Sites 전용 설정과 Git 인증 정보가 포함되지 않습니다. `node_modules`, `dist`, 로컬 환경변수와 실행 중 만든 비밀값도 제외합니다. 폰트 파일과 OFL 라이선스는 포함합니다.

## Vercel

Vercel 계정 연결 후 개인 계정에서 GitHub 저장소를 Import합니다. GitHub 연동으로 가져올 때 Vercel이 해당 저장소에 접근할 수 있어야 합니다.

- Framework Preset: Astro
- Root Directory: 저장소 루트
- Node.js: 24.x
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`

첫 배포 후 루트 이동, 6개 장 직접 접속·새로고침, `#concise` 앵커, 검색, 설정, 404를 확인합니다. 최종 도메인이 정해지면 SITE_URL을 지정하고 다시 빌드합니다. 검색 노출용 robots·sitemap·OG 설정은 실제 공개 범위에 맞춰 검토합니다.

GitHub 저장소의 공개 범위와 Vercel 사이트의 접근 범위는 별도 설정입니다. 검토용 주소에 접근 제한이 필요하면 해당 계정에서 이용할 수 있는 Deployment Protection을 확인합니다. 이 문서의 절차 설명만으로 실제 배포가 완료되었다고 간주하지 않습니다.
