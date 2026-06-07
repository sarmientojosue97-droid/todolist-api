#  todos los pasos para que funcione el Backend

> Es muy importante `Descargar` e `Instalar` 3 programas para que funcione mi TodoList

> y esos 3 programas se deben `Agregar` al `PATH`, ya que se usara el CMD para instalar

> el `1ºprograma` y `2ºprograma`, son de `mongoDB`

> el `1ºPrograma`, sirve para instalar todo lo que nesesita la base para su correcto funcionamiento, aqui tube un `pronblema de compatibilidad` y use la vercion `mongodb-windows-x86_64-5.0.33-signed`
```bash
https://www.mongodb.com/try/download/community
```
> el `2ºPrograma`, son `MongoDB Command Line Database Tools` sirve para descargar un `paquete ZIP con 3 archivos` que te permiten restaurar los datos de pruebas, mediante comandos  , `mongoexport.exe`, `mongoimport.exe`, `mongorestore.exe`

> despues de descomprimir esos archivos con `.exe`, deben `copiarse` a la `carpeta donde se instalo mongoDB`, en la carpeta `bin`, en mi caso fue en `C:\Program Files\MongoDB\Server\5.0\bin`
```bash
https://www.mongodb.com/try/download/database-tools

o mas especifico

https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.17.0.zip
```
> el `3ºPrograma` es para tener OpenSSL `instalado`, en micaso descarge `Win64OpenSSL-4_0_0.exe`
```bash
https://slproweb.com/products/Win32OpenSSL.html
```

  ### Para que el sistema reconozca los comandos de Mongo y de OpenSSL desde cualquier terminal, debe agregar las rutas de instalación a las Variables de Entorno de Windows:

1. Presione la tecla Windows, escriba "Variables de entorno" y abra "Editar las variables de entorno del sistema".
2. Haga clic en el botón Variables de entorno.
3. En la sección Variables del sistema, busque la variable llamada Path y selecciónela, luego haga clic en Editar.
4. Haga clic en Nuevo y agregue las siguientes dos rutas exactas:
   * `C:\Program Files\MongoDB\Server\5.0\bin` (Aquí estarán MongoDB y las Database Tools)
   * `C:\Program Files\OpenSSL-Win64\bin` (Ruta por defecto de OpenSSL)
5. Haga clic en Aceptar en todas las ventanas para guardar los cambios.


---

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