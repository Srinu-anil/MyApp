import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Button,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './redux/store';
import {setFieldValue, setActiveSection} from './redux/formSlice';
import {
  DocumentDirectoryPath,
  RoamingDirectoryPath,
} from '@dr.pogodin/react-native-fs';
import {
  completeHandlerIOS,
  downloadFile,
  readFile,
  stopDownload,
} from '@dr.pogodin/react-native-fs';
import {unlink} from '@dr.pogodin/react-native-fs';
import {type PlatformOSType} from 'react-native';
// import Pdf from 'react-native-pdf';

type Field = {
  label: string;
  type: 'text' | 'multiline' | 'radio' | 'image';
  name: string;
  value: string | null;
  options?: string[];
};

const ProtoForms = () => {
  const formState = useSelector((state: RootState) => state).data;
  const dispatch = useDispatch();
  const [urlSource, setUrlSource] = useState({uri: '', cache: false});

  const handleChange = (name: string, value: string) => {
    console.log('form state ', formState);
    dispatch(setFieldValue({section: formState.activeSection, name, value}));
  };

  const savePdf = async (apiUrl, filePath) => {
    const CONTENT = 'GÖÖÐ\n';
    interface ErrorStatus {
      type: 'error';
      message?: string;
    }
    interface SuccessStatus {
      type: 'success';
      message?: string;
    }
    interface PendingStatus {
      type: 'pending';
    }
    interface NotAvailableStatus {
      type: 'notAvailable';
      message: string;
    }
    async function tryUnlink(path: string): Promise<void> {
      try {
        await unlink(path);
      } catch {}
    }

    const Result = {
      error: (...message: string[]): ErrorStatus => ({
        type: 'error',
        message: message.join(' '),
      }),
      catch: (error: any): ErrorStatus => ({
        type: 'error',
        message: `${error.code}: ${error.message}`,
      }),
      success: (...message: string[]): SuccessStatus => ({
        type: 'success',
        message: message.join(' '),
      }),
      pending: (): PendingStatus => ({type: 'pending'}),
      notAvailable: (...platforms: PlatformOSType[]): NotAvailableStatus => ({
        type: 'notAvailable',
        message: `not available on ${Platform.OS} but [${platforms.join(
          ', ',
        )}]`,
      }),
    };

    const PATH = (...path: string[]) =>
      RoamingDirectoryPath + SEPARATOR + path.join(SEPARATOR) + '.pdf';
    const SEPARATOR = Platform.OS === 'windows' ? '\\' : '/';
    const url = apiUrl;
    const path = PATH('downloadFile-1');
    setUrlSource({uri: path, cache: true});
    await tryUnlink(path);
    try {
      // execute
      Alert.alert('path ', path);
      const {jobId, promise} = downloadFile({
        fromUrl: url,
        toFile: path,
      });
      const res = await promise;

      // test
      if (typeof jobId !== 'number') {
        return Result.error(`type ${typeof jobId} !== number`);
      }
      if (res.bytesWritten !== 8) {
        return Result.error(`bytesWritten ${res.bytesWritten} !== 8`);
      }
      if (res.statusCode !== 200) {
        return Result.error(`statusCode ${res.statusCode} !== 200`);
      }

      const file = await readFile(path);
      if (file !== CONTENT) return Result.error(`${file} !== ${CONTENT}`);
      return Result.success();
    } catch (e) {
      return Result.catch(e);
    }
  };

  const handlepdfDownload = () => {
    const apiUrl = 'http://localhost:3000/api/generating-pdf';
    const filePath = `my_document.pdf`;
    savePdf(apiUrl, filePath);
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextInput
            style={styles.input}
            value={field.value ?? ''}
            onChangeText={value => handleChange(field.name, value)}
          />
        );
      case 'multiline':
        return (
          <TextInput
            style={[styles.input, styles.multiLine]}
            multiline
            numberOfLines={4}
            value={field.value ?? ''}
            onChangeText={value => handleChange(field.name, value)}
          />
        );
      case 'radio':
        return (
          <View>
            {field.options?.map(option => (
              <Pressable
                key={option}
                style={styles.radioContainer}
                onPress={() => handleChange(field.name, option)}>
                <View
                  style={[
                    styles.radioCircle,
                    field.value === option && styles.selectedRadio,
                  ]}
                />
                <Text style={styles.radioLabel}>{option}</Text>
              </Pressable>
            ))}
          </View>
        );
      case 'image':
        return (
          <TextInput
            style={styles.input}
            placeholder="Tap to choose photo"
            editable={false}
          />
        );
      default:
        return null;
    }
  };

  const renderSectionFields = () => {
    const sectionKey =
      formState.activeSection.charAt(0).toLowerCase() +
      formState.activeSection.replace(/\s+/g, '').slice(1);
    const section = (formState as any)[sectionKey];
    if (!section || !section.fields)
      return <Text>{formState.activeSection}</Text>;

    return (
      <ScrollView contentContainerStyle={styles.formContent}>
        <Text style={styles.heading}>{formState.activeSection}</Text>
        {section.fields.map((field: Field) => (
          <View key={field.name} style={{marginBottom: 20}}>
            <Text style={styles.label}>{field.label}</Text>
            {renderField(field)}
          </View>
        ))}
        <Button title="Download PDF" onPress={handlepdfDownload} />

        {/* <Pdf
          source={urlSource}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        /> */}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>Work Order Form</Text>
        <FlatList
          data={formState.sections}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Pressable
              onPress={() => dispatch(setActiveSection(item))}
              style={styles.sidebarItem}>
              <Text
                style={[
                  styles.sidebarText,
                  item === formState.activeSection && styles.activeSidebarText,
                ]}>
                {item}
              </Text>
              {item === formState.activeSection && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </Pressable>
          )}
        />
      </View>
      <View style={styles.mainContent}>{renderSectionFields()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sidebar: {
    width: 250,
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sidebarText: {
    fontSize: 14,
    flex: 1,
  },
  activeSidebarText: {
    color: '#0078D4',
    fontWeight: 'bold',
  },
  checkmark: {
    color: '#0078D4',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  formContent: {
    paddingBottom: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  multiLine: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#777',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#0078D4',
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default ProtoForms;
