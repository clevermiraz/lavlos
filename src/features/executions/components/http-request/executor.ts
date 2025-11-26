import type { NodeExecutor } from '@/features/executions/types';
import { manualTriggerChannel } from '@/inngest/channels/manual-trigger';

type HttpRequestData = Record<string, unknown>;

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    manualTriggerChannel().status({
      nodeId,
      status: 'loading',
    })
  );

  const result = await step.run('http-request', async () => context);

  await publish(
    manualTriggerChannel().status({
      nodeId,
      status: 'success',
    })
  );

  return result;
};
