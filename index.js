let httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
  ws : true,
  wsAllowEmptyResHeaders: false,
  changeOrigin: true,
  target: 'https://stream.watsonplatform.net'
});

proxy.on('error', function(e) {
  !!e && console.log('proxy error', e)
});

const server = require('http').createServer(function(req, res) {
  console.log('http req')
  proxy.web(req, res);
})

// Proxy websockets
server.on('upgrade',function(req,res, head){
  console.log('ws req')
  proxy.ws(req, res, head);
})

server.listen(3020);