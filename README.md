# Events API

El siguiente proyecto sumistra información o datos de eventos.

## Requerimientos de Software

Asegúrate de tener instalados los siguientes programas antes de ejecutar el proyecto:

- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/)

## Configuración previa del Proyecto
Antes de ejecutar el proyecto, asegúrate de renombrar y eliminar la extensión `.sample` de los siguientes archivos en el directorio raíz del proyecto:

- `/.env.sample`: Renombra este archivo a `.env`.
- `/Dockerfile.sample`: Renombra este archivo a `Dockerfile`.
- `/docker-compose.yml.sample`: Renombra este archivo a `docker-compose.yml`.

Luego necesitamos remplazar el contenido del archivo .env de la siguiente forma:

```bash

DB_HOST={host  de  la  base  de  datos}

```

Cambiar {host de la base de datos} cambiar por el host correspondiente.

```bash

DB_HOST=192.168.1.16  por  ejemplo

```

## Configuración Proyecto
1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/ingestebancorrea/events-manegement-back.git

2. Instalación de Dependencias
    Después de clonar el repositorio y realizar la configuración previa, instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal dentro del directorio del proyecto:

    ```bash
    npm install 

3. Ejecutar proyecto con el siguiente comando:
    ```bash
    npm run dev

# Licencia
Este proyecto está bajo la Licencia MIT.

 