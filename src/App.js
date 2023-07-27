import React from 'react';
import { GlobalStyle } from  './style';
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes'
import { renderRoutes } from 'react-router-config' // renderRoutes 读取路由配置转化为 Route 标签
import { HashRouter } from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          { renderRoutes (routes) }
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
