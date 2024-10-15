import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { RoutesWithNotFound } from './core/utils';
import { PrivateRoutes, PublicRoutes } from './core/models/routes';
import { AuthGuard } from './core/guards';

const Login = lazy(() => import('./pages/Login/Login'));
const Private = lazy(() => import('./pages/private/Private'));

function App() {

  return (
    <Suspense fallback={<p >Cargando ...</p>}>
    <Provider store={store}>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Private />} />
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Provider>
  </Suspense>
  )
}

export default App
