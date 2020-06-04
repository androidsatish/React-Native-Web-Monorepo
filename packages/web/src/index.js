import { AppRegistry } from 'react-native'; 
import App from 'components/src/App';


AppRegistry.registerComponent('webdemo', () => App)
AppRegistry.runApplication('webdemo', {
  rootTag: document.getElementById('root'),
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

