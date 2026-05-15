# Soundify 🎵

A Spotify-inspired music streaming application built with Spring Boot and React.

## Tech Stack

**Backend:**
- Java 21
- Spring Boot 3.5
- Spring Security + JWT
- Spring Data JPA
- H2 Database
- Maven
- Docker

**Frontend:**
- React
- Axios
- React Router DOM

## Features

- User registration and login with JWT authentication
- Browse artists, albums, and songs
- Create and manage playlists
- Audio player with play/pause controls
- RESTful API with proper HTTP status codes
- Input validation and global exception handling
- Unit tests with JUnit 5 and Mockito

## Getting Started

### Prerequisites
- Java 21
- Maven
- Node.js
- Docker (optional)

### Run Backend

```bash
cd soundify
mvn clean package
java -jar target/soundify-0.0.1-SNAPSHOT.jar
```

Backend runs on `http://localhost:8080`

### Run Frontend

```bash
cd soundify-frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Run with Docker

```bash
docker build -t soundify-backend .
docker run -p 8080:8080 soundify-backend
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT token |

### Artists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/artists | Get all artists |
| GET | /api/artists/{id} | Get artist by ID |
| POST | /api/artists | Create artist |
| DELETE | /api/artists/{id} | Delete artist |

### Albums
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/albums | Get all albums |
| GET | /api/albums/{id} | Get album by ID |
| POST | /api/albums | Create album |
| DELETE | /api/albums/{id} | Delete album |

### Songs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/songs | Get all songs |
| GET | /api/songs/{id} | Get song by ID |
| POST | /api/songs | Create song |
| DELETE | /api/songs/{id} | Delete song |

### Playlists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/playlists | Get all playlists |
| GET | /api/playlists/{id} | Get playlist by ID |
| POST | /api/playlists | Create playlist |
| POST | /api/playlists/{id}/songs | Add song to playlist |
| DELETE | /api/playlists/{id} | Delete playlist |

## Project Structure

```
soundify/
├── src/main/java/sk/adamkatrenic/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   ├── security/
│   └── exception/
├── src/test/
├── Dockerfile
└── pom.xml

soundify-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Register.js
│   └── api/
│       └── axios.js
└── package.json
```

## Author

Adam Katrenic
