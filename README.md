# Rocket League BakkesMod Stat Scraper Plugin (web docker container)

Run your own 'tracker' for Rocket League!  Track all your stats and display them on your own web site.

## Description

This project contains two separate components:

1. [The Stat Scraper plugin for BakkesMod](https://github.com/johnsturgeon/stat-scraper) using the 
   BakkesModSDK
2. A Web Server (this repository) - A docker container that runs a web server and mongo database 
   that the plugin writes to.

## Docker Container Description

This docker container runs two services:

1. a mongoDB database (internal only)
2. a FastAPI web server localhost:8822

## Installation

See the installation instructions at [The Stat Scraper plugin for BakkesMod](https://github.com/johnsturgeon/stat-scraper) 

