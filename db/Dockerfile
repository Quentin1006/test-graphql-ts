FROM postgres:13

COPY scripts/create-api-db.sql /docker-entrypoint-initdb.d
COPY scripts/create-gql-server-db.sql /docker-entrypoint-initdb.d

