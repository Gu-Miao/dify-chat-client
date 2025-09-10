import type { IOnCompleted, IOnData, IOnFile, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted, IOnError } from './base'
import { get, post, ssePost } from './base'

export interface ClientOptions {
  apiKey?: string | undefined;
  baseURL?: string | null | undefined;
}

export class ChatClient {
  apiKey: string | undefined
  baseURL: string | null | undefined
  constructor(options?: ClientOptions) {
    this.apiKey = options?.apiKey || ''
    this.baseURL = options?.baseURL || 'https://api.dify.ai/v1'
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
      onCompleted?: IOnCompleted
      onFile?: IOnFile
      onThought?: IOnThought
      onMessageEnd?: IOnMessageEnd
      onMessageReplace?: IOnMessageReplace
      onError?: IOnError
      getAbortController?: (abortController: AbortController) => void
      onWorkflowStarted?: IOnWorkflowStarted
      onNodeStarted?: IOnNodeStarted
      onNodeFinished?: IOnNodeFinished
      onWorkflowFinished?: IOnWorkflowFinished
    },
  ) {
    return ssePost(`${this.baseURL}/chat-messages`, {
      body: {
        inputs: {},
        files: [],
        response_mode: 'streaming',
        ...body,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished })
  }

  // 获取会话列表
  fetchConversations = async () => {
    return get(this.baseURL + '/conversations', {
      params: { limit: 100, first_id: '' },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
  }

  // 获取会话历史消息
  fetchChatList = async (conversationId: string) => {
    return get(this.baseURL + '/messages', {
      params: { conversation_id: conversationId, limit: 20, last_id: '' },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
  }

  // 获取应用参数
  fetchAppParams = async () => {
    return get(this.baseURL + '/parameters', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
  }

  // 会话重命名
  generationConversationName = async (id: string) => {
    return post(`${this.baseURL}/conversations/${id}/name`, {
      body: { auto_generate: true },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
  }

  // 文字转语音
  tts = async (body: {message_id?: string, text?: string, user?: string}) => {
    return post(`${this.baseURL}/text-to-audio`, {
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
  }

  // 语音转文字
  asr = async (body: {file?: any, user?: string}) => {
    return post(`${this.baseURL}/audio-to-text`, {
      body,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
  }
}
