> **배포 주소 바로가기:** [https://fsd-weather-app-eta.vercel.app](https://fsd-weather-app-eta.vercel.app)

## 🚀 프로젝트 실행 방법
### 1. 저장소 클론 및 패키지 설치
터미널을 열고 아래 명령어를 순서대로 입력해주세요.

```bash
# 저장소 클론
git clone [본인의_깃허브_레포지토리_주소]

# 프로젝트 폴더로 이동
cd [프로젝트_폴더명]

# 의존성 패키지 설치
npm install
# 또는
yarn install
```

### 2. 환경 변수 설정
프로젝트 실행을 위해 API Key 설정이 필요합니다.
루트 경로에 `.env` 파일을 생성하고, 아래 양식에 맞춰 키를 입력해주세요.

```env
# .env 파일 예시

# 1. OpenWeatherMap API 키 (날씨 데이터 조회용)
# 발급처: https://openweathermap.org/api
VITE_OPENWEATHER_API_KEY=your_api_key_here

VITE_WEATHER_API_URL=https://api.openweathermap.org/data/3.0
VITE_GEO_API_URL=https://api.openweathermap.org/geo/1.0/reverse
VITE_COORDS_SEARCH_API_URL=https://nominatim.openstreetmap.org/search
```

### 3. 프로젝트 실행
설정이 완료되면 아래 명령어로 개발 서버를 실행합니다.

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 확인합니다.

## ✨ 구현한 기능
군더더기 없는 디자인과 핵심 날씨 정보 제공에 집중하여, 사용자가 필요한 정보를 가장 빠르게 확인할 수 있도록 구현했습니다.

### 1. 국내 행정구역 검색
* **빠르고 정확한 검색:** 대한민국 내의 시/군/구 및 동 단위까지 검색이 가능합니다.
* **검색어 하이라이팅:** 검색 결과 목록에서 사용자가 입력한 키워드를 시각적으로 강조하여 원하는 지역을 직관적으로 찾을 수 있습니다.

### 2. 핵심 기상 정보 제공
* **직관적인 현재 날씨:** 사용자가 가장 궁금해하는 **현재 기온**과 **당일 최저/최고 기온**을 메인 화면에 크게 배치했습니다.
* **시간대별 예보 :** 향후 24시간의 기온 변화 추이를 시간 단위로 제공하여, 하루의 일정을 계획하는 데 실질적인 도움을 줍니다.
* **데이터 시각화:** 복잡한 수치 대신 직관적인 아이콘과 깔끔한 타이포그래피로 정보를 표현했습니다.

### 3. 개인화된 즐겨찾기 관리
* **커스텀 별칭 기능:** 단순 행정구역명이 아닌 '우리집', '회사' 등 사용자가 기억하기 쉬운 이름으로 장소를 저장할 수 있습니다.
* **편리한 편집 기능:** 모달 UI를 통해 저장된 장소의 별칭을 수정하거나 목록에서 손쉽게 삭제할 수 있습니다.
* **영구 저장:** 브라우저를 종료해도 즐겨찾기 목록이 사라지지 않도록 데이터를 로컬에 안전하게 저장합니다.

### 4. 모던 UI
* **Black & Gray 테마:** 눈의 피로를 줄이고 정보의 가독성을 높이는 **Black/Gray 기반의 미니멀한 테마**를 적용했습니다.
* **반응형 레이아웃:** 모바일, 데스크탑 등 화면 크기에 맞춰 레이아웃이 유동적으로 최적화됩니다.
* **스켈레톤 로딩:** 데이터 로딩 시 깜빡임 현상을 방지하기 위해 스켈레톤 UI를 적용하여 부드러운 사용자 경험을 제공합니다.

## 🛠️ 3. 기술적 의사결정

프로젝트의 유지보수성과 성능 최적화를 위해 다음과 같은 기술 스택과 아키텍처를 선정했습니다.

### 1. FSD 아키텍처 도입
* **배경:** 일반적인 계층형 구조(`components/`, `hooks/`)는 프로젝트 규모가 커질수록 비즈니스 로직의 위치가 모호해지고, 파일 간의 의존성 파악이 어려웠습니다.
* **결정:** 기능을 기준으로 코드를 분리하는 **FSD 아키텍처**를 도입했습니다.
* **이유 및 효과:**
  * **명확한 의존성:** `shared` → `entities` → `features` → `pages`로 이어지는 단방향 의존성 규칙을 통해 코드 간의 결합도를 낮추고 응집도를 높였습니다.
  * **유지보수성:** 특정 기능 수정 시 관련된 파일들이 한 폴더에 모여 있어, 유지보수 효율을 극대화했습니다.

### 2. TanStack Query 도입
* **배경:** 날씨 데이터는 빈번하게 갱신될 필요가 없지만, 사용자의 잦은 조회로 인해 불필요한 네트워크 요청이 발생할 수 있습니다. `useEffect`만으로는 로딩, 에러, 캐싱 처리가 복잡했습니다.
* **결정:** 서버 상태 관리에 특화된 **TanStack Query**를 사용했습니다.
* **이유 및 효과:**
  * **캐싱 전략:** `staleTime`을 적절히 설정하여 중복된 API 호출을 방지하고, 서버 부하를 줄였습니다.
  * **선언적 코드:** `isLoading`, `isError` 등의 상태를 직관적으로 사용하여 비동기 로직의 복잡도를 40% 이상 낮췄습니다.

### 3. Zustand를 활용한 전역 상태 관리
* **배경:** '즐겨찾기' 기능은 여러 컴포넌트에서 공유되어야 하는 클라이언트 상태였습니다. Redux는 보일러플레이트가 과도하고, Context API는 렌더링 최적화가 까다로웠습니다.
* **결정:** 가장 직관적이고 경량화된 라이브러리인 **Zustand**를 선택했습니다.
* **이유 및 효과:**
  * **데이터 영속성:** `persist` 미들웨어를 활용하여 별도의 복잡한 로직 없이 **localStorage와의 동기화**를 구현했습니다.
  * **간결함:** 훅 기반의 API로 상태 업데이트 로직을 중앙에서 효율적으로 관리했습니다.

### 4. Tailwind CSS 기반의 스타일링
* **배경:** 별도의 CSS 파일을 관리하거나 클래스명을 고민하는 시간을 줄이고, 오로지 로직 구현에 집중할 수 있는 환경이 필요했습니다.
* **결정:** 유틸리티 퍼스트 CSS 프레임워크인 **Tailwind CSS**를 도입했습니다.
* **이유 및 효과:**
  * **생산성:** HTML 마크업 내에서 스타일을 즉시 적용하여 UI 개발 속도를 높였습니다.
  * **반응형 최적화:** `md:`, `lg:` 등의 접두사를 활용하여 모바일 및 다양한 디바이스 환경에 대응하는 레이아웃을 손쉽게 구현했습니다.

### 5. OpenStreetMap 활용
* **배경:** 날씨 정보를 조회하기 위해서는 사용자가 입력한 '지역명'을 API가 이해할 수 있는 '위도/경도'로 변환하는 지오코딩 과정이 필수적이었습니다.
* **결정:** Google, KAKAO Maps API 대신 오픈 소스 기반의 **OpenStreetMap**을 선택했습니다.
* **이유 및 효과:**
  * **비용 효율성:** 별도의 API 키 발급이나 카드 등록 절차 없이 무료로 사용할 수 있어, 사이드 프로젝트의 유지 비용을 '0원'으로 만들었습니다.
  * **개발 용이성:** REST API 방식이 직관적이고, 방대한 주소 데이터를 JSON 형식으로 손쉽게 받아올 수 있어 개발 생산성을 높였습니다.

## 🛠️ 4. 사용 기술

### **개발 환경**
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### **프론트엔드**
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

### **상태 관리**
<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-orange?style=for-the-badge&logo=react&logoColor=white">

### **스타일링**
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white">

### **API & 배포**
<img src="https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### **아키텍처**
* **FSD (Feature-Sliced Design)**
