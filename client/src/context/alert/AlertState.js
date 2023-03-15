import React, {useReducer} from "react";
import uuid, { v4 } from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg,type, timeout = 5000) => {
        const id = v4;
        dispatch({
            type: SET_ALERT,
            payload: {msg, type, id}
        });

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
    };

    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }} >
            
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;