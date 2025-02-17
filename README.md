# Ridery Challenge - API RESTful y Frontend

Este proyecto implementa una API RESTful para la gestión de vehículos y un frontend para interactuar con la API. La API permite crear, leer, actualizar y eliminar vehículos, mientras que el frontend proporciona una interfaz de usuario para realizar estas operaciones.

## Producción

- El frontend está disponible en `https://ridery-challenge.onrender.com`
- El backend está disponible en `https://ridery-challenge-api.onrender.com/docs/`

### Credenciales de Prueba

Estas credenciales son de prueba y se pueden usar para acceder a la aplicación:

- **Email:** user@example.com
- **Password:** password123

## Configuración y Ejecución del Proyecto

### Prerrequisitos

- Node.js (v14 o superior)
- docker-compose
- docker

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables: (.env expuesto con propósitos demostrativos)

```env
NODE_ENV=dev
HOST=localhost
PORT=3000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=secret
```

### Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/azavaleta8/ridery-challenge.git
   cd ridery-challenge
   ```

2. Crear un archivo `.env` en la raíz del proyecto y configurar las variables de entorno necesarias (ver sección de Variables de Entorno).

3. Iniciar el servidor backend:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

El servidor backend estará corriendo en `http://localhost:3000`.

4. Iniciar el servidor frontend:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

El servidor frontend estará corriendo en `http://localhost:5173`.

### Ejecución con Docker Compose

Para ejecutar el proyecto utilizando Docker Compose, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

2. Construye y levanta los contenedores:

   ```sh
   docker-compose up --build
   ```

El servidor frontend estará corriendo en `http://localhost:80`.
El servidor backend estará corriendo en `http://localhost:3000`.

## Estructura del Proyecto y Decisiones de Diseño

```
/backend
  /config
  /controllers
  /middlewares
  /models
  /routes
  /services
  /validators
/frontend
  /src
    /components
    /services
    /views
```

### Arquitectura

#### Backend

- Se implementó una arquitectura en capas (rutas, controladores, servicios, modelos).
- Se utilizó el patrón repositorio para el acceso a datos, encapsulando la lógica de la base de datos en los servicios.
- Se utilizaron middlewares para la autenticación y manejo de errores.
- La validación de datos se realizó utilizando validadores personalizados.

#### Frontend

- Se utilizó Vue 3 con Composition API para la construcción del frontend.
- La estructura del frontend se dividió en componentes y vistas para una mejor organización y reutilización del código.
- Los componentes se encuentran en la carpeta `src/components` y se encargan de partes específicas de la interfaz de usuario, como formularios, listas y elementos interactivos.
- Las vistas se encuentran en la carpeta `src/views` y representan páginas completas de la aplicación. Cada vista puede contener múltiples componentes.
- Se utilizó Vue Router para la navegación entre las diferentes vistas de la aplicación.
- Se implementaron servicios en la carpeta `src/services` para manejar la comunicación con la API backend utilizando Axios.

## Endpoints de la API

Documentación completa de la API disponible en Swagger UI:

- DEV: `http://localhost:3000/docs`
- PROD: `https://ridery-challenge-api.onrender.com/docs`

Endpoints principales:

### Ping:

- GET /ping
  - Descripción: Obtiene el estado del servidor.

### Vehículos:

- POST /api/vehicles
  - Descripción: Crea un nuevo vehículo.
- GET /api/vehicles
  - Descripción: Obtiene la lista de todos los vehículos.
- GET /api/vehicles/:id
  - Descripción: Obtiene detalles de un vehículo específico.
- PUT /api/vehicles/:id
  - Descripción: Actualiza la información de un vehículo.
- DELETE /api/vehicles/:id
  - Descripción: Elimina un vehículo del sistema.

## Buenas Prácticas Implementadas

- Uso de async/await para manejar operaciones asíncronas.
- Implementación de logging para facilitar el debugging y monitoreo.
- Uso de ESLint para mantener un estilo de código consistente.

## Comentarios adicionales

- Se implementó un script para popular registros en la base de datos.
- Tiempo total empleado: 20h
