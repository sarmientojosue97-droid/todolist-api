#  todos los pasos para que funcione el Backend

# Tecnologias

- Node.js + Express
- MongoDB
- Passport + Google OAuth 2.0
- JWT
- Multer v1
- HTTPS

---

# Requisitos previos

Instalar en tu computadora antes de continuar:  
```bash
Node.js --- MongoDB --- OpenSSL
```

---

## Instalacon paso a paso

### Paso 1: Clonar o descargar el proyecto
### Paso 2: Instalar dependencias

```bash
npm install
```

> Si hay prblemas con multer
> ```bash
> npm uninstall multer
> npm install multer@1.4.5-lts.1
> ```

### Paso 3:  Configurar las variables de entorno

Copia el archivo de ejemplo que esta en la capeta `Recursos_Para_Funcionar` a la raiz y renombralo como `.env`y completalo con tus credenciales:
Abre el archivo `.env` con cualquier editor y completa los campos marcados.

Campos que debes cambiar obligatoriamente por tus datos


`GOOGLE_CLIENT_ID` ==== tu Client ID de Google Cloud Console

`GOOGLE_CLIENT_SECRET` ==== tu Client Secret de Google Cloud Console.

`JWT_SECRET` ==== cualquier texto largo y aleatorio, `abajo se muestra como generar`

`SESSION_SECRET` ==== otro texto largo y aleatorio

Como generar un secreto aleatorio (ejecutar en terminal):
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Cómo obtener las credenciales de Google:
1. Ve a https://console.cloud.google.com
2. Crea un proyecto (o usa uno existente)
3. Ve a APIs y servicios, Credenciales
4. Clic en Crear credenciales, ID de cliente de OAuth 2.0
5. Tipo de aplicación: Aplicación web
6. En URI de redireccionamiento autorizados agrega:

```
https://localhost:4000/api/auth/google/callback
```
7. Copia el Client ID y Client Secret a tu `.env`

### Paso 4: Generar certificados SSL HTTPS , en la raiz de tus carpetas

Los certificados son para HTTPS en localhost y para que tenga usted sus propios cerificados se usa:

```bash
openssl req -x509 -newkey rsa:4096 -keyout llave.pem -out certificado.pem -sha256 -days 365 -nodes -subj "/CN=localhost"
```

Esto crea `llave.pem` y `certificado.pem` en la raiz del proyecto.

### Paso 5: Verificar que MongoDB esta corriendo

### Paso 6:Poblar la base de datos con datos de prueba

Tienes dos opciones en la carpeta `Recursos_Para_Funcionar`:

#### Opcion A — Datos nuevos genericos, recomendada para pruebas rapidas

```bash
node "Recursos_Para_Funcionar/Opcion A Repoblar - Datos nuevos/x-seed-.js"
```

#### Opcion B — Restaurar base de datos de demostracion

>Requiere que `mongoimport` esté en el PATH (viene con MongoDB Tools).

```bash
mongoimport --db=todolist_v2_db --collection=tareas    --file="Recursos_Para_Funcionar/Opcion B Restaurar - Restaurar Base de datos/lote_tareas.json"    --jsonArray --drop

mongoimport --db=todolist_v2_db --collection=usuarios  --file="Recursos_Para_Funcionar/Opcion B Restaurar - Restaurar Base de datos/lote_usuarios.json"  --jsonArray --drop

mongoimport --db=todolist_v2_db --collection=archivos  --file="Recursos_Para_Funcionar/Opcion B Restaurar - Restaurar Base de datos/lote_archivos.json"  --jsonArray --drop
```

> Los archivos físicos del módulo Drive (los `.txt` de prueba) están en la carpeta:

> `Recursos_Para_Funcionar/Opcion B Restaurar - Restaurar Base de datos/uploads_demo/`.

> Cópialos a la carpeta `uploads/` del proyecto para que las descargas funcionen.

### Paso 8 — Iniciar el servidor

```bash
npm run devstart
```

**Salida esperada en terminal:**
```
Conectado a MongoDB
Servidor seguro en https://localhost:4000
Login: https://localhost:4000/api/auth/google
Tareas: https://localhost:4000/api/tareas
Archivos: https://localhost:4000/api/archivos
```

### lo que se espera y donde esta todo

`backend`

│   .env

│   .gitignore

│   certificado.pem

│   llave.pem

│   package-lock.json

│   package.json

│   README.md

│   servidor.js

│

├───`config`

│       passport.js

│

├───`controladores`

│       controlador_archivo.js

│       controlador_auth.js

│       controlador_tarea.js

│

├───`middlewares`

│       respuesta.js

│       verificarToken.js

│

├───`modelos`

│       archivo.js

│       tarea.js

│       usuario.js

│

├───`Recursos_Para_Funcionar`

│   ├───Opcion A Repoblar - Datos nuevos

│   │       x-seed-.js

│   │

│   └───Opcion B Restaurar - Restaurar Base de datos

│           lote_archivos.json

│           lote_tareas.json

│           lote_usuarios.json

│

├───`rutas`

│       rutas_archivos.js

│       rutas_auth.js

│       rutas_tareas.js

│

└───`uploads`

        1780696612903-p1.txt

        1780697849264-p2.txt