# Twosun Test Project (NestJS + TypeORM + Docker MySQL + Swagger)

## 실행 방법
1. 저장소 클론
```bash
git clone https://github.com/xoql2002/twosun_test_project.git
cd twosun_test_project
```
   
2. Docker DB 실행
```bash
docker-compose up -d
```

3. 의존성 설치
```bash
npm install
```

4. 빌드
```bash
npm run build
```

5. 초기 데이터 삽입(게시물 카테고리)
```bash
npm run seed
```

6. 개발 서버 실행
```bash
npm run start:dev
```

7. Swagger 활용 Api Test 진행
```
http://localhost:3000/api-docs
```


## 프로젝트 포함 항목
- **NestJS 백엔드 소스 코드** (`src/` 폴더)
- **초기 데이터 삽입 스크립트(게시물 카테고리)** (`src/seed.ts`)
- **Docker Compose MySQL 설정** (`docker-compose.yml`)
- **TypeORM 엔티티 및 데이터베이스 설정** (`ormconfig.ts`)
- **Project 의존성 관리** (`package.json`)
- **Project 컴파일 설정** (`tsconfig.json`)
- **Swagger 기반 API 문서** (`http://localhost:3000/api-docs`)
- **README.md** (본 파일)


## 기술 스택 및 선택 이유

- **NestJS** (구조적이고 확장 가능한 Node.js 백엔드 프레임워크, DI와 모듈 시스템 제공)
- **TypeORM** (TypeScript 기반 ORM, 엔티티 기반 데이터베이스 관리 용이)
- **MySQL** (관계형 데이터베이스, Docker 연동 용이)
- **Docker** (Docker Compose | 개발 환경 일관성 유지 및 DB 컨테이너화)
- **Swagger** (API 명세서 자동화 및 테스트 용이)


## 간략한 디렉토리 구조와 설명

```
twosun_test_project/
├─ src/
│ ├─ auth/ # 인증 API
│ ├─ categories/ # 카테고리 API
│ ├─ common/ # 공통 API (예외 처리)
│ ├─ entities/ # TypeORM 엔티티 정의
│ ├─ likes/ # 좋아요 API
│ ├─ posts/ # 게시물 API
│ ├─ retweets/ # 리트윗 API
│ ├─ users/ # 사용자 API
│ ├─ app.module.ts # 애플리케이션 모듈
│ ├─ main.ts # NestJS 엔트리 포인트
│ └─ seed.ts # 초기 데이터 삽입 스크립트 (게시물, 카테고리)
├─ docker-compose.yml # MySQL Docker 설정
├─ ormconfig.ts # TypeORM 엔티티 및 데이터베이스 설정
├─ package.json # Project 의존성 관리
├─ tsconfig.json # Project 컴파일 설정
└─ README.md # 본 파일
```


## 기본 엔드포인트
- POST /auth/register 회원가입
- POST /auth/login 로그인
- GET /users/:id 프로필 조회
- GET /categories 게시물 카테고리 목록 조회
- GET /posts 게시물 목록
- GET /posts/:id 게시물 상세 조회
- POST /posts/register 게시물 등록
- POST /posts/update 게시물 수정
- POST /posts/delete 게시물 삭제
- POST /likes/update 게시물 좋아요 기능


## API 명세서
- Swagger 참고(`http://localhost:3000/api-docs`)


## Repository 링크
`https://github.com/xoql2002/twosun_test_project.git`
