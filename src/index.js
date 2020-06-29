import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, put } from 'redux-saga/effects'
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import Axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield (takeEvery('REQUEST_MOVIES', requestMovies))
    yield (takeEvery('REQUEST_DETAILS', requestDetails))
    yield (takeEvery('REQUEST_GENRES', requestGenres))
    yield (takeEvery('UPDATE_MOVIES', updateMovies))
}

function* requestMovies () {
    try {
        const elementsResponse = yield Axios.get('/movie')
        yield put({type: 'SET_MOVIES', payload: elementsResponse.data})
        console.log('elementsResponse.data', elementsResponse.data);
    } catch(error) {
        console.log('ERROR with requestMovies in index.js', error);
    }
}

function* requestDetails () {
    try {
        const elementsResponse = yield Axios.get('/movie')
        yield put({type: 'SET_MOVIES', payload: elementsResponse.data})
        console.log('index.js requestDetails: ', elementsResponse.data);
    } catch(error) {
        console.log('ERROR with requestMovies in index.js', error);
        
    }
}

function* requestGenres (action) {
    try {
        const elementsResponse = yield Axios.get(`/genre/${action.payload}`)
        yield put({type: 'SET_GENRES', payload: elementsResponse.data})
        console.log('index.js requestGenres: ', elementsResponse.data);
    } catch(error) {
        console.log('ERROR with requestGenres in index.js', error);
        
    }
}

function* updateMovies (action) {
    console.log('in updateMovies', action.payload.title);
    console.log('in updateMovies', action.payload.description);
    console.log('in updateMovies', action.payload.id);
    
    try {
        const elementsResponse = yield Axios.put(`/movie/${action.payload.id}`, action.payload)
        yield put ({type: 'SET_MOVIES', payload: elementsResponse.data})
        console.log('index.js updateMovies: ', elementsResponse.data);
    } catch(error) {
        console.log('ERROR with updateMovies in index.js', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const details = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware), //logger
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
