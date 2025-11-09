# Vocab Quiz — Green v2

- 테스트 화면 + **전체 단어장(라이브러리)** 화면 제공
- 더 큰 글자와 버튼, 연한 초록 배경의 모던 UI
- GitHub Pages에 그대로 배포 가능

## 로컬 실행
- `index.html`을 브라우저로 실행
- `file://`에서 `fetch` 제한 시:
  ```bash
  python -m http.server 8080
  # 또는
  npx http-server . -p 8080
  ```

## 배포(GitHub Pages)
Settings → Pages → Deploy from a branch → `main` / root(`/`) → Save

## 데이터 편집
- `data/vocab.json`에서 테마와 단어를 추가/수정
- `"en"`/`"ko"`는 문자열 또는 문자열 배열(동의어) 가능

## 화면 구성
- **테스트**: 테마/모드 선택 → 무작위 출제 → 진행도 표시 → 결과/오답 재도전
- **전체 단어장**: 테마 필터 + 검색(영/한) → 테이블로 즉시 탐색
