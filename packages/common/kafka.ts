import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-sweeper",
  brokers: ["localhost:9092"]
});

const TOPIC_NAME = "flow-events";

export { kafka, TOPIC_NAME, Partitioners };