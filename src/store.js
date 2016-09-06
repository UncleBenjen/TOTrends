import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('/');
let socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER_");

export function configureStore(history, initialState) {

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        socketIoMiddleware,
        routerMiddleware(history)
      )
    )
  )

  return store
}
