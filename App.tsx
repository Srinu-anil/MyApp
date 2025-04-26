import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect} from 'react';
import {StyleSheet, View, Platform, LogBox} from 'react-native';
import {Button} from 'react-native';
import CreateForm from './CreateForm';
import NewPage from './NewPage';
import AddQuestionType from './AddQuestionType';
import ProtoForms from './ProtoForms';
const Stack =
  Platform.OS === 'windows'
    ? createStackNavigator()
    : createNativeStackNavigator();
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import LoginScreen from './LoginScreen';
import {useDispatch} from 'react-redux';
import {logout, formResponse} from './redux/formSlice';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


function LogoutButton() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigation.navigate('LoginScreen');
  };

  return <Button title="Logout" onPress={handleLogout} />;
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerMode: 'screen',
              // headerRight: () => <LogoutButton />,
            }}>
            {/* <Stack.Screen name="CreateForm" component={CreateForm} /> */}
            <Stack.Screen name="AssessmentSurvey" component={ProtoForms} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="NewPage" component={NewPage} />
            <Stack.Screen name="AddQuestionType" component={AddQuestionType} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  screens: {flex: 1, alignItems: 'center'},
  navButtons: {height: 100, width: 250, color: 'white'},
  doIWorkButton: {},
});

export default App;
