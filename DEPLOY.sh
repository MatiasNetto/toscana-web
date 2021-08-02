#!/bin/bash


rm -r ./deploy/public/*
cp ./build/* ./deploy/public/

sleep 5

cd ./deploy

firebase deploy
