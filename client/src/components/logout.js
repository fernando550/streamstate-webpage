import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Context } from '../store/store.context';

export const Logout = () => {
    const { actions: { user_func } } = useContext(Context)

    useEffect(() => {
        user_func.logout();
    })

    return <Redirect to="/login"/>
}