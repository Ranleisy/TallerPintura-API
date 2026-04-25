# Taller de Pintura

Sistema fullstack para la gestión de un taller de pintura artístico. Cubre el ciclo completo: estudiantes, obras, sesiones de trabajo y exposiciones, conectados a través de una API REST en .NET y una SPA en React.

---

## Stack

**Backend** — .NET 10 · ASP.NET Core Web API · Entity Framework Core · SQL Server · AutoMapper

**Frontend** — React 19 · Vite · React Router DOM v7 · Framer Motion · Lucide React · Axios

---

## Arquitectura

El backend sigue una arquitectura de capas limpia:

```
TallerPintura.Domain          Entidades del negocio
TallerPintura.Application     Servicios, interfaces, DTOs, AutoMapper
TallerPintura.Infrastructure  Repositorio genérico, Unit of Work
TallerPintura.Persistence     DbContext (EF Core)
TallerPintura.API             Controllers, Program.cs, configuración
```

El frontend vive en `taller-pintura-client/` como una SPA en React que consume la API.

---

## Módulos

| Módulo | Descripción |
|---|---|
| Estudiantes | CRUD de estudiantes del taller |
| Obras | Registro y gestión de obras por estudiante |
| Sesiones | Control de sesiones de trabajo |
| Exposiciones | Administración de exposiciones y las obras que las componen |

---

## Requisitos

- .NET 10 SDK
- SQL Server
- Node.js 18+

---

## Cómo correr el proyecto

### Backend

1. Configura la cadena de conexión en `TallerPintura.API/appsettings.json`:

```json
"ConnectionStrings": {
  "MainConnection": "Server=TU_SERVIDOR;Database=TallerPintura;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

2. Aplica las migraciones:

```bash
dotnet ef database update --project TallerPintura.Persistence --startup-project TallerPintura.API
```

3. Corre la API:

```bash
dotnet run --project TallerPintura.API
```

La API queda disponible en `https://localhost:7XXX`. La documentación OpenAPI está en `/openapi` (solo en entorno Development).

### Frontend

1. Entra a la carpeta del cliente e instala las dependencias:

```bash
cd taller-pintura-client
npm install
```

2. Corre el servidor de desarrollo:

```bash
npm run dev
```

La app corre en `http://localhost:5173`.

---

## Endpoints

Todos los módulos exponen las mismas operaciones base:

```
GET     /api/{recurso}        Lista todos los registros
GET     /api/{recurso}/{id}   Obtiene uno por ID
POST    /api/{recurso}        Crea un nuevo registro
PUT     /api/{recurso}/{id}   Actualiza un registro existente
DELETE  /api/{recurso}/{id}   Elimina un registro
```

Recursos disponibles: `estudiantes`, `obras`, `sesiones`, `exposiciones`.

---

## Estructura del frontend

```
taller-pintura-client/
  public/
    favicon.svg         Icono de paleta de pintura
  src/
    components/
      Navbar.jsx        Navegación sticky con iconos y estado activo
    pages/
      Home.jsx          Página principal
      Estudiantes.jsx   CRUD de estudiantes
      Obras.jsx         CRUD de obras
      Sesiones.jsx      CRUD de sesiones
      Exposiciones.jsx  CRUD de exposiciones
    App.jsx             Rutas + transiciones con Framer Motion
    index.css           Variables CSS, animaciones globales
```

---

## Notas de configuración

- El backend tiene CORS abierto (`AllowAnyOrigin`) para facilitar el desarrollo local. Restringir en producción.
- El serializador JSON ignora referencias circulares y propiedades nulas.
- Las transiciones de página usan `AnimatePresence` con modo `wait` para evitar solapamientos.

---

**Autor:** Ranfy
