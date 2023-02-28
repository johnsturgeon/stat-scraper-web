# Readme notes for developing this docker container

## Development process overview

### FastAPI
### Beanie (ODM based on Pydantic models for MongoDB)

### MongoDB (data storage)

The mongoDB is not exposed outside the docker container, but for development purposes, it's a 
good idea to expose it when you want to view the db.

* When a change is made, run the `bump_version_and_deploy.sh`
  * `usage: bump_version_and_deploy.sh [major, minor, patch] "commit message"`
* This will tag / deploy to docker hub

### Docker Hub
[Docker Hub for this project](https://hub.docker.com/repository/docker/johnofcamas/stat-scraper-web/general)