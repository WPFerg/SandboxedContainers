# Attacker Site

This is a SPA using Mongo / Express / Angular / Node like the MEAN Site.

It simulates a simple attacker website which collects information sent to its logging API.
It also displays the received information specifying the IP, type and value of the stolen information.

It was built in VS2013 with Node.js Tools installed, but should port to any other IDE.
The project build process uses gulp  

The vagrant file maps this project folder to /vagrant on the VM.
The application appears at http://10.10.10.30/ . The VM uses host-only networking - a network that is private to your host and the guest machines on that host.