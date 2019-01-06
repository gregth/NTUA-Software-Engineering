# Getting to run the backend

## Prepare the config file

1. Copy the config.sample.json file into config.json

   ```
   cp config.sample.json config.json
   ```



## Set up the database

Set up the database using mySQL Workbench, or any other database manager.

1. Import database schema located in migrations/schema.sql
2. Create a user for your database with password. 
3. In config.json, set up the user and the password for that user 



## Set up the port

1. In config.json set up the port you want the backend api to be running on.



## Start the app

1. From within the **backend** directory, run:

   ```
   node index.js
   ```