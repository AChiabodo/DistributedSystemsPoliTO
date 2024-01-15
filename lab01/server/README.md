# `react-qa-server`

The `react-qa-server` is the server-side app companion of ```react-qa```. It presents some APIs to perform CRUD operations on the answers of the HeapOverrun web application example.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List Films__

URL: `/api/films`

Method: GET

Description: Get all the films with filters.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a film.
```
[{
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 0,
    "watchdate": "2022-03-10T23:00:00.000Z",
    "rating": 2,
    "user": 1
  },
...
]
```

### __Get a Film (by Id)__

URL: `/api/films/<id>`

Method: GET

Description: Get the film identified by the id `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: An object, describing a single question.
```
{
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 0,
    "watchdate": "2022-03-10T23:00:00.000Z",
    "rating": 2,
    "user": 1
  }
```


....
