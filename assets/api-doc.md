# RECIPE APP

description:
Create CRUD API for Master Data of Recipe
Create CRUD API for Comment of the Recipe (one to many - relationship)
Create Auth API for User registration and login.
Add authentication and authorization


List of available endpoints:

CRUD Recipe

- `POST /recipe`
- `GET /recipe`
- `GET /recipe/:id`
- `PUT /recipe/:id`
- `DELETE /recipe/:id`

CRUD Comment

- `POST /comment`
- `GET /comment`
- `PUT /comment/:id`
- `DELETE /comment/:id`

CRUD User

- `POST /register`
- `POST /login`

### POST /recipe

description:
Create Master Data of Recipe

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```

- body:

```json
{
  "resep": "Indomie goreng",
  "deskripsi": "Resep menu indomie yang enak dan bergizi",
  "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
  "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan"
}
```

Response:

Success
- status: 201
- body:

```json
{
    {
        "id": 1,
        "resep": "Indomie goreng",
        "deskripsi": "Resep menu indomie yang enak dan bergizi",
        "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
        "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan",
        "userId": 2,
        "createdAt": "2023-11-06T10:47:03.000Z",
        "updatedAt": "2023-11-06T10:47:03.000Z"
    }
}
```

Forbidden
- status: 403
- body:

```json
{
    "message": "akses hanya untuk user admin"
}
```

Unauthorized
- status: 401
- body:

```json
{
    "message": "user tidak terauthentikasi"
}
```

### GET /recipe

description:
get all Recipe list

Response:

- status: 200
- body:

```json
{
    "recipes": [
        {
            "id": 1,
            "resep": "Indomie goreng",
            "deskripsi": "Resep menu indomie yang enak dan bergizi",
            "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
            "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan",
            "userId": 2,
            "createdAt": "2023-11-06T10:47:03.000Z",
            "updatedAt": "2023-11-06T10:47:03.000Z"
        }
    ]
}
```

### GET /recipe/:id

description:
get detail recipe Left join to its comment

Request:

- param:

```json
{
  "id": 1
}
```

Response:

- status: 200
- body:

```json
{
    "id": 1,
    "resep": "Indomie aceh",
    "deskripsi": "Resep menu indomie yang enak dan bergizi",
    "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
    "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan",
    "userId": 2,
    "createdAt": "2023-11-06T10:47:03.000Z",
    "updatedAt": "2023-11-06T10:54:39.000Z",
    "comments": [
        {
            "id": 1,
            "komentar": "Ini resep yang sangat bagus, saya suka sekali.",
            "rating": 4,
            "recipeId": 1,
            "userId": 4,
            "createdAt": "2023-11-06T10:57:06.000Z",
            "updatedAt": "2023-11-06T10:57:06.000Z"
        }
    ]
}
```

### PUT /recipe/:id

description:
edit single Recipe data

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```


- param:

```json
{
  "id": 1
}
```

- body:

```json
{
  "resep": "Indomie aceh",
  "deskripsi": "Resep menu indomie yang enak dan bergizi",
  "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
  "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan"
}
```

Response:

- status: 200
- body:

```json
{
  "resep": "Indomie aceh",
  "deskripsi": "Resep menu indomie yang enak dan bergizi",
  "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
  "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan",
  "createdAt": "2023-11-06T10:57:06.000Z",
  "updatedAt": "2023-11-06T10:57:06.000Z"
}
```

Forbidden
- status: 403
- body:

```json
{
    "message": "akses hanya untuk user admin"
}
```

Unauthorized
- status: 401
- body:

```json
{
    "message": "user tidak terauthentikasi"
}
```

### DELETE /recipe/:id

description:
delete Recipe from list
when deleting recipe that is used in at least one comment, the on delete association should also delete the comment entity

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```

- param:

```json
{
  "id": 1
}
```

- body:
  none

Response:

- status: 200
- body:

```json
{
  "message": "Resep indomie goreng telah dihapus"
}
```

Forbidden
- status: 403
- body:

```json
{
    "message": "akses hanya untuk user admin"
}
```

Unauthorized
- status: 401
- body:

```json
{
    "message": "user tidak terauthentikasi"
}
```

## Comment

### POST /comment

description:
Create Comment of Recipe

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```


- body:

