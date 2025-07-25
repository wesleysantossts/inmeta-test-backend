#!/bin/sh
set -e

echo "Iniciando aplicação..."

echo "Aplicando migrations..."
npm run db:deploy

echo "Executando generate..."
npm run db:generate

echo "Aplicação pronta!"

exec npm start