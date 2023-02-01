import { AppRegistry, Platform } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import { name as appName } from './app.json';
import App from './App';

// const resolveURL = (
//   scriptId: string,
//   caller: string | undefined,
//   version = ''
// ) => {
//   let containers = {
//     app1: 'http://localhost:9000/[name][ext]',
//     app2: 'http://localhost:9001/[name][ext]',
//     module1: 'http://localhost:9002/[name][ext]',
//   };
//   console.log('######', caller, scriptId, version);
//   // if (version && caller) {
//   //   containers[
//   //     caller
//   //   ] = `https://cdntest.taptap.com.vn/mobile-app/${version}/${scriptId}`;
//   //   // containers = {
//   //   //   app1: 'http://localhost:9000/[name][ext]',
//   //   //   app2: 'http://localhost:9001/[name][ext]',
//   //   //   module1: 'http://localhost:9002/[name][ext]',
//   //   // };
//   //   console.log('container', containers);
//   // }
//   return Federated.createURLResolver({
//     containers,
//   });
// };
const resolveURL = Federated.createURLResolver({
  containers: {
    app1: 'http://localhost:9000/[name][ext]',
    app2: 'http://localhost:9001/[name][ext]',
    module1: 'http://localhost:9002/[name][ext]',
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  console.log('#####', scriptId, caller);
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