```json
{
    "komentar": "Ini resep yang sangat bagus, saya suka sekali.",
    "rating": 4,
    "recipeId": 1
}
```

Response:

- status: 201
- body:

```json
{
    "id": 1,
    "komentar": "Ini resep yang sangat bagus, saya suka sekali.",
    "rating": 4,
    "recipeId": 1,
    "userId": 4,
    "createdAt": "2023-11-06T10:57:06.000Z",
    "updatedAt": "2023-11-06T10:57:06.000Z",
    "recipes": {
        "id": 1,
        "resep": "Indomie aceh",
        "deskripsi": "Resep menu indomie yang enak dan bergizi",
        "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
        "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan",
        "userId": 2,
        "createdAt": "2023-11-06T10:47:03.000Z",
        "updatedAt": "2023-11-06T10:54:39.000Z"
    }
}
```

Forbidden
- status: 403
- body:

```json
{
    "message": "user tidak punya akses data ini"
}
```

Unauthorized
- status: 401
- body:

```json
{
    "message": "user tidak terauthentikasi"
}
```

### GET /comment

description:
get all Comment with its Recipe

Response:

- status: 200
- body:

```json
{
    "comment": [
        {
            "id": 1,
            "komentar": "Ini resep yang sangat bagus, saya suka sekali.",
            "rating": 4,
            "recipeId": 1,
            "userId": 4,
            "createdAt": "2023-11-06T10:57:06.000Z",
            "updatedAt": "2023-11-06T10:57:06.000Z",
            "recipes": {
                "id": 1,
                "resep": "Indomie aceh",
                "deskripsi": "Resep menu indomie yang enak dan bergizi",
                "bahan": "Indomie goreng 2, telur 2, sawi, susu full cream",
                "pembuatan": "rebus air sampai mendidih, lalu masukkan mie dan sawi kedalam rebusan, rebus mie sampai setengah matang lalu tiriskan, rebus susu secukupnya, lalu masukkan telur kedalam rebusan susu, masukkan mie dan sawi ke rebusan susu, setelah itu masukkan bumbu mie dan aduk rata sampai mengental dan matang, selesai mie siap di dihangkan",
                "userId": 2,
                "createdAt": "2023-11-06T10:47:03.000Z",
                "updatedAt": "2023-11-06T10:54:39.000Z"
            }
        }
    ]
}
```

### PUT /comment/:id

description:
edit single comment data

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```


- query param:

```json
{
  "id": 1
}
```

- body:

```json
{
    "komentar": "Ini resep yang sangat bagus, saya suka sekali.",
    "rating": 5
}
```

Response:

- status: 200
- body:

```json
{
    "komentar": "Ini resep yang sangat bagus, saya suka sekali.",
    "rating": 5,
    "createdAt": "2023-11-06T10:57:06.000Z",
    "updatedAt": "2023-11-06T11:43:40.458Z"
}
```

Forbidden
- status: 403
- body:

```json
{
    "message": "user tidak punya akses data ini"
}
```

Unauthorized
- status: 401
- body:

```json
{
    "message": "user tidak terauthentikasi"
}
```

### DELETE /comment/:id

description:
delete single comment
when deleting comment that is used in at least one recipes, the on delete association should also delete the one to many relationship

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```

- param:

```json
{
  "id": 1
}
```

- body:
  none

Response:

- status: 200
- body:

```json
{
  "message": "Komentar dengan id 1 telah dihapus"
}
```

Forbidden
- status: 403
- body:

```json
{
    "message": "user tidak punya akses data ini"
}
```

Unauthorized
- status: 401
- body:

```json
{
    "message": "user tidak terauthentikasi"
}
```

## User
### POST /register

description:
Register user 

Request:


- body:

```json
{
    "nama": "nama1",
    "email":"nama1@email.com",
    "password": "12345678"
}
```

Response:

Success
- status: 201
- body:

```json
{
  "message" : "akun berhasil dibuat, silahkan login."
}
```

### POST /login

description:
Login user 

Request:


- body:

```json
{
  "email": "nama1@email.com",
  "password" : "12345678",
}
```

Response:

Success
- status: 200
- body:

```json
{
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2b2Nhc2lhQGVtYWlsLmNvbSIsImlhdCI6MTY5NzUyODM2M30.ciOlPjuhBoNGRmad98VOAYK4eUnwTPryphF9bfGd7-4"
}
```