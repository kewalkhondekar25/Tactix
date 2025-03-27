import client from "db/client";
import { kafka, TOPIC_NAME } from "common/kafka";

const main = async () => {

  console.log("WORKER STARTED!!!");
  
  try {
    const consumer = kafka.consumer({ groupId: "worker"});
    const producer = kafka.producer();
    
    await consumer.connect();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true});
    await consumer.run({
      autoCommit: false,
      eachMessage: async({ topic, partition, message}) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString()
        });

        if(!message.value?.toString()) return;
        const parsedValue = JSON.parse(message.value?.toString());

        const flowRunId = parsedValue.flowRunId;
        const stage = flowRunId.stage;

        const flowRunDetails = await client.flowRun.findFirst({
          where: { id: flowRunId },
          include: {
            flow: {
              include: {
                action: true
              }
            }
          }
        });

        const currentStage = flowRunDetails?.flow.action.find(item => item.order === stage);

        if(currentStage?.event === "SEND_EMAIL"){
          //send email
        };

        if(currentStage?.event === "CREATE_DOC"){
          //create doc
        };

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const lastStage = flowRunDetails?.flow.action.length;
        if(lastStage !== stage){
          await producer.send({
            topic: TOPIC_NAME,
            messages: [{ value: JSON.stringify({ flowRunId, stage: stage + 1 })}]
          })
        }

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