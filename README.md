# gecko-ci
Gecko-ci is a lightweight plugin that improves engagement of team members by providing physical feedback of the status of the build. It creates a link between a build server and smart RGB light bulbs, displaying specific colors for each build status.

Gecko-ci currently supports only **TFS** as build server and **[LIFX Bulbs](http://www.lifx.com/)** as extreme feedback device. 

[![Dependency Status](https://david-dm.org/minduca/gecko-ci.svg)](https://david-dm.org/minduca/gecko-ci)
[![npm](https://img.shields.io/npm/dt/gecko-ci.svg)](https://www.npmjs.com/package/gecko-ci)
[![Stories in Ready](https://badge.waffle.io/minduca/gecko-ci.svg?label=ready&title=ready)](http://waffle.io/minduca/gecko-ci)

## Install

**node.js** & **bower**
```javascript
npm install gecko-ci --save
bower install gecko-it --save
```

## Quick Start
Define one or more connections to your build server(s), create one or more build monitors associated to these connections and link each monitor to light bulbs that will display the status of the build.

**node.js**
```javascript
let gecko = require("gecko-ci")
```

**browser**
```javascript
let gecko = window.$gecko
```

```javascript
let monitor = gecko.watchBuilds({
    connections: [
        {
            name: "my connection 01",
            technology: "tfs",
            collection: "DefaultCollection",
            server: "https://foo.visualstudio.com/",
            user: "foo@gmail.com",
            personalToken: "xxxXXXxxXXXXxxXXXXxxxXXXXxxXXXXxxxxxXXXXxxx"
        }
    ],
    buildMonitors: [
        {
            name: "my monitor 01",
            teamProject: "MyTeamProject",
            connectionName: "my connection 01"
        }
    ],
    lightBulbs: [
        {
            name: "my bulb config 01",
            technology: "lifx",
            buildMonitorsNames: ["my monitor 01"],
            selector: "all",
            personalToken: "yyyyYYYYyyYYyyyYYYyyyyyyYYYYyyyyyYYYyyyyyyYYyyyy"
        }
    ]
});
```

To stop the application, you simply do
```javascript
monitor.stopWatchingBuilds();
```
## Options

#### `connections`
Array of connections to one or more build servers.

| Attribute		   | Type	  | Supported values |  	    | Description |
| :--------------- | :------: | :--------------- | :------: | :---------- |
| `name`		   | *String* | -		         | Required		| Unique name (id) of the connection. |
| `technology`	   | *String* | "tfs"		     | Required		| Technology of the build server. TFS is currently the only build server supported. |
| `collection`	   | *String* | -		         | Required		| Name of the Team Project Collection on TFS. |
| `server`	       | *String* | -		         | Required		| Address of the build server. |
| `user`           | *String* | -		         | Required		| User account to authenticate to the build server via REST api. |
| `personalToken`  | *String* | -		         | Required		| App token for authorizations on the build server. For TFS, take a look at [Create personal access tokens to authenticate access](https://www.visualstudio.com/en-us/docs/integrate/get-started/auth/overview). Only the scope **Build (read)** is required. The token supplied must be associated to the value supplied on `user`. |

#### `buildMonitors`
Array of monitors that connect to build servers and check the build status

| Attribute		   | Type	  | Supported values |  	    | Description |
| :--------------- | :------: | :--------------- | :------: | :---------- |
| `name`		   | *String* | -                | Required | Unique name (id) of the build monitor. |
| `teamProject`	   | *String* | -		         | Required	| Name of the Team Project on TFS. |
| `connectionName` | *String* | -		         | Required	| id of the connection that will be used by the monitor. it must be an existing `options.connections[].name`. | 
| `definitions`<br/>`queues`<br/>`type`<br/>`requestedFor`<br/>`reasonFilter`<br/>`tagFilters`<br/>`propertyFilters`<br/>	| *String*		| -		| Optional		| TFS parameters that are also supported. Check the [TFS Builds api](https://www.visualstudio.com/en-us/docs/integrate/api/build/builds) for the MSDN documentation of these parameters. The TFS api documentation contains many other parameters that aren't listed here, but gecko-ci will handle them. Although it's strongly recommended that you don't override these arguments that aren't listed here, you can play with them at your own risk. |

#### `lightBulbs`
Array of light bulbs that display the status of one or more build monitors

| Attribute		   | Type	  | Supported values |  	    | Description |
| :--------------- | :------: | :--------------- | :------: | :---------- |
| `name`   		   | *String* | -		         | Required	| Unique name (id) of the light bulb. |
| `technology`	   | *String* | "lifx"		 | Required	| Technology of the light bulb. LIFX is currently the only bulb supported. |
| `buildMonitorsNames`	| *String[]*		| -		| Required		| array of ids of build monitors that are linked to this light bulb configuration. it must be an existing `options.buildMonitors[].name`. |
| `selector`		| *String*		| -		| Required		| A LIFX selector. Check the [LIFX selectors](https://api.developer.lifx.com/docs/selectors) for the documentation of this argument. |
| `personalToken`  |  *String* | -		| Required		| App token for authorizations on the LIFX server. Check the [Account settings](https://cloud.lifx.com/settings) in order to generate a token. |

## Build Status Colors
When the build status change, the color of the light bulb changes accordingly. 

| Status change	            | Color	  |
| :------------------------ | :------ |
| `buildSucceeded`  	    | Green   |
| `buildPartiallySucceeded` | Orange  |
| `buildFailed`		        | Red     |

## License
[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)
