# Taller Pintura API

API REST para la gestión de un Taller de Pintura Artística desarrollada con ASP.NET Core Web API.

## Descripción

Sistema de gestión que permite administrar estudiantes, obras, sesiones de clase y exposiciones de arte.

## Arquitectura

Proyecto desarrollado con arquitectura distribuida en 5 capas:

- TallerPintura.Domain - Entidades del negocio
- TallerPintura.Persistence - DbContext y migraciones
- TallerPintura.Infrastructure - Repositorios y UnitOfWork
- TallerPintura.Application - DTOs, servicios y contratos
- TallerPintura.API - Controllers y configuración

## Tecnologias

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core 9
- SQL Server
- AutoMapper

## Endpoints

### Estudiantes
- GET /api/estudiantes - Obtener todos
- GET /api/estudiantes/{id} - Obtener por ID
- GET /api/estudiantes/nivel/{nivel} - Obtener por nivel
- POST /api/estudiantes - Crear
- PUT /api/estudiantes/{id} - Actualizar
- DELETE /api/estudiantes/{id} - Eliminar

### Obras
- GET /api/obras - Obtener todas
- GET /api/obras/{id} - Obtener por ID
- GET /api/obras/estudiante/{id} - Por estudiante
- GET /api/obras/tecnica/{tecnica} - Por tecnica
- POST /api/obras - Crear
- PUT /api/obras/{id} - Actualizar
- DELETE /api/obras/{id} - Eliminar

### Sesiones
- GET /api/sesiones - Obtener todas
- GET /api/sesiones/{id} - Obtener por ID
- GET /api/sesiones/proximas - Proximas sesiones
- POST /api/sesiones - Crear
- PUT /api/sesiones/{id} - Actualizar
- DELETE /api/sesiones/{id} - Eliminar
- POST /api/sesiones/{id}/inscribir/{estudianteId} - Inscribir estudiante

### Exposiciones
- GET /api/exposiciones - Obtener todas
- GET /api/exposiciones/{id} - Obtener por ID
- GET /api/exposiciones/activas - Exposiciones activas
- POST /api/exposiciones - Crear
- PUT /api/exposiciones/{id} - Actualizar
- DELETE /api/exposiciones/{id} - Eliminar
- POST /api/exposiciones/{id}/obras/{obraId} - Agregar obra

## Autor

Ranfy Alejandro Reyes Moreno