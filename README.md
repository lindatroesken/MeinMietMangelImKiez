# Mietmangel Manager

<table border="0" >
 <tr>
    <td>
<h2>Die App</h2>
Der Mietmangel Manager hilft einem Mieter den Überblick über alle anfallenden Mängel zu bewahren. 
Ein Problem kann in der App angelegt und Kontaktaufnahmen mit dem Vermieter können protokolliert werden.
Auf der Startseite gibt es eine Übersicht über ausstehende Reparaturen.
Eine Kartenansicht zeigt alle aktuellen Mietmängel in der Umgebung, so dass Mieter andere betroffene Nachbarn finden 
und sich dann vernetzen können.

## Über das Projekt
Die App ist mein Capstone Projekt aus dem **Java Bootcamp** bei [neue fische - School and Pool for Digital Talent](https://www.neuefische.de/weiterbildung/java). Innerhalb von vier Wochen wurde die App Idee entwickelt, das Konzept erarbeitet und anschließend programmiert.
Es kamen die Technologien zum Einsatz, die in den ersten zwei Monaten des Bootcamps vermittelt wurden.

## Tech Stack
Es handelt sich um ein Java Spring Backend mit Anbindung an eine PostgreSQL Datenbank und einem React Frontend.
Es gibt eine Anbindung zur Mapbox API für die Ermittlung der Addresskoordinaten und zur Darstellung im Frontend.

## Ausblick
Die App wird stetig weiterentwickelt.
</td>
    <td width="300px"><img src="public/appOverview.gif" alt="animated app overview"></td>
 </tr>
</table>

## Requirements
- Java 16
- maven
- mapbox-token ([https://www.mapbox.com/](https://www.mapbox.com/))
- Docker to run postgreSQL database
- npm


## Run Project 
- clone project from github by execute:
```shell 
git clone git@github.com:lindatroesken/MeinMietMangelImKiez.git
```
- start docker with postgreSQL database by: 
```shell 
docker-compose up -d 
```
### React in folder *frontend*
- rename .env-template to .env and enter mapbox token and cloudinary access data
- build the frontend by:
```shell 
npm install
```
- run the frontend by:
```shell 
npm run start
```

### Spring Boot in folder *backend*
- edit configurations:
  - set active profiles: local
  - add environment variables:
    - MAPBOX-TOKEN
    - JWT-SECRET
- build the backend by:
```shell
mvn clean package
```
- run the backend by:
```shell
mvn spring-boot run
```

### Alternative: run backend in docker container
to run the backend and the database in a docker container:
- run docker-build.sh
```shell
./bin/docker-build.sh
```
- run docker-compose:
```shell
docker-compose -f docker-compose-backend.yml up
```
- to stop docker with database and backend application:
```shell
docker-compose -f docker-compose-backend.yml stop
```
- to view running docker container:
```shell
docker ps
```
- to view all docker container:
```shell
docker ps -a
```
- to view running docker container with memory usage:
```shell
docker stats
```