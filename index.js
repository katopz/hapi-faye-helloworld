// Hapi
var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Faye
var faye = require('faye');
var bayeux = new faye.NodeAdapter({mount: '/faye'});

// Faye via Hapi
bayeux.attach(server.listener);

// Serve static file
server.route({
    method: 'GET',
    path: '/{filename}',
    handler: {
        file: function (request) {
            return request.params.filename;
        }
    }
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});