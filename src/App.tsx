import React, { Suspense } from 'react';
import './App.css';
import { useKeycloak } from '@react-keycloak/web';
import { RouteKey, routes } from './utils/router';
import GuardedRoute from './shared/GuardedRoute';
import { RecoilRoot } from 'recoil';
import { AppContainer } from './pages/AppContainer';
import { HashRouter as Router, Routes } from 'react-router-dom';

function App() {
  const { initialized } = useKeycloak();

  return initialized ? (
    <RecoilRoot>
      <Router>
        <AppContainer>
          <Routes>
            <GuardedRoute
              element={routes[RouteKey.HOME].element}
              path={routes[RouteKey.HOME].path}
            ></GuardedRoute>
            <Suspense fallback={null}>
              <GuardedRoute
                element={routes[RouteKey.POSTBOXES].element}
                path={routes[RouteKey.POSTBOXES].path}
              ></GuardedRoute>
            </Suspense>
            <Suspense fallback={null}>
              <GuardedRoute
                element={routes[RouteKey.POSTBOX_ID].element}
                path={routes[RouteKey.POSTBOX_ID].path}
              ></GuardedRoute>
            </Suspense>
          </Routes>
        </AppContainer>
      </Router>
    </RecoilRoot>
  ) : null;
}

export default App;
