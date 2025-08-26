import type { IOnCompleted, IOnData, IOnFile, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted, IOnError } from './base'
import { ssePost } from './base'
export let API_PREFIX: string = '/api'
export let BASE_URL: string = 'https://api.dify.ai/v1'
export let API_KEY: string = ''

export interface ClientOptions {
  apiKey?: string | undefined;
  baseURL?: string | null | undefined;
}

export class ChatClient {
  constructor(options?: ClientOptions) {
    API_KEY = options?.apiKey || ''
    BASE_URL = options?.baseURL || 'https://api.dify.ai/v1'
  }

  async sendChatMessage(
    body: Record<string, any>,
    {
      onData,
      onCompleted,
      onThought,
      onFile,
      onError,
      getAbortController,
      onMessageEnd,
      onMessageReplace,
      onWorkflowStarted,
      onNodeStarted,
      onNodeFinished,
      onWorkflowFinished,
    }: {
      onData: IOnData
      onCompleted: IOnCompleted
      onFile: IOnFile
      onThought: IOnThought
      onMessageEnd: IOnMessageEnd
      onMessageReplace: IOnMessageReplace
      onError: IOnError
      getAbortController?: (abortController: AbortController) => void
      onWorkflowStarted: IOnWorkflowStarted
      onNodeStarted: IOnNodeStarted
      onNodeFinished: IOnNodeFinished
      onWorkflowFinished: IOnWorkflowFinished
    },
  ) {
    return ssePost('chat-messages', {
      body: {
        inputs: {},
        files: [],
        response_mode: 'streaming',
        ...body,
      },
    }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished })
  }
}
