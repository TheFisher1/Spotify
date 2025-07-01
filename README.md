# Spotify Clone - Microservices Architecture

**Note**: This project is developed as final project for the course Web Development with Java, which has been taught the summer semmester at the Faculty of Mathematics and Informatics at the Sofia University "St. Kliment Ohridski". It is developed for educational purposes. All music content and branding rights belong to their respective owners.

## 🏗️ Architecture Overview

This project follows a microservices architecture pattern with the following components:

### Backend Microservices

1. **API Gateway** (`api-gateway/`) - Central entry point for all client requests
2. **Users Service** (`users/`) - User authentication, registration, and profile management
3. **Media Service** (`media/`) - Song, album, and playlist management
4. **Artist Service** (`artist/`) - Artist information and management
5. **Actions Service** (`actions/`) - User interactions (likes, follows)
6. **Recommendations Service** (`recommendations/`) - Music recommendations using Recombee

### Frontend

- **React Client** (`client/`) - Modern React application with TypeScript, Tailwind CSS, and Vite

## 🚀 Technology Stack

### Backend
- **Java 21** with Spring Boot 3.4.5
- **Spring Cloud Gateway** for API routing
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **Maven** for dependency management
- **Recombee** for recommendation engine

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons

## 📁 Project Structure

```
Spotify/
├── api-gateway/          # API Gateway service
├── users/               # User authentication service
├── media/               # Media management service
├── artist/              # Artist management service
├── actions/             # User interactions service
├── recommendations/     # Recommendation engine service
├── client/              # React frontend application
└── pom.xml             # Parent Maven configuration
```

## 🔧 Setup and Installation

### Prerequisites
- Java 21
- Node.js 18+
- Maven 3.8+
- Docker (optional, for containerization)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Spotify
   ```

2. **Build all microservices**
   ```bash
   mvn clean install
   ```

3. **Configure environment variables**
   
   Create environment variables for each service. Key variables include:
   - `JWT_SECRET` - Secret key for JWT token generation
   - `USERS_SERVICE_URL` - Users service endpoint
   - `MEDIA_SERVICE_URL` - Media service endpoint
   - `ARTIST_SERVICE_URL` - Artist service endpoint
   - `ACTIONS_SERVICE_URL` - Actions service endpoint
   - `RECOMMENDATIONS_SERVICE_URL` - Recommendations service endpoint
   - `HTTPS_SERVER_PORT` - API Gateway port
   - `HTTP_CLIENT_URL` / `HTTPS_CLIENT_URL` - Frontend URLs for CORS

4. **Start the services**
   
   Start each microservice in separate terminals:
   ```bash
   # API Gateway
   cd api-gateway && mvn spring-boot:run
   
   # Users Service
   cd users && mvn spring-boot:run
   
   # Media Service
   cd media && mvn spring-boot:run
   
   # Artist Service
   cd artist && mvn spring-boot:run
   
   # Actions Service
   cd actions && mvn spring-boot:run
   
   # Recommendations Service
   cd recommendations && mvn spring-boot:run
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Update `src/config.ts` with your API Gateway URL:
   ```typescript
   export const devConfig = {
       baseApiUrl: 'http://localhost:8080',
       timeout: 10000
   };
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🎵 Features

### Core Features
- **User Authentication** - Registration, login, STATELESS JWT-based authentication
- **Music Streaming** - Play songs with audio controls
- **Playlist Management** - Create, edit, and manage playlists
- **Search Functionality** - Search songs, artists, and albums
- **User Profiles** - User information and preferences
- **Social Features** - Like songs and follow artists
- **Recommendations** - Personalized music recommendations

### Technical Features
- **Microservices Architecture** - Scalable and maintainable backend
- **API Gateway** - Centralized routing and security configuration
- **JWT Authentication** - Secure token-based authentication
- **CORS Configuration** - Cross-origin resource sharing
- **Real-time Music Player** - Continuous playback across pages

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration** - Users create accounts with username, email, and password
2. **Login** - Users authenticate and receive JWT tokens
3. **Token Validation** - All protected routes validate JWT tokens
4. **Automatic Logout** - Tokens expire and users are logged out

## 🎨 UI Components

### Main Components
- **Navigation** - Top navigation bar with search and user menu
- **Sidebar** - Left sidebar with navigation links
- **Music Player** - Bottom player with playback controls
- **Song Cards** - Individual song display components
- **Playlist Cards** - Playlist display components
- **Auth Modals** - Login and registration forms

### Pages
- **Home** - Main dashboard with featured content
- **Search** - Search interface for finding music
- **Landing Page** - Public landing page for non-authenticated users

## 🔌 API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Media (`/media`)
- `GET /media/songs` - Get all songs (paginated)
- `GET /media/songs/{songId}` - Get specific song
- `GET /media/songs/artists/{artistId}` - Get songs by artist
- `GET /media/songs/search` - Search songs
- `GET /media/songs/random` - Get random song

### Artists (`/artists`)
- `GET /artists` - Get all artists
- `GET /artists/{artistId}` - Get specific artist

### Actions (`/likes`, `/follows`)
- `POST /likes` - Like a song
- `DELETE /likes/{songId}` - Unlike a song
- `POST /follows` - Follow an artist
- `DELETE /follows/{artistId}` - Unfollow an artist

### Recommendations (`/recommendations`)
- `GET /recommendations/songs` - Get song recommendations
- `GET /recommendations/artists` - Get artist recommendations

## 🗄️ Database Schema

### Users
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `age` - User age
- `gender` - User gender
- `country` - User country

### Songs
- `id` - Primary key
- `title` - Song title
- `duration` - Song duration
- `album_id` - Foreign key to album
- `artist_id` - Foreign key to artist
- `genres` - Many-to-many relationship with genres

### Playlists
- `id` - Primary key
- `name` - Playlist name
- `user_id` - Foreign key to user
- `songs` - Many-to-many relationship with songs

### Likes
- `id` - Primary key
- `user_id` - Foreign key to user
- `song_id` - Foreign key to song

### Follows
- `id` - Primary key
- `user_id` - Foreign key to user
- `artist_id` - Foreign key to artist

## Some Limitations
- All communication is synchronous, meaning that when facing a bigger load, the system may and most probably will not be able to function properly.
- Currently the system lacks proper error handling and retry mechanisms for inter-service communication.
- No caching layer is implemented, which could lead to performance issues with repeated database queries.
- The system doesn't implement circuit breakers or fallback mechanisms for service failures.
- No rate limiting is implemented to prevent API abuse.
- No automated backup and recovery mechanisms for data persistence.


## 🚀 Deployment

This project can run in any environment with a Java Runtime Environment (JRE) installed. That includes both different cloud-based services, as well as the legacy on-prem method

### Further Development

### Docker Deployment
Each microservice can be easily containerized using Docker. The only requirement 
is to add Dockerfile for each microservice. Then the project can be easily deployed on container-based products such as Docker Swarm or K8s as well.

### Production Considerations
- Use environment variables for configuration
- Implement proper logging and monitoring
- Set up database connections with connection pooling
- Configure SSL/TLS for secure communication
- Implement rate limiting and security headers
- Set up health checks for all services
- Scale horizontally to face the load

## 🧪 Testing
Another key point to further develop are the tests of this system.
Tests on Backend can be run using maven, more precisely using the following command:

```bash
mvn test

# Run tests for specific component
cd <component> && mvn test
```

### Frontend Testing
```bash
cd client
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.