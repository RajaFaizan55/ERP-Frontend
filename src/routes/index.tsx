import { memo, useEffect, useState } from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import Layout from 'components/layout';
import AppLoader from 'components/app-loader';

import { routes, publicRoute, RouteInterface } from './helper';

interface Props {
  token: string;
  role: string;
  loader: boolean;
}

const Routes = ({ token, role, loader }: Props) => {
  const [routesArr, setRoutesArr] = useState<RouteInterface[] | []>([]);

  useEffect(() => {
    if (token && role) {
      let tempRoutes = [...routes];
      tempRoutes = tempRoutes.filter((ele) => ele.role?.includes(role));
      setRoutesArr([...tempRoutes]);
    }
  }, [token, role]);

  return (
    <>
      {!token && !role && (
        <Switch>
          {publicRoute?.map(({ path, component }, index: number) => {
            return <Route key={index} path={path} element={component} />;
          })}
          <Route path="*" element={<Navigate to="/login" />} />
        </Switch>
      )}
      {!loader ? (
        <>
          {token && role && routesArr?.length > 0 && (
            <Switch>
              {routesArr?.map(({ path, component }, index: number) => {
                return (
                  <Route
                    key={index}
                    path={path}
                    element={<Layout>{component}</Layout>}
                  />
                );
              })}
              <Route path="*" element={<Navigate to="/" />} />
            </Switch>
          )}
        </>
      ) : (
        <AppLoader />
      )}
    </>
  );
};

export default memo(Routes);
