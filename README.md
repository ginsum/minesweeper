# Minesweeper

이 프로젝트는 지뢰찾기를 할 수 있는 웹 페이지입니다. <br/>

## 주요 기능

- 지뢰찾기 게임을 할 수 있음
- 난이도를 조절할 수 있음(Beginner, Intermediate, Expert)
- 커스텀(가로, 세로, 지뢰) 가능
- 오른쪽 클릭으로 깃발 꽂기 가능
- 타이머 작동
- 첫 클릭으로 지뢰가 터지지 않음

## 기술 스택

- react
- typeScript
- redux-Toolkit
- tailwindCSS

## 폴더 구조

```
src/
├── components/
├── hooks/
├── constants/
├── lib/
├── redux/
└── type/
```

## 설치 및 시작

1.  설치

```
npm install
또는
yarn install
```

2.  개발서버 실행

```
npm run dev
또는
yarn dev
```

3. 브라우저 접속
   http://localhost:5173/

- 코드 개선 사항 (2024.11.04)
  redux/revealSlice와 lib/initBoard에 혼재되어 있는 로직들 정리하였습니다.
  새롭게 추가된 코드들은 다음과 같습니다.
  - useSetBoard - 보드 클릭이나 새로 시작, 깃발 꽂기 등으로 변화하는 보드 상태 및 로직 관리
  - useBoard - 사용자 행동에 따른 함수들 - 새로 시작 클릭, 보드 클릭, 커스텀 클릭 함수 관리
  - boardSlice - 보드의 너비,높이,지뢰수 및 게임난이도 상태 관리
  - statusSlice - 성공과 실패 상태 관리

\*\* 이 프로젝트는 PC 화면에 최적화 되어 있습니다.
