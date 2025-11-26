import { googleFormTriggerExecutor } from '@/features/triggers/google-form-trigger/executor';
import { manualTriggerExecutor } from '@/features/triggers/manual-trigger/executor';
import { stripeTriggerExecutor } from '@/features/triggers/stripe-trigger/executor';
import { NodeType } from '@/generated/prisma';
import { geminiExecutor } from '../components/gemini/executor';
import { httpRequestExecutor } from '../components/http-request/executor';
import type { NodeExecutor } from '../types';

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]: geminiExecutor, // TODO: Fix later
  [NodeType.OPENAI]: geminiExecutor, // TODO: Fix later
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type ${type}`);
  }
  return executor;
};
