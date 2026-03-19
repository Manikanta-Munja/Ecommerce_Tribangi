# Ecommerce App Deployment Guide

This project has:
- React + Vite frontend in `ecommerce-ui`
- Spring Boot + MySQL backend in `ecommerceSpring`

## 1) Push Code To GitHub

Push the full project to a GitHub repository first.

## 2) Deploy Backend + MySQL On Railway

1. Create a new Railway project.
2. Add a MySQL database service.
3. Add a new service from your GitHub repo for backend code:
   - Root directory: `ecommerceSpring`
   - Build command: `./mvnw -DskipTests package`
   - Start command: `java -jar target/ecommerceSpring-0.0.1-SNAPSHOT.jar`
4. Set backend environment variables:
   - `SPRING_DATASOURCE_URL=jdbc:mysql://<MYSQL_HOST>:<MYSQL_PORT>/<MYSQL_DB>?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`
   - `SPRING_DATASOURCE_USERNAME=<MYSQL_USER>`
   - `SPRING_DATASOURCE_PASSWORD=<MYSQL_PASSWORD>`
   - `APP_CORS_ALLOWED_ORIGINS=http://localhost:5173`

After deploy, copy your backend public URL, for example:
- `https://your-backend.up.railway.app`

## 3) Deploy Frontend On Vercel

1. Import the same GitHub repo in Vercel.
2. Set project root directory to `ecommerce-ui`.
3. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend.up.railway.app`
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy and copy frontend URL.

## 4) Update CORS And Redeploy Backend

After frontend is deployed, update backend CORS env var:

- `APP_CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173`

Redeploy backend service.

## 5) Smoke Test

1. Open frontend URL.
2. Register a user.
3. Login.
4. Add to cart.
5. Place order.

If any API call fails, check:
- Frontend `VITE_API_BASE_URL`
- Backend `APP_CORS_ALLOWED_ORIGINS`
- Backend DB credentials

## Notes

- Admin login is currently frontend-only static credentials.
- Default local credentials/examples are in:
  - `ecommerce-ui/.env.example`
  - `ecommerceSpring/.env.example`
