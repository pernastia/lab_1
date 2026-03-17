# Lab

## Backend:

Install dependencies:
npm install

Run dev server:
npm run dev

Server:
http://localhost:3000

## Endpoints

### Users

GET all:
curl http://localhost:3000/api/users

GET by id:
curl http://localhost:3000/api/users/1

POST:
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"name":"Ivan"}'

PUT:
curl -X PUT http://localhost:3000/api/users/1 \
-H "Content-Type: application/json" \
-d '{"name":"Oleg"}'

DELETE:
curl -X DELETE http://localhost:3000/api/users/1

### Tickets

GET all:
curl http://localhost:3000/api/tickets

GET by id:
curl http://localhost:3000/api/tickets/1

POST:
curl -X POST http://localhost:3000/api/tickets \
-H "Content-Type: application/json" \
-d '{"subject":"Test","author":"Ivan","priority":"High"}'

PUT:
curl -X PUT http://localhost:3000/api/tickets/1 \
-H "Content-Type: application/json" \
-d '{"subject":"Updated","author":"Oleg","priority":"Low"}'

DELETE:
curl -X DELETE http://localhost:3000/api/tickets/1

## Filtering / Pagination / Sorting

Filter:
curl "http://localhost:3000/api/tickets?author=ivan"

Pagination:
curl "http://localhost:3000/api/tickets?page=1&pageSize=2"

Sorting:
curl "http://localhost:3000/api/tickets?sortDir=desc"

Combined:
curl "http://localhost:3000/api/tickets?author=ivan&page=1&pageSize=2&sortDir=desc"

## Frontend:

1.Download or clone the repository
2.Open the "index.html" file in any browser