# alfred-dashboard

### An Internet-of-Things smart mirror built with JavaScript and Raspberry Pi - works with a [client-side dashboard](https://github.com/alfred-mirror/alfred-dashboard) which pushes directly to the [mirror display](https://github.com/alfred-mirror/alfred-display).

#### The App is on [Heroku](http://alfred-new.herokuapp.com/)
It is recommended to use the deployed version of this app so you don't have to constantly run a local server. However, an installation guide for a local server is available at [Alfred](https://github.com/alfred-mirror/alfred).

#### Installation to Run Locally

Git clone this repo and install all dependencies:
```
git clone https://github.com/alfred-mirror/alfred-dashboard.git
cd alfred-dashboard
npm install
gulp build:dev
node server.js
```

Make sure both the alfred server and the mirror display app/server are also running. The client-dashboard should be now working on your specified port or defaults to ```localhost:3000```.

### Issues? Suggestions? Comments?
Submit an issue on [GitHub](https://github.com/alfred-mirror/alfred-dashboard/issues).

### License
MIT Licensed. For more details, see the [LICENSE](https://github.com/alfred-mirror/alfred-dashboard/blob/master/LICENSE.md) file.
