# Sistema de Reservas de Canchas

Este proyecto es una API REST que permite gestionar un complejo deportivo.
Los usuarios pueden consultar qué canchas hay disponibles y reservarlas por hora.

### El sistema contempla:

- Registrar canchas de diferentes tipos (F5, F6, F11)

- Definir automáticamente su precio mediante el **Factory Method**

- Permitir que los usuarios reserven turnos de 1 hora

- Detectar choques de horario

- Notificar a usuarios interesados cuando un turno se libera **(Observer)**

- Eliminar canchas junto a sus reservas asociadas, enviando notificaciones a los usuarios

# Tecnologías

- Node.js + Express

- TypeScript

- Archivos JSON como base de datos

- Swagger

# Patrones de Diseño

> ## Factory Method

Se utiliza para la creación de canchas según su tipo.

- Al registrar una cancha, el sistema decide si es F5, F6 o F11 y asigna precio automáticamente.

- Evita que la lógica se repita y permite agregar nuevos tipos sin modificar el codigo existente.

> ## Observer

Se usa para manejar notificaciones cuando:

- Un usuario intenta reservar un turno ocupado, entonces queda en “lista de espera”

- Se cancela una reserva

- Se elimina una cancha y a la vez la reserva.

Los Observers pueden ser distintos módulos como email, logger, whatsapp, etc. Esta implementacion lo simula mediante `console.log()`

Así que cada vez que ocurre un evento en las reservas, los observers reaccionan automaticamente.

### Ejemplo

- Un usuario intenta reservar un turno ocupado; queda registrado como interesado. Si ese turno se libera, el Subject notifica automáticamente a los observers.

# Estructura del proyecto

```bash
src/
 ├── controllers/
 │    ├── field.controller.ts
 │    ├── reservation.controller.ts
 │    └── user.controller.ts
 │
 ├── routes/
 │    ├── field.routes.ts
 │    ├── reservation.routes.ts
 │    └── user.routes.ts
 │
 ├── services/
 │    ├── FieldService.service.ts
 │    ├── ReservationService.service.ts
 │    └── UserService.service.ts
 │
 ├── models/
 │    ├── field.model.ts
 │    ├── reservation.model.ts
 │    ├── user.model.ts
 │
 │    ├── footballFields/
 │    │     ├── F5.models.footballField.ts
 │    │     ├── F6.models.footballField.ts
 │    │     └── F11.models.footballField.ts
 │
 │    ├── observer/
 │    │     ├── observer.interface.ts
 │    │     ├── subject.interface.ts
 │    │     └── reservation.interface.ts
 │
 │    └── implementations/
 │          └── mock/
 │               ├── mockField.ts
 │               ├── mockUser.ts
 │               └── mockReservation.ts
 │
 ├── factories/
 │    └── field.factory.ts
 │
 ├── database/                # Permanencia de datos en archivos JSON
 │    ├── fields.json
 │    ├── users.json
 │    └── reservation.json
 │
 ├── utils/
 │    └── jsonFunctions.utils.ts
 ├── app.ts
 ├── server.ts
 ├── swagger.ts

```

---

# Instalacion

1- Clonar repositorio

```bash
git clone https://github.com/marcosborri/TurnosParaCancha.git
```

2- Ingresar a la carpeta del proyecto

```bash
cd TurnosParaCancha
```

3- Ejecutar instalacion de dependencias

```bash
npm install
```

4- Ejecutar

```bash
npm run build
```

5- Levantar el servidor ejecutando

```bash
npm run dev
```

# Flujo de Uso

1. El administrador crea las canchas (ej: F5, F6, F11).

   - La Factory asigna automáticamente el precio.

2. El usuario consulta las canchas disponibles.

3. El usuario crea una reserva en un horario.

   - JSON guarda el registro.
   - Si esta ocupada, en el caso que se libere se le avisara al usuario que quizo reservarla

4. Si se elimina la cancha las reservas asociadas a la misma se eliminaran y se le avisar al usuario dueño de la reserva y a las personas que esperaban que se liberara.

5. Si se cancela la reserva, se dispara la notificación a los observers.

# API

### Swagger

http://localhost:3000/api-docs

### Postman Collection

https://crimson-capsule-804402.postman.co/workspace/My-Workspace~bf3b43f8-d000-417c-8f03-03490c707f31/collection/32203895-b867ad8c-9dc4-42b6-b70e-81c0cd3d625e?action=share&creator=32203895

# Integrantes del grupo

Romero Mariano

Ramos Cavero Luciano

Borri Marcos
