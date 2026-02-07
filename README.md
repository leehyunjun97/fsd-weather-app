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
