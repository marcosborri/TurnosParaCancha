#  Sistema de Reservas de Canchas
Este proyecto es una API REST que permite gestionar un complejo deportivo.
Los usuarios pueden consultar qué canchas hay disponibles y reservarlas por hora (máximo 1h por turno).

### El sistema contempla:

Canchas de distintos tamaños (F5, F7, F11), cada una con un precio predefinido.

Reservas de hasta una hora exacta (ejemplo: de 08:00 a 09:00).

Validación de solapamiento (no se pueden reservar dos turnos en la misma cancha y horario).

# Tecnologías

* Node.js + Express

* TypeScript

* Sequelize + PostgreSQL

* Docker


# Patrones de Diseño

> ##  Factory Method

Se utiliza para la creación de canchas según su tipo.

### Ejemplo

* al registrar una cancha, la fábrica decide si es F5, F7 o F11 y asigna precio automáticamente.

Evita que la lógica de precios esté dispersa por el código.

> ## Observer
Usado para manejar notificaciones cuando se crea o cancela una reserva.

El Subject es la reserva.

Los Observers pueden ser distintos módulos: notificador por email, logger, integración con un sistema externo.

Así, cada vez que ocurre un evento en las reservas, los observers suscriptos reaccionan automáticamente. 

### Ejemplo

* Supongamos que la cancha F5 a las 18:00 ya está ocupada. El usuario Jorge intenta reservar, pero el sistema responde:
{"error": "Turno ocupado"}. Sin embargo, Jorge puede marcar interés en ese turno (como una "lista de espera"). Si el turno se llega a cancelar, el Subject (Reserva) notifica a todos los Observers

# Estructura del proyecto
```src/
 ├── controllers/
 │    ├── field.controller.ts
 │    └── reservation.controller.ts
 ├── factories/
 │    └── field.factory.ts
 ├── observers/      
 │    ├── observer.interface.ts
 │    ├── reservation.subject.ts
 │    ├── email.observer.ts
 │    └── logger.observer.ts
 ├── models/
 │    ├── field.model.ts
 │    └── reservation.model.ts
 ├── routes/
 │    ├── field.routes.ts
 │    └── reservation.routes.ts
 ├── db/
 │    └── connection.ts
 ├── app.ts
 └── server.ts
```
# Flujo de Uso 

1) El administrador crea las canchas (ej: F5, F7, F11).

    * La Factory asigna automáticamente el precio.

2) El usuario consulta las canchas disponibles.

3) El usuario crea una reserva en un horario.

    * Sequelize guarda el registro.

    * El Subject (Reserva) notifica a todos los Observers suscriptos.


4) Si se cancela la reserva, también se dispara la notificación a los observers.

# ENDPOINTS
>Endpoints de cancha (pueden terminar habiendo mas)

* Crear cancha: POST /api/fields

* Listar cancha: GET /api/fields

>Endpoints de las reservas (pueden terminar habiendo mas)

* Crear reserva: POST /api/reservas

* Cancelar reserva: DELETE api/reservas/:id


# Integrantes del grupo

Romero, Mariano

Ramos Cavero, Luciano

Borri, Marcos

# Aclaraciones
Lo planteado es el MVP del proyecto, si vemos que andamos bien con el tiempo vamos a integrar un frontend para la API, o futuras funciones que se nos ocurran