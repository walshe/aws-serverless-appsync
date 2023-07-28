import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_UZW7rJvnN',
      identityPoolId: 'eu-west-1:f64d3f04-743f-43d4-93c7-a2330163d7b6',
      userPoolWebClientId: '5mg5ep1b9im9ghfkcfp3t2v67s',
      mandatorySignIn: false
  }
});

const myAppConfig = {
'aws_appsync_graphqlEndpoint': 'https://xwkqrf2c4rcxjlnmwb7nffqa4a.appsync-api.eu-west-1.amazonaws.com/graphql',
'aws_appsync_region': 'eu-west-1',
'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}

Amplify.configure(myAppConfig);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function AppWithCallbackAfterRender() {

  return <App  />
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);

