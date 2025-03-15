# CoTreat PicShare challenge

Picshare challenge can is made up of two parts:

* Backend - the api server (written in NestJS, TypeOrm with Postgres backend)
* Frontend - the web client (written in React, React Router, Vite and Antd)

All features are present. There are some comments here and there for things i would have done differently if i had more time.

I hav dockerized the entire systems so that you can try with minimal fuss.  It should be noted
that i have created dev builds for everything, not production.

To setup and run the system, just open a terminal in the root folder where you 
have cloned the repository and follow the instructions below.

```dockerfile
docker compose -f dev-docker-compose.yml up --build
```

This will build the images and start the containers. You can access the website at:

```

http://localhost:3050

```

even though its not really needed i use nginx as a reverse proxy to the frontend and backend. This is to simulate 
a production setup. The backend is exposed on port 3001 and the frontend on port 3000.

I also populate the db with some data so you can see how the system works. If you want to test scrolling just insert a bunch more pictures


**NOTE: The first time you run the site you may get an error from the frontend. This is because the in the first instance its got to
compile all the code and which can take a few seconds. Just refresh the page and it should work if you have any problems.**

## Backend API

The backend api is a simple REST api with the following endpoints:

* POST /api/v1/auth/login - login a user
  
  equest body:

    ```json
    {
        "username":"<name of user>",
    }
    ```
  
* GET /api/v1/media - list all pictures (auth optional)

  parameters:
    
```
  limit: number of pictures to return
  offset: number of pictures to skip
  filter: "favorites" to return only favorited pictures for a user (needs auth)
 ```

* POST /api/v1/media - upload a picture (requires auth)

    Request body:
    ```json
    {    
        "title":"<title of picture>",
        "url":"<url of picture>"

    }
    ```
* PATCH /api/v1/media/:id - favorite a picture (requires auth)

    Request body (each field is optional):

    ```json
    {    
        "favorite":true,
        "title":"<title of picture>",
        "url":"<url of picture>"
    }
    ```
Authenticating with the backend is done by sending a token in the Authorization header. The token is returned when you login.

An example header would look like this:
```
Authorization: Bearer <token>
```

I have also included a hopscotch collection (this is a tool like postman) so you can test the api. The collection is in the root of the project.
