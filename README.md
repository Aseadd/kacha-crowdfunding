# Getting Started with Kacha CrowdFunding WebApp
![alt text](https://kacha-crowdfunding.vercel.app/logo512.png)

This project was developed by [Sourcecode](https://github.com/habtish1/KachaCrowdfunding.git).

## Available Scripts

First pull the project from the repository:

### `git clone https://github.com/habtish1/KachaCrowdfunding.git`

Incase if you don't have git installed git first

### `sudo apt install git`

Move to the KachaCrowdfunding directory

### cd KachaCrowdfunding

## To run the react app we have to install node

### To install node we have to use nvm(Node Version Manager)

Clone the nvm repository to a ~/.nvm directory on your device.

### `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`

loads nvm

### `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" `

Reload the shell configuration

### `source ~/.bashrc`

confirm that nvm is installed
nvm -v
Now you can install node using the following command

### `nvm install v20`

check node version

### `node -v`

check npm version

### `npm -v`

## Now you can install package needed for the project (don't forget to check you are in the project directory)

### `npm install`

## Build bundle file of the project

### `npm run build`

## install serve package to serve

### `npm install -g serve`

## run server

### `serve -s build`

## incase if you want to specify the port use the below command

### `serve -s build -l 8000`
