#!/bin/sh

# Required for mongodb install
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo apt-get install -y mongodb-org

# Hack to get around Windows vs ubuntu permissioning issues on vagrant shared folders - npm install somewhere else and symlink
mkdir /tmp
cd /tmp
cp /vagrant/package.json .
sudo npm install
rm /vagrant/node_modules
ln -s /tmp/node_modules /vagrant/node_modules

sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g gulp

cp /vagrant/Attacker_site.conf /etc/init

cd /vagrant

# And start the server
gulp dev
