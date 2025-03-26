import client from "db/client";
import { kafka, TOPIC_NAME, Partitioners } from "common/kafka"

const main = async () => {

  console.log("SWEEPER STARTED!!!");

  try {
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    await producer.connect();

    while(1){

      //read from db
      const pendingEvents = await client.flowRunOutBox.findMany({
        take: 10
      });

      //push to kafka
      await producer.send({
        topic: TOPIC_NAME,
        messages: pendingEvents.map(item => {
          return { value: item.flowRunId }
        })
      });

      //delete from db
      await client.flowRunOutBox.deleteMany({
        where: {
          id: {
            in: pendingEvents.map(item => item.id)
          }
        }
      })
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in Sweeper Processing!!!")
  }
};

main();