import React from 'react';

import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../../store";

import './authenticated-route.module.scss';

/* eslint-disable-next-line */
export interface AuthenticatedRouteProps {
  children: any;
  exact?: boolean
  path?: string;
}

export function AuthenticatedRoute({ children, ...rest }: AuthenticatedRouteProps) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
          <Redirect to={
            `/login?redirect=${pathname}${search}`
          } />
        )}
    </Route>
  );
}

export default AuthenticatedRoute;
