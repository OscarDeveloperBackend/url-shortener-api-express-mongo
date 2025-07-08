# 🔗 Acortador de URLs en Node.js con Express y MongoDB

Este proyecto es un **acortador de URLs** desarrollado con **Node.js**, **Express** y **MongoDB** (mediante Mongoose). Está diseñado como una **API RESTful** que permite acortar URLs largas, redirigirlas y realizar un conteo de clics. No cuenta con frontend todo el funcionamiento se basa en endpoints consumibles desde herramientas como Postman, cURL o desde un frontend externo.

El proyecto está estructurado para soportar distintos entornos (`development` y `production`) utilizando variables de entorno mediante un archivo `.env`. La base de datos en esta versión es MongoDB, pudiendo estar alojada localmente o en un proveedor como MongoDB Atlas o Railway.

## 🛠️ Características

- 🚀 Servidor backend construido con **Express.js**.
- 🔗 Endpoints REST para **acortar** y **redirigir**.
- 🧠 Validación de URLs para asegurar que existan antes de acortarlas.
- 🧩 Arquitectura modular organizada en la carpeta `src/`.
- 🗃️ Persistencia de datos con **MongoDB**, utilizando **Mongoose**.
- ⚙️ Uso de variables de entorno con `.env` para mayor flexibilidad en desarrollo y producción.
- 📊 Conteo de clics para cada URL acortada.

## 🚀 Cómo ejecutar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/OscarDeveloperBackend/url-shortener-api-express-mongo.git
   ```

2. Instala las dependencias e inicia el servidor:

   ```bash
   npm install
   ```

3. Crea un archivo .env en la raíz del proyecto y añade tus variables de entorno:

   ```
    Puedes guiarte por el archivo .env.example incluido en el repositorio.
   ```

4. Inicia el servidor en modo desarrollo:
   ```
   npm run dev
   ```

## 📡 Endpoints disponibles

### 🔍 `GET /`

Devuelve todos los registros guardados en el archivo `.json`.

```
GET http://localhost:3000/
```

---

### ✂️ `POST /`

Crea una nueva URL acortada.

```
POST http://localhost:3000/urls
```

**Body (JSON):**

```json
{
  "url_base": "https://www.youtube.com/"
}
```

**Respuesta:**

```json
{
  "url_recortada": "hhttp://localhost:3000/urls/redict/Lic7B"
}
```

### 🚀 `GET /redict/:code`

Redirige a la URL original correspondiente al código corto generado.

```
GET http://localhost:3000/urls/redict/Lic7B
```

Esto redirigirá a:

```
https://www.youtube.com/
```
