# Bunny

## Development
Install node nodules:
```
  npm install
```

Start project:
```
  npm run start
```

Run test:
```
  npm run test
```

## Production
Build for production:
```
  npm run heroku-postbuild
```

## API Documentation

### Auth

#### Signup

[**POST**] _/api/auth/signup_

**Request body**
- name
- email
- password

Response body
- user
  - _id
  - name
  - email
  - createdAt
  - updatedAt
- token

**Example**

Request
```
{"name"    : "Burkay",
 "email"   : "burkaydurdu@outlook.com",
 "password": "1B2b9s7SfR8c"}
```
**Response**
```
{
  "user": {
    "_id": "6059fdf2f64185aa2271fc84",
    "name": "Burkay",
    "email": "burkaydurdu@outlook.com",
    "createdAt": "2021-03-23T14:40:50.218Z",
    "updatedAt": "2021-03-23T14:40:50.218Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU5ZmRmMmY2NDE4NWFhMjI3MWZjODQiLCJuYW1lIjoiSGFsaW1lIiwiZXhwIjoxNjIxNjk0NDUwLjIzMSwiaWF0IjoxNjE2NTEwNDUwfQ.Wn0TY1XL0hLA6EugPbXv63WmC7D-2V3nc8Uev-2J-Ps"
}
```

#### Signin

[**POST**] _/api/auth/signin_

**Request body**
- email
- password

Response body
- user
  - _id
  - name
  - email
  - createdAt
  - updatedAt
- token

**Example**

Request
```
{"email"   : "burkaydurdu@outlook.com",
 "password": "1B2b9s7SfR8c"}
```
**Response**
```
{
  "user": {
    "_id": "6059fdf2f64185aa2271fc84",
    "name": "Burkay",
    "email": "burkaydurdu@outlook.com",
    "createdAt": "2021-03-23T14:40:50.218Z",
    "updatedAt": "2021-03-23T14:40:50.218Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU5ZmRmMmY2NDE4NWFhMjI3MWZjODQiLCJuYW1lIjoiaGFsaW1lQG91dGxvb2suY29tIiwiZXhwIjoxNjIxNjk1MzY2LjE2OCwiaWF0IjoxNjE2NTExMzY2fQ.CQb7ugvDwj7N_93t1rN463SALAYNa3SVuqfd6MJDm1o"
}
```

### Travel

#### Create

[**POST**] _/api/travel/create_

**Headers**
- Authorization [Bearer Token]

**Request body**
- startPoint [Object]
  - type
  - coordinates [Array]
- endPoint [Object]
  - type
  - coordinates [Array]
- endDate [Date]
- startDate [Date]

Response body
- travel
  - _id
  - startPoint
  - endPoint 
  - endDate
  - startDate
  - userId

**Example**

Headers

```
{ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU5ZmRmMmY2NDE4NWFhMjI3MWZjODQiLCJuYW1lIjoiaGFsaW1lQG91dGxvb2suY29tIiwiZXhwIjoxNjIxNjk1MzY2LjE2OCwiaWF0IjoxNjE2NTExMzY2fQ.CQb7ugvDwj7N_93t1rN463SALAYNa3SVuqfd6MJDm1o' }
```

Request

```
{ 
    "startPoint": { "type": "Point", "coordinates": [38.395297, 34.009813]},
    "endPoint": { "type": "Point", "coordinates": [37.966454, 34.677219]},
    "endDate": "10/12/2021 16:10:10",
    "startDate": "10/12/2021 15:10:11"
}
```

Response

```
{
    "travel": {
        "startPoint": {
            "type": "Point",
            "coordinates": [
                38.395297,
                34.009813
            ]
        },
        "endPoint": {
            "type": "Point",
            "coordinates": [
                37.966454,
                34.677219
            ]
        },
        "_id": "605a5cc07274337041d4e133",
        "endDate": "2021-10-12T13:10:10.000Z",
        "startDate": "2021-10-12T12:10:11.000Z",
        "userId": "6059fdf2f64185aa2271fc84",
        "__v": 0
    }
}
```

#### Travel List

[**GET**] _/api/travel_

**Query Params**
- lat
- long
- radius (mil)

**Response body**
- startPoint
- endPoint
- endDate
- startDate
- userId
- _id

> This body is list

**Example**

Request URL

```
http://localhost:3000/api/travel?lat=37.965972&long=34.673445&radius=5
```

Response Body

```
[
    {
        "startPoint": {
            "type": "Point",
            "coordinates": [
                37.967181,
                34.67398
            ]
        },
        "endPoint": {
            "type": "Point",
            "coordinates": [
                37.965904,
                34.672168
            ]
        },
        "_id": "605a4993d6f43f45ddadf5c9",
        "endDate": "2021-10-12T13:10:10.000Z",
        "startDate": "2021-10-12T12:10:11.000Z",
        "userId": "6059fdf2f64185aa2271fc84",
        "__v": 0
    },
    {
        "startPoint": {
            "type": "Point",
            "coordinates": [
                37.965667,
                34.676052
            ]
        },
        "endPoint": {
            "type": "Point",
            "coordinates": [
                37.964314,
                34.677651
            ]
        },
        "_id": "605a5c0b7274337041d4e131",
        "endDate": "2021-10-12T13:10:10.000Z",
        "startDate": "2021-10-12T12:10:11.000Z",
        "userId": "6059fdf2f64185aa2271fc84",
        "__v": 0
    },
    {
        "startPoint": {
            "type": "Point",
            "coordinates": [
                38.395297,
                34.009813
            ]
        },
        "endPoint": {
            "type": "Point",
            "coordinates": [
                37.966454,
                34.677219
            ]
        },
        "_id": "605a5cc07274337041d4e133",
        "endDate": "2021-10-12T13:10:10.000Z",
        "startDate": "2021-10-12T12:10:11.000Z",
        "userId": "6059fdf2f64185aa2271fc84",
        "__v": 0
    }
]
```