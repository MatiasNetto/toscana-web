#!/bin/bash


git checkout main
npm run build

sleep 15

rm -r ./deploy/public/*
cp ./build/* ./deploy/public/

sleep 5

cd ./deploy

firebase deploy
