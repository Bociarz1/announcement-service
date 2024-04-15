## Description

Announcement application implements in Nest.js Framework
with Mongo db (private access to db)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# save all API cals into 'requests.log.txt' file
$ node dist/main.js debug
```

## Api documentation

### Endpoints:

### /heartbeat

#### Description

```bash
'Return current date'
```

#### Http method

```bash
'GET'
```

#### Authentication

```bash
'No authentication required'
```

#### Response

```bash
'2024-04-15 19:21'
```

### /add

#### Description

```bash
'Add one announcement'
```

#### Http method

```bash
'POST'
```
#### Authentication

```bash
Bearer token: 'USER AUTH TOKEN'
```

#### Request headers

```bash
x-user-id: 'USER ID'
```
#### Request body

```bash
{
  "title": "title",
  "description": "description",
  "author": "author",
  "phoneNumber": "123456789",
  "category": 4,
  "tags": 1,
  "address": "address"
}
```

#### Response

```bash
{
    "creatorId": "6618068be0b8a044a65273bd",
    "createdDate": "2024-04-15T17:43:26.245Z",
    "title": "title",
    "description": "description",
    "author": "author",
    "phoneNumber": "123456789",
    "category": 4,
    "tags": 1,
    "address": "address",
    "_id": "661d673eb3b5abc1c5a77e90",
    "__v": 0
}
```

### /getOne/:announcementId

#### Description

```bash
'Get one announcement by ID'
```

#### Http method

```bash
'GET'
```

#### Authentication

```bash
'Bearer token required'
```

#### Request headers

```bash
Accept: 'text/plain'
Accept: 'text/html'
Accept: 'application/json'
```

#### Response

```bash
{
    "creatorId": "6618068be0b8a044a65273bd",
    "createdDate": "2024-04-15T17:43:26.245Z",
    "title": "title",
    "description": "description",
    "author": "author",
    "phoneNumber": "123456789",
    "category": 4,
    "tags": 1,
    "address": "address",
    "_id": "661d673eb3b5abc1c5a77e90",
    "__v": 0
}
```

### /getAll

#### Description

```bash
'Get all announcement'
```

#### Http method

```bash
'GET'
```

#### Authentication

```bash
'No authentication required'
```

#### Response

```bash
[{
    "creatorId": "6618068be0b8a044a65273bd",
    "createdDate": "2024-04-15T17:43:26.245Z",
    "title": "title",
    "description": "description",
    "author": "author",
    "phoneNumber": "123456789",
    "category": 4,
    "tags": 1,
    "address": "address",
    "_id": "661d673eb3b5abc1c5a77e90",
    "__v": 0
}]
```

### /removeOne/:announcementId

#### Description

```bash
'Delete one announcement by ID'
```

#### Http method

```bash
'DELETE'
```

#### Authentication

```bash
Bearer token: 'USER AUTH TOKEN'
```

#### Request headers

```bash
x-user-id: 'USER ID'
```

#### Response

```bash
{
    "creatorId": "6618068be0b8a044a65273bd",
    "createdDate": "2024-04-15T17:43:26.245Z",
    "title": "title",
    "description": "description",
    "author": "author",
    "phoneNumber": "123456789",
    "category": 4,
    "tags": 1,
    "address": "address",
    "_id": "661d673eb3b5abc1c5a77e90",
    "__v": 0
}
```

### /updateOne/:announcementId

#### Description

```bash
'Update one announcement by ID'
```

#### Http method

```bash
'PATCH'
```

#### Authentication

```bash
Bearer token: 'USER AUTH TOKEN'
```

#### Request headers

```bash
x-user-id: 'USER ID'
```

#### Request body

```bash
{
    "title": "title",
    "description": "description",
    "author": "author",
    "phoneNumber": "123456789",
    "category": 4,
    "tags": 1,
    "address": "address",
}
```

### /filter

#### Description

```bash
'Filter announcements based on specified criteria'
```

#### Http method

```bash
'POST'
```

#### Authentication

```bash
'No authentication required'
```

#### Request headers

```bash
'Not required'
```

#### Request body

```bash
{
    "title": "",
    "description": "",
    "author": "",
    "phoneNumber": "2",
    "category": 1,
    "tags": 4,
    "duties": "",
    "address": "",
    "createdDate": "2025-04-30T00:00:00.000Z",
    "createdDateRangeFrom": "2025-04-30T00:00:00.000Z",
    "createdDateRangeTo": "2025-04-30T00:00:00.000Z",
    "price": 5,
    "priceRangeFrom": 0,
    "priceRangeTo": 1000,
    "salary": 20,
    "salaryRangeFrom": 0,
    "salaryRangeTo": 10000
}
```




