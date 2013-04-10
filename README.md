roku
====

nodejs module to control your roku device.

Currently Issues with callback structure. 

When trying to call the "play" option for example, we need the SSDP to have picked up the ip address of the roku, unfortunately this isn't happening.

What happens is the call is made to search for the SSDP and then the play is called (and subsequently fails), and then the ip *should* be picked up, due to the nature of callbacks it isn't working "linearly"

What needs to happen, is when the package is called the first time it tries to pick up the ip address, when that operation completes then it'll try to do the Play function (or any other function).

Subsequent times, it will only call the associated function since the IP is already known.
