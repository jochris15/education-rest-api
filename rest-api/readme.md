# REST API
Representational State Transfer Application Programming Interface is a set of rules that define how applications or devices can connect to and communicate with each other

[Dokumentasi REST API](https://www.restapitutorial.com/)
 
## HTTP Method
- POST = Create
- GET = Read
- PUT = Update keseluruhan
- PATCH = Update 1 kolom
- DELETE = Delete

## HTTP Status Codes
- 200 (OK)
- 201 (Created)
- 400 (Bad Request)
- 401 (Not Authorized)
- 403 (Forbidden)
- 404 (Not Found)
- 500 (Internal Server Error)  

## API Documentation
Dibuat supaya jika ada orang yg ingin menggunakan aplikasi kita, tidak perlu melihat codingannya langsung, tapi cukup membaca api documnetation (readme aplikasi)

Buat menggunakan markdown
[API Documentation example](https://github.com/i01107/documentation-example/blob/master/README.md)

## API Request Tools
Cara mengetest aplikasi kita dengan menggunakan postman

# DEMO

## **Setup**
Database : esport_event

```
npm init -y
npm i express pg sequelize
npm i -D nodemon sequelize-cli
touch .gitignore
npx sequelize init
npx sequelize db:create
```

## **Migration**
Table Games

| Column name     | type      | constraint |
|-----------------|:---------:|:----------:|
| name            | string    | not null   |
| gameImg         | string    | not null   |
| releaseDate     | date      | not null   |
| developer       | string    | not null   |
| genre           | string    | not null   |

```
npx sequelize model:generate --name Game --attributes name:string,gameImg:string,releaseDate:date,developer:string,genre:string
```

Table Events

| Column name     | type      | constraint       |
|-----------------|:---------:|:----------------:|
| name            | string    | not null         |
| description     | text      | not null         |
| totalPrize      | string    | not null         |
| eventPoster     | string    | not null         |
| eventDate       | date      | not null         |
| eventType       | string    | default : online |
| eventStatus     | string    | not null         |
| GameId          | integer   | not null         |
```
npx sequelize model:generate --name Event --attributes name:string,description:text,totalPrize:string,eventPoster:string,eventDate:date,eventType:string,eventStatus:string,GameId:integer
```

Table Managers

| Column name     | type      | constraint |
|-----------------|:---------:|:----------:|
| name            | string    | not null   |


```
npx sequelize model:generate --name Manager --attributes name:string
```
Sebelum di migrate, manager juga punya hubungan dengan game, kita gunakan migrasi tambahan untuk membuat foreign key di manager
```
npx sequelize migration:generate --name add-GameId-to-managers
```
```
npx sequelize db:migrate
```

## **Seeder**

Buatlah sebuah seed file untuk memasukan data ke tabel `Games`, `Events` dan `Managers`. Data berasal dari folder data.
```
npx sequelize seed:generate --name seeder-games
npx sequelize seed:generate --name seeder-events
npx sequelize seed:generate --name seeder-managers

npx sequelize db:seed:all
```

## **Endpoint**

| Method | Route                | Deskripsi                                                                         |
| :----- | :----                | :---------------------------------------------------------------------            |
| GET    | /games               | Menampilkan data `Game` beserta dengan manager dan event-event yang dimilikinya   |  
| GET    | /managers            | Menampilkan data `Manager` beserta dengan gamenya                                 |
| GET    | /events              | Menampilkan data `Event` beserta dengan game dan managernya                       |
| POST   | /events              | Menambahkan data `Event` ke dalam database                                        |
| GET    | /events/:id          | Menampilkan data satuan `Event`                                                   |
| DELETE | /events/:id          | Menghapus data `Event` dari database                                              |
| PUT    | /events/:id          | Mengupdate data `Event` secara keseluruhan                                        |
| PATCH  | /events/:id          | Mengubah status eventStatus data `Event`                                          |



