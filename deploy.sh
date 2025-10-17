#!/bin/bash

# Удаляем старую папку .next если есть
rm -rf .next

# Собираем проект
npm run build

# Копируем содержимое .next в папку docs
rm -rf docs
cp -r .next docs

# Копируем public в docs
cp -r public docs/

# Копируем package.json для информации
cp package.json docs/