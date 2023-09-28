# 6.1040 Recitation 4 (Based on Backend starter code)

## Setup

Run `npm install` to install dependencies.

If you are using VSCode/VSCodium, install the ESLint and Prettier extensions.
The project is already configured to use ESLint and Prettier,
but feel free to add your own rules if you want.
Right now, the code is formatted on save; you can change this in `.vscode/settings.json`
by disabling `editor.formatOnSave`.

## Getting Started

### Creating MongoDb Atlas Instance
To run the server, you need to create a MongoDb Atlas instance and connect your project. Feel free to follow the instructions below or use these [slides](https://docs.google.com/presentation/d/1HJ4Lz1a2IH5oKu21fQGYgs8G2irtMqnVI9vWDheGfKM/edit?usp=sharing).
1. Create your [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account.
2. When selecting a template, choose the __free__ option, M0. 
3. At the Security Quickstart page, select how you want to authenticate your connection and keep the rest of the defaults.
4. Once created, click the __CONNECT__ button, select __driver__, and copy the srv connection string. If using username and password, the url should look something like this: `mongodb+srv://<username>:<password>@cluster0.p82ijqd.mongodb.net/?retryWrites=true&w=majority`. Make sure to replace username and password with your actual values.
5. Now go to your project files and create a new file at the root directory called `.env` (don't forget the 'dot' at the front). Add the line (without `<` and `>`)
    ```
    MONGO_SRV=<connection url>
    ```
    to the `.env` file. 

__Congrats!__ You're ready to run locally! Don't hesitate to reach out if you run into issues.  

## Complete the TODOs in `server/concepts/label.ts` and `server/routes.ts` and `public/utils.ts`

Feel free to edit anything besides framework as long as you maintain concept modularity. 

Hint: remember to use `await` when returning values from async functions.

## Running Locally

Run `npm start` to start the server and the testing client.
If you make changes to code, you need to manually restart the server.

Run `npm watch` to watch for changes and restart the server automatically.
Note that this is not recommended when actively developing;
use this when testing your code so your small changes get reflected in the server.

## Testing

There is a testing client under `public` directory.
Locate to `http://localhost:3000` after running the server
via `npm run start` to see the testing client.
Add more operations to `public/util.ts` to test your server code.
Make sure to refresh the page after making changes to the client code.
Add some fancy CSS to make your page look nicer!

Keep in mind that we are using `MongoStore` for session management,
so your session will be persisted across server restarts.

## Understanding the Structure

The main entry point to the server is `api/index.ts`.
This is how the server is started and how the routes are registered.

The code for the server is under `server/` directory,
which includes both concept and RESTful API implementations.

Here's an overview of the files and directories:
- `server/concepts` contains the concept implementations.
Note that we try to keep concepts as modular and generic as possible.
- `server/concepts/errors.ts` contains the base error classes you can
either directly use or extend from. You are free to add more base errors
in that file if you need to
(e.g., if your route needs to return [I am a teapot](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) error).
- `server/framework/` contains the framework code that does the magic to convert your
route implementations and error handling into Express handlers.
You should't edit this directory, but feel free to take a look!
- `server/app.ts` contains your app definition (i.e., concept instantiations).
- `server/db.ts` contains the MongoDb setup code. You don't need to edit this file.
- `server/routes.ts` contains the code for your API routes.
Try to keep your route definitions as simple as possible.
