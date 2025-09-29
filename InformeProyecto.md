# Turnero para canchas

## Integrantes

- Ramos Cavero, Luciano
- Borri, Marcos
- Romero, Mariano

## Temática

El proyecto consiste en un sistema de turnos de canchas para distintos deportes.
Al principio lo pensamos para canchas de fútbol pero luego pensamos que era mejor idea abrir las opciones y que sean de diferentes deportes (basquet, hockey, fútbol, pádel, entre otras)

## Tecnologías y Metodologías

Principalmente tendremos en cuenta estos patrones, más adelante pueden surgir otros durante el desarrollo.

Patrones Creacionales:

- **Patrón Factory** ( Permite modelar y crear fácilmente los diferentes tipos de cancha )
- **Singleton** ( Garantiza que haya una única instancia de una clase, en este caso el sistema tendrá un único objeto que se encargue de las reservaciones )

Patrones de Comportamiento:

- **Observer** (El usuario tiene una opción para activar una campana para que se le notifique cada vez que se juegue un torneo, y otra campana para que se le notifique si en un turno cercano falta un jugador en algún equipo [la notificación le especifica horario, cancha, y precio a pagar])

**_Tecnologias_**

- Docker
- Typescript
- Nodejs
- Express
- PostgreSQL
- Sequelize

## Descripción Funcional / Objetivos

Un sistema automatizado de reservas de canchas deportivas, el dueño de las canchas tiene un número limitado de canchas las cuales los usuarios pueden elegir cuál alquilar.
Las reservas consisten de una hora cada una.

## Diagramas

Modelo del sistema
