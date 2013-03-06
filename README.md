### Latest release: [https://github.com/douglasback/widget-the-people](https://github.com/douglasback/widget-the-people)

## Contents

 - [About](#about)
 - [Usage](#usage)
   - [Deploying the app](#deploying-the-app)
   - [Creating a widget](#creating-a-widget)
 - [Technical details](#technical-details)
 - [Developers](#developers)
 - [Authors / Maintainers](#authors-maintainers)



## About

Widget the People is a [Node.js][node] application that enables petition creators and webmasters to embed a widget that promotes a particular petition on [We the People][wtp].

A sample deployment is available at [petition-promoter.herokuapp.com][wtpapp]

[node]:http://nodejs.org
[wtp]:https://petitions.whitehouse.gov
[wtpapp]:https://petition-promoter.herokuapp.com

## Usage

### Deploying the app 

1) Clone this repository: `git clone git@github.com:douglasback/widget-the-people.git`

2) Install the required node modules:
  ```
  npm install
  ```

2) Set your API key:
  
  - If running locally, create an `.env` file and set a value for `WTP_API_KEY`
  
  - If running on Heroku, run 
  ```
  heroku config:add WTP_API_KEY=[YOUR API KEY]
  ```
  (replace "YOUR API KEY" with your actual key, of course)
  
3) To run a local instance, `cd` to the project directory and run
  ```
  node app.js
  ```
  The app will be available at `http://localhost:5000/`.

You can also deploy this app to a [PaaS][paas] provider like Heroku or AppFog. (The Procfile in this repository is currently designed to work with Heroku.)

### Creating a widget

When running, the app takes a petition title inputted by the user and generates code in the form of an `<iframe>` that the user can copy and paste into their own website.
  
The iframe's `src` attribute refers to the app instance, so it must be available in order for the widget to function once embedded.

[paas]: http://en.wikipedia.org/wiki/Platform_as_a_service


## Technical details

  - Languages: Node.js, HTML, JavaScript, Compass, and SCSS
  - Libraries / Frameworks: jQuery, Underscore.js, Bootstrap Typeahead.js, Grunt.js
  - Data formats used: JSON, JSONP


## Developers

The widget generation page bootstraps itself on load by making an API call to get the list of petitions. If the API is slow or not returning responses, the app will fail to function as expected.

One advantage of using Node.js to generate the widget is to reduce the number of client-side resources required by the `<iframe>`.
  
The app relies on an API key being set as an environment variable. If the API key is not set, the app will not function as expected. 

## Authors / Maintainers

Widget the People was developed by Douglas Back.

## Ideas for Future Enhancements

An unprioritized todo list of sorts.

- Allow users to customize the look and feel of the widget (to some degree, e.g. color scheme, fonts).
- Provide a method to allow users to embed HTML/CSS directly rather than rely on the iframe.
