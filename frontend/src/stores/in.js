import {createStore,compose,combineReducers,applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';
import { Authreducer } from './reducer/Authreducer';
import {messageReducer} from './reducer/MessengerReducer'
const rootReducer = combineReducers({
            auth:Authreducer,
            messenger:messageReducer
})

const middleware = [thunkMiddleware];

const store = createStore(rootReducer,compose(applyMiddleware(...middleware),

 ));

export default store;