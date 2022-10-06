import React from 'react';
import { Route} from 'react-router';
import { zRoute } from './routes/route';
export default (
  <Route>
    {zRoute.map((route, idx) => (
          <Route path={route.link} />
      ))}
  </Route>
);