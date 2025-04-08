// dify-chat
import type { IOnCompleted, IOnData, IOnFile, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted, IOnError } from './base'
import { get, post, ssePost } from './base'

export interface ClientOptions {
  apiKey?: string | undefined;
  baseURL?: string | null | undefined;
}

export class ChatClient {
  apiKey?: string | undefined;
  baseURL?: string | null | undefined;
  constructor(options?: ClientOptions) {
    Object.assign(this, options)
  }

  async sendChatMessage(body: any, {
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
    onWorkflowFinished
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
  }) {
    return ssePost(this.baseURL + '/chat-messages', {
      body: {
        ...body,
        inputs: {},
        files: [],
        response_mode: 'streaming',
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
    }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished })
  }

  // 获取会话列表
  fetchConversations = async () => {
    return get(this.baseURL + '/conversations', { params: { limit: 100, first_id: '' } })
  }

  // 获取会话历史消息
  fetchChatList = async (conversationId: string) => {
    return get(this.baseURL + '/messages', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
  }

  // 获取应用参数
  fetchAppParams = async () => {
    return get(this.baseURL + '/parameters')
  }

  // 会话重命名
  generationConversationName = async (id: string) => {
    return post(`${this.baseURL}/conversations/${id}/name`, { body: { auto_generate: true } })
  }

}
