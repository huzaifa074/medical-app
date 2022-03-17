import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../store";

import './unauthenticated-route.module.scss';

/* eslint-disable-next-line */
export interface UnauthenticatedRouteProps {
  children: any;
  exact?: boolean
  path?: string;
}

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp(`[?&]${  name  }(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function UnauthenticatedRoute({ children, ...rest }: UnauthenticatedRouteProps) {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
          <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
        )}
    </Route>
  );
}

export default UnauthenticatedRoute;
