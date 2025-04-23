import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {
  Checkbox,
  MD3Colors,
  ProgressBar,
  RadioButton,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';

import {Picker} from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

const OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Ramesh Selvam',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ramesh Amurugam',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Srinivas Anil',
  },
];

const Home = () => {
  const [values, setValues] = useState({
    name: '',
    gender: 'male',
    progress: 0.2,
    married: false,
    contractor: false,
  });
  console.log('app working home');

  const [gender, setGender] = useState<string>();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const Item: any = Picker.Item;

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Name */}
        <View style={styles.rowContainer}>
          <TextInput
            label="Name"
            mode="outlined"
            placeholder="Enter name.."
            value={values.name}
            onChangeText={text => setValues(prev => ({...prev, name: text}))}
          />
        </View>
        {/* Gender */}
        <View style={styles.rowContainer}>
          <Text style={{padding: 10}}>Gender:</Text>
          <RadioButton.Group
            onValueChange={option => {
              setValues(prev => ({...prev, gender: option}));
            }}
            value={values.gender}>
            <View style={styles.redioOptionContainer}>
              <View style={styles.redioOption}>
                <RadioButton.Android value="male" />
                <Text>Male</Text>
              </View>
              <View style={styles.redioOption}>
                <RadioButton.Android value="female" />
                <Text>Female</Text>
              </View>
              <View style={styles.redioOption}>
                <RadioButton.Android value="trans" />
                <Text>Trans</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        {/* Score */}
        <View style={styles.progressContainer}>
          <Text style={{padding: 10}}>Score:</Text>
          <ProgressBar
            style={styles.progress}
            progress={values.progress}
            color={MD3Colors.error50}
          />
        </View>

        {/* Married */}
        <View style={styles.progressContainer}>
          <Text style={{padding: 10}}>Married:</Text>
          <Switch
            value={values.married}
            onValueChange={() => {
              setValues(prev => ({...prev, married: !prev.married}));
            }}
          />
        </View>

        {/* Contractor */}
        <View style={styles.progressContainer}>
          <Text style={{padding: 10}}>Is Contractor:</Text>
          <Checkbox.Android
            color="red"
            uncheckedColor="green"
            status={values.contractor ? 'checked' : 'unchecked'}
            onPress={() => {
              setValues(prev => ({...prev, contractor: !prev.contractor}));
            }}
          />
        </View>

        {/* Profile Icon */}
        {/* <View style={styles.progressContainer}>
          <Text style={{padding: 10}}>Profile Image:</Text>
          <Button
            title=''
            onPress={() => console.log('Pressed')} />
        </View> */}

        <View>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>

        {/* <View>
            <Button onPress={showDatepicker}>Show date picker!</Button>
            <Button onPress={showTimepicker}>Show time picker!</Button>
            <Text>selected: {date.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
        </View> */}

        {/* <Button title="Go to Details" onPress={() => navigation.navigate('Details')} /> */}

        <View style={styles.rowContainer}>
          <Button
            title="Press me"
            onPress={() => Alert.alert('Simple Button pressed')}
            color="#FCE5CD"
          />
        </View>

        {/* <View style={styles.rowContainer}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View> */}

        <View style={styles.rowContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>

        <View style={styles.rowContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </View>

        <View style={styles.containerscrollview} edges={['top']}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  containerscrollview: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  rowContainer: {
    marginTop: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  redioOptionContainer: {
    flexDirection: 'row',
  },
  redioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    width: 300,
  },
});

export default Home;
