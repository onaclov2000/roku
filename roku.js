// This module will allow control of a Roku Device by your node package.
// It is in some definate need of help
// TODO: Update to use SSDP (Can't get it to work for some reason) to get IP address.
//       Update to add necessary functions I.E. scroll right 10 seconds, should be Scroll("right",10) or something silly.
//       I'm sure there is more, also some commands will be dependent on the Roku version, so something to check for that, using
//       the returned SSDP would be wise.
var http = require('http')
var ip = '192.168.1.5'
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
             

/*
var controller(Key) = {HOME:{
  hostname: ip,
  port: 8060,
  path: '/keypress/Home',
  method: 'POST'
},
PLAY:{
  hostname: ip,
  port: 8060,
  path: Keys[Key],
  method: 'POST'
}}
*/

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

function Rest(options)
{
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


function controller(key)
{
  Rest({
   hostname: ip,
   port: 8060,
   path: Keys[key],
   method: 'POST'
  } )
}

controller('PLAY');
