import  { asyncHandler } from "common/asyncHandler";
import client from "db/client"
//https://hooks.zapier.com/hooks/catch/22095477/2l0spul

const webHook = asyncHandler( async (req, res) => {
  try {
    const { userId, flowId } = req.params;
    const { githubId, githubCommit } = req.body;
  
    //handler body, params using middleware
  
    await client.$transaction(async (tx) => {

      const flowRun = await tx.flowRun.create({
        data: {
          flowId,
          metadata: { githubId, githubCommit }
        }
      });
  
      await tx.flowRunOutBox.create({
        data: { flowRunId: flowRun.id }
      });

    });
  
    return res.status(201).json({
      message: "Webhook processed successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

export default webHook;