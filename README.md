# Интернет магазин SHOP
Интернет магазин, состящий из двух модулей: 
- админ-панель, доступ к которой идет по простой авторизации (без `JWT`, `Auth2.0`)
  (где можно управлять категориями, товаров по подходу `CRUD` (создание, чтение, изменение, удаление)) 
- вебморда, где любой пользователь может добавить товар в корзину, и оформить его. Оформленный заказ отправляется в `telegram-bot`

## Frontend
Реализован на основе сборки `CRA`, с использованием пакетов: `axios`, `react-router-dom`
В качестве стейтменеджера используется `Context API` & `LocalStorage API`

## Backend
Реализован на основе фремворка `Express` (бд, представлена в виде JSON-файлов)

## Установка и деплой:
1. Установка всех зависимостей
Выполнить из корня `npm run full-install`
2. Запуск для разработки:
    - Отредактировать файл `.ENV` ./frontend/.env (Добавить `REACT_APP_BACKEND=http://localhost:9090`)
    - Выполнить `npm run dev`
3. Запуск для прода (т.к равзворачивал на бесплатном хосте с ограниченными ресурсами), то нужно фронт отдельно билдеть локально
    - `cd ./frontend`
    - по необходимости поменять файл .env
    - `npm run build`
