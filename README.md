# piring
A Node.js project template using Gulp and Browserify and other things. 
This project is inspired by [this blog](https://blog.engineyard.com/2015/client-side-javascript-project-gulp-and-browserify)

## Included modules
* Browserify
* Bootstrap
* Backbone

## Installation
Clone the project into your local machine
```
$ clone https://github.com/npatmaja/piring.git
$ cd piring
$ npm install
```
then, the next is up to you!

## Project Structure
```
.
├── build
│   ├── app.css
│   ├── app.js
│   └── client-test.js
├── client
│   ├── index.js
│   └── less
│       └── index.less
├── config
│   ├── development-config.js
│   ├── express.js
│   └── index.js
├── public
│   ├── images
│   ├── index.html
│   ├── javascripts
│   │   ├── app.js
│   │   └── app.min.js
│   └── stylesheets
│       ├── app.css
│       └── app.min.css
├── routes
│   └── api.js
├── server
│   ├── controllers
│   │   └── users.js
│   └── logics
├── test
│   ├── client
│   │   ├── index.html
│   │   └── index.js
│   └── server
│       └── controllers
│           └── test-users.js
├── views
├── .gitignore
├── .jshintrc
├── gulpfile.js
├── index.js
├── package.json
└── server.js
```

## Available Gulp tasks
### lint-client
```
$ gulp lint-client
```
Linting the client js code based on the specified rule in `.jshintrc` file.

### lint-test 
```
$ gulp lint-test
```
Linting the test code based on the specified rule in `.jshintrc` file.

### lint-server
```
$ gulp lint-server
```
Linting the server js code based on the specified rule in `.jshintrc` file.

### browserify-client
```
$ gulp browserify-client
```
Browserify client js code into a single file under `build/app.js` and 
also copy it to `public/javascripts/app.js`. The task will creates
the necessary directories if they are not present.
#### Prerequisite
* `lint-client`

### browserify-test
```
$ gulp browserify-test
```
Browserify test for client side js into a single file under `build/client-test.js`.
#### Prerequisite
* `lint-test`

### test-client
```
$ gulp test-client
```
Run the test for client side js.
#### Prerequisite
* `lint-test`
* `browserify-test`

### watch
```
$ gulp watch
```
Watch the changes of the client side code, i.e., javascripts and stylesheets (less).

### styles
```
$ gulp styles
```
Compile the `client/less/index.less` into `build` directory and also a copy to
`public/stylesheets/app.css`.

### minify
```
$ gulp minify
```
Minify the css, resulting a `app.min.css` under `public/stylesheets` directory.
#### Prerequisite
* `styles`

### uglify
```
$ gulp uglify
```
Uglify the javascript, resulting `app.min.js` under `public/javascripts` directory.
#### Prerequisite
* `browserify-client`

### build
```
$ gulp build
```
Build the client site javascripts and css code.
#### Prerequisite
* `uglify`
* `minify`

### test 
```
$ gulp test
```
Run all client and server tests.
#### Prerequisite
* `server-test`
* `client-test`

### run
```
$ gulp run
```
Run the Node.js server and watch for changes in server side code using nodemon.

### default
```
$ gulp
```
The default task, comprises of `build`, `watch` and `run`.