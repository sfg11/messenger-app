const devConfig = {
  API_URL: 'http://localhost:4000',
  WS_URL: 'ws://localhost:4000',
}

const prodConfig = {
  API_URL: 'https://my-messenger-api.herokuapp.com',
  WS_URL: 'wss://my-messenger-api.herokuapp.com',
}

export default (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;
