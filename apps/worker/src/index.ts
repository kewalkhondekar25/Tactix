import client from "db/client";
import { kafka, TOPIC_NAME, Partitioners } from "common/kafka";

const main = async () => {

  console.log("WORKER STARTED!!!");
  
  try {
    const consumer = kafka.consumer({ groupId: "worker"});
    
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true});
    await consumer.run({
      autoCommit: false,
      eachMessage: async({ topic, partition, message}) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString()
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("processing!!!");
        

        await consumer.commitOffsets([{
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString()
        }])
      }

    });
  } catch (error) {
    
  }
};

main();