# sale-order

## PUESTA EN MARCHA

Crear archivo .env con las siguientes variables
```
# SERVER
SERVER_PORT=3001
SERVER_PREFIX=/api
SERVER_VERSION=/v1

# DB
DB_USERNAME=root
DB_PASSWORD=root
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=devDataBase

# SALE_ORDER
SALE_ORDER_PREFIX=MB
```

Ejecutar el comando de npm para iniciar el servicio.

```sh
npm run start:docker
```

Una vez el servicio inicie ejcutar el comando de npm para ejecutar las pruebas unitarias y e2e

```sh
npm run test
```
