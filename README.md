# Nile-mithril - Online Bookstore

This is an online bookstore written on mithril.js framework, based off [`nile-server`](https://www.npmjs.com/package/nile-server). This bookstore app demonstrates all aspects of online shopping, such as user authentication, shopping history, inventory tracking, product search etc.

## Running the App

Check out [Demo on AWS](http://nile-mithril.s3-website.us-east-2.amazonaws.com).

This app works in tandem with `nile-server`. nile-server runs the backend, while this app runs as the frontend.

Type the following to run nile-server on port 3570:
```
npx nile-server
```

Do the following to run nile-mithril on your browser:
* clone this [git repo](https://github.com/johnfliu818/nile-mithril)
* go to cloned repo directory
* `npm install` to install dependencies
* `npm run dev` to run it in dev mode

## Features

* true multi-user environment
* server persistence of transactions
* shopping cart persistence across sessions
* shopping history tracking
* product searching
* real-time inventory checking and warning

## Directory Structure

This application is created using [`create-mithril-app`](https://www.npmjs.com/package/create-mithril-app). It has two main folders:

* `client` - Javascript code
* `public` - index.html, css, and images

## Architecture

This app uses `route-based` architecture. Each route represents a page, and has its own state. This architecture reduces dependencies between different parts of the application, and prevents exponential complexity growth as the application becomes larger.

Some state has to be shared between pages, such as user login session. This information is stored as a singleton object in file `modelactions.js`. Leveraging the module system, this file can simply be imported and used by every component. This avoids the tedium of passing state objects down the hierarchy tree.

## Interact with nile-server

* [More about nile-server](https://www.npmjs.com/package/nile-server)

[`nile-server`](https://www.npmjs.com/package/nile-server)'s API is mostly simple JSON CRUD operations, with some querying capabilities to tie different resultsets together. This simplicity makes consuming the API pretty straightforward.

## To Do

* replace window alerts with modal message boxes
* add ability to replenish balance
* improve search