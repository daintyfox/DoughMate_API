Inventory Management System with Product BOM and Production Capabilities

Overview:
  so far a simple skeleton of an API to manage user, roles, and permissions.
  Lots of features pending to be implemented

Key features and functionalities:
  working so far basic CRUD operations for the current models

Technologies Used:
  Express, Sequelize, Postgres

Getting Started:
  - Install postgres database
  - create a .env file and populate the DB connection url and public and private keys
  - run the server.js file
  
Usage:
  for now api can be used with an app like POSTMAN to send and recieve data since no UI has been developed

command for generating the jwtRS256 key
  - ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
  - openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

