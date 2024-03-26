# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all questions__

URL: `/api/questions`

HTTP Method: GET.

Description: Retrieve all questions.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "text": "Is JavaScript better than Python?",
    "email": "luigi.derussis@polito.it",
    "date": "2024-02-07"
  },
  ...
]
```

### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET.

Description: Retrieve the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
{
  "id": 1,
  "text": "Is JavaScript better than Python?",
  "email": "luigi.derussis@polito.it",
  "date": "2024-02-07"
} 
```

### __Get all the answers of a single question__

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the answers of the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "text": "Yes",
    "email": "luca.mannella@polito.it",
    "score": -10,
    "date": "2024-02-08"
  },
  ...
]
```

### __Create a new answer for a given question__

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Create a new answer to the question represented by `<id>`.

Request body:
```
{
    "text": "Last year, it had about 220 first-timers.",
    "email": "luca.mannella@polito.it",
    "score": 0,
    "date": "2024-03-26"
  }
```

Response: `201 Created` (succes, with the created id), `404 Not Found` (wrong id), or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__