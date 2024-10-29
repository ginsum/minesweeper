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

- 참고 사항

* 처음엔 전역으로 상태를 처리할 일이 있을거라 생각하여 칸 클릭하여 열리는 로직을 redux로 처리하였는데, 전역 상태로 관리할 구조가 아니라서 수정하려고 하였으나 시간상 수정하지 못하여 아쉬움이 남습니다.

\*\* 이 프로젝트는 PC 화면에 최적화 되어 있습니다.
