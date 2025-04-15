# dify-chat

```shell
yarn add dify-chat -D
```

```js
import { ChatClient } from 'dify-chat'

const client = new ChatClient({
  baseURL: '/dify/v1',
  apiKey: 'app-xxxxx'
})

client.sendChatMessage({
  query: 'hi dify',
  user: 'github'
}, {
  onData: (res) => {
    console.log('onData-> ', res)
  },
  onMessageEnd: (res) => {
    console.log('onMessageEnd-> ', res)
  },
  onMessageReplace: (res) => {
    console.log('onMessageReplace-> ', res)
  },
  onNodeStarted: (res) => {
    console.log('onNodeStarted-> ', res)
  },
  onNodeFinished: (res) => {
    console.log('onNodeFinished-> ', res)
  },
  onWorkflowStarted: (res) => {
    console.log('onWorkflowStarted-> ', res)
  },
  onWorkflowFinished: (res) => {
    console.log('onWorkflowFinished-> ', res)
  },
  onCompleted: (res) => {
    console.log('onCompleted-> ', res)
  },
  onError: (res) => {
    console.log('onError-> ', res)
  }
})
```

### API
```js
import { ChatClient } from 'dify-chat'

const client = new ChatClient({
  baseURL: '/dify/v1',
  apiKey: 'app-xxxxx'
})

client.tts({
  text: 'hello hello' 
}).then((blob) => {
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  audio.play();
})
```

### References
> https://github.com/langgenius/webapp-conversation
