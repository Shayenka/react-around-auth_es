import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, ...props  }) => {
  return (
    <Route path={path}>
      {
        () => props.loggedIn ? <Component {...props} /> : <Navigate to="./signin" />
      }
    </Route>
)}

export default ProtectedRoute;






// import React from 'react';
// import { Route, useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ component, loggedIn, ...props  }) => {
//   return (
//     <Route {...props}>
//         {loggedIn ? component : <useNavigate to="./signin" />}
//     </Route>
// )}

// export default ProtectedRoute;