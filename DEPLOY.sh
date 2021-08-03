#!/bin/bash


git checkout main
npm run build

sleep 2

rm -r ./deploy/public/*
cp -r ./build/* ./deploy/public/

sleep 5

cd ./deploy

firebase deploy


git checkout dev
