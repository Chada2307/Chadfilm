# Budowanie
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /target/*.jar app.jar

ENV JAVA_OPTS="-Xmx350m -Xms150m"
EXPOSE 8080
ENTRYPOINT ["java", "-jar","app.jar"]