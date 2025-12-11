## Задание 1

[Диаграмма контейнеров системы CinemaAbyss («КиноБездна»)](schemas/C4_Container/CinemaAbyss_C4_Container.png)

## Задание 2

### 1. Proxy

[Dockerfile (proxy-service)](src/microservices/proxy/Dockerfile)

### 2. Kafka

[Результаты тестов](images/local-test-result.png)

[Топики Kafka](images/kafka-topics.png)

## Задание 3

### Proxy в Kubernetes

[Вызов https://cinemaabyss.example.com/api/movies](images/cinemaabyss-example-kubernetes.png)

[Логи event-service после вызова тестов](images/events-service-logs.png)

## Задание 4

### Helm

[Вызов https://cinemaabyss.example.com/api/movies](images/cinemaabyss-example-helm.png)

[Развертывание helm](images/helm.png)

# Задание 5

### Circuit Breaker 

[Работа circuit breaker (1)](images/circuit-breaker-1.png)

[Работа circuit breaker (2)](images/circuit-breaker-2.png)