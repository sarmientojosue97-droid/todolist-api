
#  todos los pasos para que funcione el Fronted

### Tecnologías
- React
- Vite
---

## Instalacon paso a paso

### Paso 1: Clonar o descargar el proyecto de fronted

### Paso 2: Instalar dependencias

```bash
npm install
```
### Paso 3: Generar certificados SSL HTTPS para que vite tenga conexion segura

Los certificados son para HTTPS en localhost y para que tenga usted sus propios cerificados se usa en la carpeta raiz:

```bash
openssl req -x509 -newkey rsa:4000 -keyout llave.pem -out certificado.pem -sha256 -days 365 -nodes

```

> o puedes copiar el ` llave.pem`  y ` certificado.pem`, que hiso para el ` Backend` 

### Paso 4: Levantar el servidor de desarrollo

npm run dev

https://localhost:5173