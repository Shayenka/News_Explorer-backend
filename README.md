# News_Explorer-backend
En este proyecto se creó una **API REST** para la aplicación **"News Explorer"**, que permite a los usuarios buscar, agregar y guardar artículos de noticias de interes.

## Tecnologías utilizadas
**Node.js**: Plataforma de ejecución de código JavaScript en el servidor.

**Express.js**: Framework web para crear aplicaciones Node.js.

**MongoDB**: Base de datos NoSQL utilizada para almacenar los datos de usuarios y artículos.

**Mongoose**: Biblioteca de modelado de objetos de MongoDB.

**ESLint**: Herramienta para mantener un código JavaScript limpio y consistente.

**Nodemon**: Utilidad para reiniciar automáticamente el servidor cuando se detectan cambios en los archivos durante el desarrollo.

## Estructura de directorios
**/models**: Contiene dos esquemas que definen la estructura de datos para los artículos y los usuarios en la base de datos.

**/controllers**: Define varios controladores que gestionan operaciones para los usuarios y las tarjetas.

**/routes**: Define las rutas de la API y las vinculan con los controladores correspondientes para la gestión de usuarios y tarjetas.

## Ejecutando el proyecto
Para ejecutar el proyecto localmente, sigue los siguientes pasos:

1. Clonar el repositorio:

`git clone https://github.com/Shayenka/News_Explorer-backend/tree/stage-back-end`

2. Para instalar las dependencias del proyecto, asegúrese de tener Node.js y npm instalados. Luego, ejecute el siguiente comando:

`npm install`

3. Crear el archivo .env y agregar las siguientes variables de entorno:
### Variables de entorno
```bash
NODE_ENV=production
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/news_explorer
SECRET_KEY=mysecretkey
```
  
`npm run start` — Para ejecutar la aplicación en un entorno de desarrollo.  
  
`npm run dev` — Para ejecutar la aplicación en modo de desarrollo ( con reinicio automático al guardar cambios).  

El servidor se ejecutará en el puerto 3000 por defecto.

## Endpoints
**POST /signup**: Registro de usuario.\
**POST /signin**: Inicio de sesión de usuario.\
**GET /users/me**: Obtener información del usuario conectado.\
**POST /articles**: Crear un nuevo artículo.\
**GET /articles**: Obtener todos los artículos guardados por el usuario.\
**POST /articles/save**: Guardar un artículo.\
**DELETE /articles/:articleId**: Eliminar un artículo por ID.\
**GET /crash-test**: Ruta de prueba para forzar un error y verificar el manejo de errores.

## Dominios del servidor

api.shayenkalvarado.com

shayenkalvarado.com

www.shayenkalvarado.com

### Autor
Este proyecto fue creado por Shayenka Alvarado a través de **TripleTen**.















