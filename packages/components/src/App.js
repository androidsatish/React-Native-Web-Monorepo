import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import AddUser from './screens/AddUser';
import UpdateUser from './screens/UpdateUser';
import { createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

// const store = createStore(rootReducer, applyMiddleware(thunk));


const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddUser' component={AddUser} />
        <Stack.Screen name='UpdateUser' component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const Stack = createStackNavigator();

export default App;
