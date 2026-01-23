# Budowanie
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Uruchamianie (wersja lekka)
FROM openjdk:17-jdk-slim
COPY --from=build /target/*.jar app.jar
# Ograniczenie RAMu (KLUCZOWE dla darmowego Rendera)
ENV JAVA_OPTS="-Xmx350m -Xms150m"
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]