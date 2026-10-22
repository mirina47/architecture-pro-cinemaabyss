 ## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# О проекте

**proxy-service** — реализует функционал для постепенного перехода от монолита к микросервисам:

- Маршрутизация запросов между монолитом и микросервисами
- Поддержка постепенного перехода с процентной маршрутизацией
- Действует как фасад для всей системы