## Run Locally

Install project with yarn

```bash
   yarn
``` 

to initilize Prisma
``` 
    yarn db:init   
``` 

to run DataBase migrations
``` 
    yarn db:migrate   
``` 

if you want to create DataBase migration
``` 
    yarn db:migrate:create migration-name   
``` 

to seed data to db 

``` 
  yarn db:seed   
``` 

to see your database while running  

``` 
   yarn db:view   
```

to Run the project 

``` 
    yarn dev   
```  

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5000` 

`DATABASE_URL="mysql://root:@localhost:3306/bookarchive"`

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

