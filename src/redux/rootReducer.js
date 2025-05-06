import { combineReducers } from 'redux';
// Importez vos reducers ici
import parametersReducer from '../redux/parametersSlice';

const rootReducer = combineReducers({
  // Ajoutez vos reducers ici
  parameters: parametersReducer,
});

export default rootReducer;
