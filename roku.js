// This module will allow control of a Roku Device by your node package.
// It is in some definate need of help
// TODO: Update to use SSDP (Can't get it to work for some reason) to get IP address.
//       Update to add necessary functions I.E. scroll right 10 seconds, should be Scroll("right",10) or something silly.
//       I'm sure there is more, also some commands will be dependent on the Roku version, so something to check for that, using
//       the returned SSDP would be wise.

var http = require('http')
var dgram = require('dgram'); // dgram is UDP
var ip = ''
var port = '' 
 
// Listen for responses
function listen(port, operation) {
	var server = dgram.createSocket("udp4");
 
	server.on("message", function (msg, rinfo) {
                ip = rinfo.address;
		console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
       		console.log("sending " + Keys[operation]);
                send_message({hostname: ip,
                              port: 8060,
                              path: Keys[operation],
                              method: 'POST'});    
             
	});
	server.bind(port); // Bind to the random port we were given when sending the message, not 1900
 
	// Give it a while for responses to come in
	setTimeout(function(){
		console.log("Finished waiting");
		server.close();
	},20000);
}
 
function Search(operation) {
	console.log(operation);
	var message = new Buffer(
		"M-SEARCH * HTTP/1.1\r\n" +
		"Host:239.255.255.250:1900\r\n" +
		"Man:\"ssdp:discover\"\r\n" +
		"ST: roku:ecp\r\n" + // Essential, used by the client to specify what they want to discover, eg 'ST:ge:fridge'
		"MX:2\r\n" + // 1 second to respond (but they all respond immediately?)
		"\r\n"
	);
 
	var client = dgram.createSocket("udp4");
	client.bind(1900, "239.255.255.250"); // So that we get a port so we can listen before sending
	listen(client.address().port, operation);
	client.send(message, 0, message.length, 1900, "239.255.255.250", function(err, bytes) {
           client.close();});
        }
 
	

var apps = {
  hostname: ip,
  port: 8060,
  path: '/query/apps',
  method: 'GET'
};

var keydown = {
  hostname: ip,
  port: 8060,
  path: '/keydown',
  method: 'POST'
};

var Keys = {HOME:          '/keypress/Home',
            REV:           '/keypress/Rev',
            FWD:           '/keypress/Fwd',
            PLAY:          '/keypress/Play',
            SELECT:        '/keypress/Select',
            LEFT:          '/keypress/Left',
            RIGHT:         '/keypress/Right',
            DOWN:          '/keypress/Down',
            UP:            '/keypress/Up',
            BACK:          '/keypress/Back',
            INSTANTREPLAY: '/keypress/InstantReplay',
            INFO:          '/keypress/Info',
            BACKSPACE:     '/keypress/Backspace',
            SEARCH:        '/keypress/Search',
            ENTER:         '/keypress/Enter',
            A:             '/keypress/Lit_a'}
             

var roku = {play          :function(){Search('PLAY')},
           home          :function(){Search('HOME')},
           reverse       :function(){Search('REV')},
           forward       :function(){Search('FWD')},
           select        :function(){Search('SELECT')},
           left          :function(){Search('LEFT')},
           right         :function(){Search('RIGHT')},
           down          :function(){Search('DOWN')},
           up            :function(){Search('UP')},
           back          :function(){Search('BACK')},
           instantreplay :function(){Search('INSTANTREPLAY')},
           info          :function(){Search('INFO')},
           backspace     :function(){Search('BACKSPACE')},
           search        :function(){Search('SEARCH')},
           enter         :function(){Search('ENTER')}
                          }
module.exports = roku;
var keyup = {
  hostname: ip,
  port: 8060,
  path: '/keyup',
  method: 'POST'
};

var keypress = {
  hostname: ip,
  port: 8060,
  path: '/keypress',
  method: 'POST'
};

var launchapp = {
  hostname: ip,
  port: 8060,
  path: '/launch/dev',
  method: 'POST'
};

var http = require('http')

function send_message(options)
{
        console.log(options);
	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();

}

//Search('SELECT');
