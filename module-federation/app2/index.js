import { AppRegistry, Platform } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import { name as appName } from './app.json';
import App from './src/App';

const resolveURL = Federated.createURLResolver({
  containers: {
    module1: 'http://localhost:9002/[name][ext]',
  },
});
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }
  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});
// ScriptManager.shared.on('resolving', ({ scriptId }) => {
//   console.log('resolving', scriptId);
// });
// ScriptManager.shared.on('resolved', ({ scriptId }) => {
//   console.log('resolved', scriptId);
// });
// ScriptManager.shared.on('prefetching', (scriptId, caller) => {
//   console.log('prefetching', scriptId, caller);
// });
// ScriptManager.shared.on('loading', (scriptId) => {
//   console.log('loading', scriptId);
// });
// ScriptManager.shared.on('loaded', (scriptId, caller) => {
//   console.log('loaded', scriptId, caller);
// });
// ScriptManager.shared.on('load_module', (data) => {
//   console.log(data);
// });
AppRegistry.registerComponent(appName, () => App);
