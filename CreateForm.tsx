import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {globalStyles} from './Styles';

const CreateForm = ({navigation, route}: StackScreenProps<any, 'CreateForm'>) => {
  const [formName, setFormName] = useState('TEST FORM TC');
  const [formDescription, setFormDescription] = useState('test demo form');

  const handleSave = () => {
    navigation.navigate('NewPage');
    // Alert.alert('Form Saved', `Name: ${formName}\nDescription: ${formDescription}`);
    // You can add real logic to send this data to a server or state
  };

  const handleCancel = () => {
    Alert.alert('Form Reset');
    setFormName('');
    setFormDescription('');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Form Information</Text>

      <Text style={globalStyles.label}>
        Form Name <Text style={{color: 'red'}}>*</Text>
      </Text>
      <TextInput
        value={formName}
        onChangeText={setFormName}
        style={globalStyles.input}
        placeholder="Enter form name"
      />

      <Text style={globalStyles.label}>Form Description</Text>
      <TextInput
        value={formDescription}
        onChangeText={setFormDescription}
        style={[globalStyles.input, {height: 80}]}
        placeholder="Enter form description"
        multiline
      />

      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity style={globalStyles.cancelButton} onPress={handleCancel}>
          <Text style={globalStyles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.saveButton} onPress={handleSave}>
          <Text style={globalStyles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateForm;
