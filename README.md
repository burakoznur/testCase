1. Install your project code files.
2. Change Directory
3. Use "npm install" command.
4. Open "/config/index.js" file. Enter "mongoUrl" and "databaseName" fields in the database object. If you want the registration mail to send, edit the smtp object.
5. Run the queries in the "/database/migrations.sql" file in the database.
6. Now you can run the application with command "node app"

Example Api Curls

1. /signup

curl --location --request POST 'http://localhost:3500/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "unburakOznur",
    "email": "burakoznur93@gmail.com",
    "password": "123456"
}'

2. /login

curl --location --request POST 'http://localhost:3500/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "burakoznur93@gmail.com",
    "password": "123456"
}'

3. /my-profile

curl --location --request GET 'http://localhost:3500/my-profile' \
--header 'Content-Type: application/json' \
--data-raw '{
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0Q2FzZSIsInN1YiI6IjYxNmI0ZjQ4NmZmNmM3YmY2OThhMWZlMyIsImF1ZCI6InRlc3RDYXNlIiwiZXhwIjoxNjM0NTEyNjAyLCJuYmYiOjE2MzQ0MjI2MDIsImlhdCI6MTYzNDQyMjYwMn0.KkwZw323m-WozhkAn7DRJphssejH0p_awFaANepwGzEU0bCGOP_iHZl4o8bVwTS-fGAwnyX1mTsn7hJDLmqzduRGxJaHXmrT_nha1CyW1PvHScIMFl5u8zlfDc2wKnj5GVaKp3bBngv0UiZHFGM_-JzyLM_e14ypg6D-lEmDx88"
}'

4. /logout

curl --location --request DELETE 'http://localhost:3500/logout' \
--header 'Content-Type: application/json' \
--data-raw '{
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0Q2FzZSIsInN1YiI6IjYxNmI0ZjQ4NmZmNmM3YmY2OThhMWZlMyIsImF1ZCI6InRlc3RDYXNlIiwiZXhwIjoxNjM0NTEyNjAyLCJuYmYiOjE2MzQ0MjI2MDIsImlhdCI6MTYzNDQyMjYwMn0.KkwZw323m-WozhkAn7DRJphssejH0p_awFaANepwGzEU0bCGOP_iHZl4o8bVwTS-fGAwnyX1mTsn7hJDLmqzduRGxJaHXmrT_nha1CyW1PvHScIMFl5u8zlfDc2wKnj5GVaKp3bBngv0UiZHFGM_-JzyLM_e14ypg6D-lEmDx88"
}'

5. /code

curl --location --request GET 'http://localhost:3500/code' \
--header 'Content-Type: application/json' \
--data-raw '{
    "word": "Judy Stone"
}'