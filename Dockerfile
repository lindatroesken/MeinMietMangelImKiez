FROM openjdk:16

RUN mkdir -p /service
WORKDIR /service

COPY ["backend/target/backend-0.0.1-SNAPSHOT.jar", "/service/mietmangelmanager-backend.jar"]

EXPOSE 8080

# -D java options can be added if required e.g. to set log4j file to outside of the container
#
# http://www.oracle.com/technetwork/articles/java/vmoptions-jsp-140102.html
#
# VM8 opt: http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html
#
# "-Xloggc:garbage-collection.log"
#
CMD ["java", "-XX:MaxMetaspaceSize=128m", "-Xmx384m", "-Xms384m", "-Xmn128m", "-jar", "/service/mietmangelmanager-backend.jar"]


# run docker container with local profile:
#
# http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html
# https://docs.docker.com/engine/reference/commandline/run/
#
# sudo docker run --detach --publish 8080:8080 --env "SPRING_PROFILES_ACTIVE=local" --name rem213-backend
