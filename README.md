This project contains two components: api, and app. api is a nodejs/expressjs based application it provides restful apis for fetching and uploading photos; app is a reactjs-based spa (single page application) which contains two pages: weather - display current weather condition for a given location and temperature unit, gallery - display beautiful weather photos.

## api project

### configuration
Environment-specific data are stored in config files. Currently it has two configuration: default and test, each has different port number and photo locations.

### photo file formats
In order to have better performance and user experience, jpeg/jpg image file will be minified and a webp format image will be automatically created. Minifing and converting are done via imagemin and imagemin-web.

### photo file storage
There are couple options to choose in term of storing photo file, network/cloud like aws s3 or local. For the sake of this assignment I choose local because it has almost no dependcy and is simple to implement. 

### security
For the sake of simplicity, authentication and authorization has not been supported in current implementation.

### architecture
There are two layers: routes and controllers. Routes to forward the supported requests to the appropriate controller functions. Controller functions to get photo file urls, get individual photo, upload photo etc.

### unit testing
Unit testings are done with chai, chai-http and mocha. 

### how to run/test
* Test: npm test
* Start: npm start

## app project

### architecture and design patterns
React + Redux. There are three components in redux: actions, reducers, and store. 
It follows the following patterns: container component, function component, controlled input, high-order component.  
Seperate of concern princple has been applied in this app: all react components are splitted two types: prensentional and container. 

### responsive
Weather app is a responsive single page web application. Responsive design is implemented by using bootstrap 4 library.

### peformance
The gallery screen will have a lot of images, the peformance of this page has to be concerned. One way to get better performance is to reduce the file size. Beside to decrease the image's quality in order to reduce the image file size, the WebP image are being used. Webp Images are smaller than their JPEG and PNG counterparts - usually on hte magnitude of a 25-35% reduction in filesize. This decreases page sizes and improve performance. Since WebP is not being supported by all browser yet, so picture and source tag being used in order to serve WebP to newer browsers and a fallback image to older browsers.

### configuration
Environment-specific data are stored .env file. Beside the HOST and PORT info, the .env file also store weather network api base url and our own api base url. Current it has only one .env file which is default. .env.production, env.dev, .env.test can be added later if required.

### atomic design
The idea of Atomic Design is separating the components in atoms, molecules, organisms, templates and pages. Ideally Atomic Design should be applied when developing modern web app, however I didn't follow this approach 100% percent due to time constraint. I broke down complicated pages to small components, for example, a Photo component was created to diplay webp image for supported browsers and display jepg image for older browsers.

### es6 vs typescript
Current implementation is developed with es6 (es2005). It can be ported to typescript in the future if required.

### typechecking
There is no typechecking in current implementation but it can be done eaily by adding propTypes and defaultProps to components.

### internationaliztion (multi-language support )
Currently the weather app supports English only. Another language like French can be supported in the future. There are plenty of third-party open souce nodejs/react libraries which can be used to implement the internationalization for weather app, react-intl, react-localize-redux, just name a few.

### cors
CORS (Corss-origin resource sharing) issue is a known issue when the app and api are located in different domain. For react app, there are couple ways to solve this issue:
* automatic proxying: adding proxy option in package.json
* manual proxying: creating a file src/setupProxy.js and use http-proxy-middleware

### weather icons
Weather icons are being wrapped into a function component named ConditionIcon which takes wxcondition from the weathernetwork api response and try to find the "best matched" icons by checking the wxcondition against list of supported conditions. Current implementation is quite dummy, better algorithm can be determined and implemented in the future if required.

### gallery
Thumbnail version of images currently is done via hard-coded image size in styles. Thumbnail version of image (smaller size, e.g. 75 x 75) can be and should be created for each image and stored at the "photo location". 
Horizontal slide can be and should be implemented for scrolling thumnail images in order to have slick UI and better user experience.
Large view of selected image is shown on the same screen. A popup can be implemented.

### cities
Cities are hard-coded and stored in a json file. Cities are being served in a redux action named "fetchCities" and being stored in the store via reducer. By doing so it will has less impact on consumer side (such as weather page) if later on decide to fetch the cities from the weathernetwork's api. 

### default location (city)
Ideally the default location (city) should be dynamically determined at runtime based on device's gps location info and default location can be changed and saved. The default location is hard-coded in current implementation.

### temperature unit toggle
React-Switch library has been used to implement the temperature unit toggle. I could write my own but I think it is better to leverage existing one instead of reinvent the wheel. 

### number of api calls
Number of api calls can be reduced if the celsius <--> fahernheit conversion is done on client side instead of sending a new api call to the weathernetwork server when the the temperature unit is changed. By doing so we may gain some performance.

### time zone
Currently the Data last update time just display the value from the api response which lack of time zone info. Time zone can be added in order to have more acurrate last update time.

### react hooks
React Hooks is a new coll feature. It will make code more concise and readable. The two class components Gallery and Weather can be implemented as Hooks in the future if time allowed.

### unit testing
Unit testing are being done on actions, reducers and components. MockAxios and configureMockStore from redux-mock-store being used in order to mock axios and redux store. All test files are located the same folder where the action/reducer/component being tested. They can be moved to a central folder named "__test__" if preferred.
Enzyme being used for testing components instead of using the react-testing library. No particular reason to not use the react-testing, I am just more familar with Enzyme. 
For Gallery and Weather, the named compoment not the default export being tested as we want to unit testing the component itself not the redux part.

### how to run/test/build
* Test: npm test
* Start: npm start
* Build: npm run build

### production deployment
In production environment normally Nginx will be used as http and reverse proxy server. For a react app, the navigation among different pages may work fine if we just click through the links, however we may encounter "can not get /URL" erorr when refreshing a page. It is a known drawback with client-side routing (like react-router). One solution is to create a simple expressjs app which redirect all request to the static build index.html

* create a simple expressjs app (named as server, for example)
* copy the build folder from app to server
* add the following code to redirect request
```javascript
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```
* run following command to start server
```
pm2 start ./bin/www --name weather-app -i max
```

### nginx config
```
server {
    listen 80;
    server_name WEATHER_APP_DOMAIN;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
     }
}
```

## docker config

### docker config files
* api/Dockerfile
* app/Dockerfile
* docker-compose.yml

### build docker image for api project
* cd api 
* sudo docker build -t weather-api .

### build docker image for app project
* cd app 
* sudo docker build -t weather-app .

### docker compose
* cd ..
* sudo docker-compose up -d --build

### docker images
docker images can be found in my docker repository on docker hub

* api: https://hub.docker.com/repository/docker/myan2350/weather-api
* app: https://hub.docker.com/repository/docker/myan2350/weather-app







