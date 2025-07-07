APIs con Bases de datos

Objetivo
Desarrollar una API RESTful que permita la gestión de usuarios y sus respectivas listas de tareas (ToDos). La API deberá construirse utilizando Node.js con Express, una base de datos PostgreSQL y el ORM Prisma.

Requisitos Funcionales

    Los campos id de ambas tablas deben ser enteros autoincrementados
    La relación entre los usuarios y los ToDos se hace de forma 1 a muchos mediante el campo userId de la tabla todos. Este campo debe relacionarse con el id de la tabla users
    La API debe ofrecer los siguientes endpoints:


Usuarios (/users)
La tabla users debe tener los siguientes campos: id, username, email

    Crear Usuario: POST /users | Payload: { "username": "string", "email": "string" } | Respuesta: El nuevo objeto de usuario creado.
    Obtener Todos los Usuarios: GET /users | Respuesta: Un array de objetos de usuario.
    Obtener Usuario por ID: GET /users/:id | Respuesta: El objeto de usuario correspondiente al ID.
    Actualizar Usuario: PUT /users/:id | Payload: { "username": "string", "email": "string" } (uno o ambos campos son opcionales para actualizar) | Respuesta: El objeto de usuario actualizado.
    Eliminar Usuario: DELETE /users/:id | Respuesta: Mensaje de confirmación o el objeto de usuario eliminado.

Tareas (ToDos) (/users/:userId/todos)
La tabla de todos debe tener los siguientes campos: id, label, completed, userId

    Crear Tarea para un Usuario: POST /users/:userId/todos | Payload: { "label": "string", "completed": "boolean" } | Respuesta: El nuevo objeto de tarea creado.
    Obtener Todas las Tareas de un Usuario: GET /users/:userId/todos | Respuesta: Un array de objetos de tarea asociados al userId.
    Obtener Tarea Específica de un Usuario: GET /users/:userId/todos/:todoId | Respuesta: El objeto de tarea correspondiente al todoId y userId.
    Actualizar Tarea de un Usuario: PUT /users/:userId/todos/:todoId | Payload: { "title": "string", "description": "string", "completed": "boolean" } (uno o más campos son opcionales para actualizar) | Respuesta: El objeto de tarea actualizado.
    Eliminar Tarea de un Usuario: DELETE /users/:userId/todos/:todoId | Respuesta: Mensaje de confirmación o el objeto de tarea eliminado.

Esquema de Prisma:

    Definir los modelos User y Todo en schema.prisma.
    El modelo User debe tener al menos id (autogenerado), username (único) y email (único).
    El modelo Todo debe tener al menos id (autogenerado), label, completed (booleano, por defecto false) y una relación con User para indicar a qué usuario pertenece (userId).
    Utilizar prisma migrate dev para generar las migraciones y aplicar el esquema a la base de datos.