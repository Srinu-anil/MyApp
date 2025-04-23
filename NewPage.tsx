import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

const NewPage = ({
  navigation,
  route,
}: StackScreenProps<any, 'Screen1'>) => {
  const [sections, setSections] = useState([{ name: '', questions: [''] }]);

  const addSection = () => {
    setSections([...sections, { name: '', questions: [''] }]);
  };

  const protoForms = () => {
    console.log("protoForm")
    navigation.navigate('ProtoForms');
  };

  const addQuestion = (sectionIndex) => {
    const newSections = [...sections];
    navigation.navigate('AddQuestionType');
    newSections[sectionIndex].questions.push('');
    setSections(newSections);
  };

  const updateQuestion = (sectionIndex, questionIndex, text) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex] = text;
    setSections(newSections);
  };

  return (
    <ScrollView style={styles.container}>
      {/* {sections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>
            {section.name || '(Undefined Section Name)'}
          </Text>
          <View style={styles.line} />

          <Text style={styles.sectionTitle}>
            {section.name || 'New Question'}
          </Text>
          {section.questions.map((question, questionIndex) => (
            <TextInput
              key={questionIndex}
              style={styles.input}
              placeholder="Text field"
              value={question}
              onChangeText={(text) =>
                updateQuestion(sectionIndex, questionIndex, text)
              }
            />
          ))}
          <View style={styles.line} />
          <Button
            title="+ ADD A QUESTION"
            onPress={() => addQuestion(sectionIndex)}
          />
        </View>
      ))}
      <Button title="+ ADD A SECTION" onPress={addSection} /> */}

      <Button title="Proto Forms" onPress={protoForms} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  sectionTitle: {
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  line: {
    height: 1,
    backgroundColor: '#ccc', 
    width: '100%', 
    marginVertical: 10,
  },
});

export default NewPage;