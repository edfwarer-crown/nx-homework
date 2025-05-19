# MSA API

MSA를 위해서 Monorepo로 구성된 프로젝트

husky를 통해서 stage에 있는 코드들의 lint, prettier를 실행한다. (package.json의 lint-staged 설정 참조)

# 규칙

---

### 파일 이름

<b>`{subject}.{type}.ts`</b>

### type 종류

_일반적인 종류는 포함하지 않았습니다._

| 타입         | 설명                 |
|------------|--------------------|
| producer   | Microservice의 컨트롤러 |
| service    | NestJS 서비스         |
| repo       | TypeORM 리포지토리      |
| config     | NestJS 설정 파일       |
| validation | NestJS 유효성 검사      |

---

# 프로젝트 설정하기

```bash
$ pnpm install
```

## 실행하기

```bash
# development
$ pnpm run start
```

## Docker Compose를 이용한 실행하기


```bash
# Run locally
DD_ENV=development SERVER_PORT=3000 SERVICE=auth SERVICE_NAME=auth-api docker compose up -d app
```

---

# [Prisma](https://www.prisma.io/)

- .env파일에 `DATABASE_URL=DATABASE_URL=mysql://{user_id}:{passwd}@{host_ip}:{port}/{database}` 추가 필요
- 혹은 명령어 실행 전에 `NODE_ENVIRONMENT`로 환경 설정

## 기본 Prisma 명령어

## DTO 생성

1. Prisma를 이용한 생성 (설정 파일은 prisma/schema.prisma 파일의 generate 설정 확인)
    1. [Prisma Generator NestJS DTO](https://github.com/Brakebein/prisma-generator-nestjs-dto)
    2. [Prisma DB Comments Generator](https://github.com/onozaty/prisma-db-comments-generator)

```bash
npx prisma generate
```

# 참고

[NestJS Decorator](https://docs.nestjs.com/custom-decorators#param-decorators)
 
# 비고 (진행예정)
1. user_config(사용자 설정) : 유저 편의를 위한 기능을 고려중 
2. user_device : 기기별 로그인 시 기기 인증 이벤트 구현 예정
3. batch를 이용해 보상 지급
4. 시간이 없어서 인증 관련 기능 밖에 구현하지 못함.
