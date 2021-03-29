import React, { useContext} from 'react'
import { Route, Redirect } from 'react-router-dom';

import { Context } from "../store/store.context";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const { store } = useContext(Context);
    
    return ( 
        <Route 
            {...rest} 
            render={props => 
                store.user.isLoggedIn 
                ? <Component {...props}/>
                : <Redirect to="/login"/>
            }
        />
    )
}