import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
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
import { PersistGate } from 'redux-persist/integration/react';

export const Screen1 = ({
  navigation,
  route,
}: StackScreenProps<any, 'Screen1'>) => {
  return (
    <View style={styles.screens}>
      <Button
        style={styles.navButtons}
        title="Click me to go to screen 2!"
        onPress={() => navigation.navigate('Screen2')}
      />
    </View>
  );
};

export const Screen2 = ({
  navigation,
  route,
}: StackScreenProps<any, 'Screen2'>) => {
  return (
    <View style={styles.screens}>
      <Button
        style={styles.navButtons}
        title="Click me to go to screen 1!"
        onPress={() => navigation.navigate('Screen1')}
      />
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerMode: 'screen'}}>
          {/* <Stack.Screen name="CreateForm" component={CreateForm} /> */}
          <Stack.Screen name="NewPage" component={NewPage} />
          <Stack.Screen name="AddQuestionType" component={AddQuestionType} />
          <Stack.Screen name="ProtoForms" component={ProtoForms} />
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
