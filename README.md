Dev/test environment setup
-----

The sample vulnerable apps and other utilities run in VMs on your local machine, set up with Vagrant.
So you'll need to install VirtualBox and Vagrant.
See [https://docs.vagrantup.com/v2/getting-started/index.html](https://docs.vagrantup.com/v2/getting-started/index.html) if you haven't used Vagrant before.

After installing Vagrant you will need to update the vagrant home as the default is in your user directory and will immediately take you over your allowed profile storage space when it downloads the Ubuntu files.
This can be done by going to edit environment variables from control panel and adding a new variable VAGRANT_HOME and setting it to the file location you want to use.

The sample apps are node apps running on an ubuntu 14.04 VM. In these VMs the /vagrant directory is mapped to the project folder of the  The samples are run by a gulp task which watches the source files. Editing and saving source will trigger gulp task to build and restart the server, so no IDE build is required. So branching and modifying the code should also 'just work', fingers crossed.

**Important.** When the vagrant file is created it installs (and where necessary builds) node packages on the (ubuntu) VM. If you run npm install on your local Windows machine it will almost certainly break your VM and you will need to recreate it. Attempting to run the samples on both the VM and locally will end in tears of rage and frustration - it's an interesting problem in itself, but has nothing to do with this course.


Running samples
-----

To run any of the samples, you navigate to the project folder. There will be a vagrantfile there, and you can start the VM with:

    vagrant up

**You must run this in an administrator command prompt on Windows**, otherwise the VM will not be able to create symlinks.

N.B. This will take quite a while the first time you start a VM, especially the first time

When you're done (temporarily), halt it with:

    vagrant halt
    
Next time you start it will be faster to load. Or take it down completely with:

    vagrant destroy

(you may also need to remove it with Virtual box manager). 
And if you need to get medieval

    vagrant ssh

The social media samples start with an empty database. Navigate to Register, and create a new user. Then you can add posts.
