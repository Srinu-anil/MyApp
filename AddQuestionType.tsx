import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {globalStyles} from './Styles';

const FIELD_TYPES = [
  'Text Field',
  'Text Area',
  'Dropdown',
  'Radio Button',
  'Checkbox',
  'Date/Time',
];
import {StackScreenProps} from '@react-navigation/stack';

const AddQuestionType = ({
  navigation,
  route,
}: StackScreenProps<any, 'CreateForm'>) => {
  const [fields, setFields] = useState([]);
  const [disabledButton, setDisableButton] = useState(true);

  const addField = type => {
    const newField = {
      id: Date.now(),
      type,
      title: '',
      description: '',
      value: type === 'Checkbox' ? false : '',
      options:
        type === 'Dropdown' || type === 'Radio Button'
          ? ['Option 1', 'Option 2']
          : [],
    };
    setFields([/*...fields,*/ newField]);
    setDisableButton(false);
  };

  const updateField = (id, key, value) => {
    setFields(
      fields.map(field => (field.id === id ? {...field, [key]: value} : field)),
    );
  };

    const handleSave = () => {
      //navigation.navigate('NewPage');
      // Alert.alert('Form Saved', `Name: ${formName}\nDescription: ${formDescription}`);
      // You can add real logic to send this data to a server or state
    };
  
    const handleCancel = () => {
        navigation.navigate('CreateForm');
    };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Select Question with Type</Text>

      {fields.map(field => (
        <View key={field.id} style={styles.widgetCard}>
          {/* Title input */}
          <Text style={styles.subLabel}>Question Text</Text>
          <TextInput
            style={styles.input}
            placeholder="TEST question 1"
            value={field.title}
            onChangeText={text => updateField(field.id, 'title', text)}
          />

          {/* Description input */}
          <Text style={styles.subLabel}>Unique Identifier for Question</Text>
          <TextInput
            style={styles.input}
            placeholder="TEST Question1"
            value={field.description}
            onChangeText={text => updateField(field.id, 'description', text)}
          />

          {/* Display title + description */}
          {field.title !== '' && (
            <Text style={styles.widgetTitle}>{field.title}</Text>
          )}
          {field.description !== '' && (
            <Text style={styles.widgetDesc}>{field.description}</Text>
          )}

          {/* Widget type render */}
          {field.type === 'Text Field' && (
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              value={field.value}
              onChangeText={text => updateField(field.id, 'value', text)}
            />
          )}

          {field.type === 'Text Area' && (
            <TextInput
              style={[styles.input, {height: 100}]}
              multiline
              placeholder="Enter long text"
              value={field.value}
              onChangeText={text => updateField(field.id, 'value', text)}
            />
          )}

          {field.type === 'Dropdown' && (
            <Picker
              selectedValue={field.value}
              onValueChange={val => updateField(field.id, 'value', val)}
              style={styles.input}>
              {field.options.map((opt, i) => (
                <Picker.Item key={i} label={opt} value={opt} />
              ))}
            </Picker>
          )}

          {field.type === 'Radio Button' &&
            field.options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => updateField(field.id, 'value', opt)}
                style={styles.radioButton}>
                <View style={styles.radioOuter}>
                  {field.value === opt && <View style={styles.radioInner} />}
                </View>
                <Text>{opt}</Text>
              </TouchableOpacity>
            ))}

          {field.type === 'Checkbox' && (
            <View style={styles.checkboxContainer}>
              <Switch
                value={field.value}
                onValueChange={val => updateField(field.id, 'value', val)}
              />
              <Text>{field.value ? 'Yes' : 'No'}</Text>
            </View>
          )}

          {field.type === 'Date/Time' && (
            <>
              <TouchableOpacity
                onPress={() =>
                  updateField(field.id, 'value', new Date().toISOString())
                }
                style={styles.dateBtn}>
                <Text>Select Date</Text>
              </TouchableOpacity>
              <Text>
                {field.value
                  ? new Date(field.value).toLocaleString()
                  : 'No date selected'}
              </Text>
            </>
          )}
        </View>
      ))}

      <Text style={styles.subHeading}>Add a Question Type:</Text>
      <View style={styles.grid}>
        {FIELD_TYPES.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridButton}
            onPress={() => addField(type)}>
            <Text style={styles.gridButtonText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={globalStyles.buttonContainer}>
              <TouchableOpacity style={globalStyles.cancelButton} onPress={handleCancel}>
                <Text style={globalStyles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.saveButton, disabledButton && styles.disabledButton]} onPress={handleSave}>
                <Text style={globalStyles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  heading: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  subHeading: {fontSize: 18, fontWeight: '600', marginVertical: 10},
  subLabel: {fontSize: 14, fontWeight: '500', marginTop: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  widgetCard: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fdfdfd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  widgetDesc: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  radioButton: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridButton: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  gridButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default AddQuestionType;
