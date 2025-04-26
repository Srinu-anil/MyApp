import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {loginSuccess} from './redux/formSlice';
import {formResponse} from './redux/formSlice';
import {DocumentDirectoryPath, PicturesDirectoryPath, RoamingDirectoryPath} from '@dr.pogodin/react-native-fs';
import {
    completeHandlerIOS,
    downloadFile,
    readFile,
    stopDownload,
  } from '@dr.pogodin/react-native-fs';
  import { unlink } from '@dr.pogodin/react-native-fs';
  import { type PlatformOSType } from 'react-native';
// import RNFS from 'react-native-fs';
// import {Buffer} from 'buffer';
// import fs from '@react-native-windows/fs';
// import {promises as fs} from 'fs';
// import RNFS from 'react-native-fs';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation, route}: StackScreenProps<any, 'Screen1'>) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

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
        pending: (): PendingStatus => ({ type: 'pending' }),
        notAvailable: (...platforms: PlatformOSType[]): NotAvailableStatus => ({
          type: 'notAvailable',
          message: `not available on ${Platform.OS} but [${platforms.join(', ')}]`,
        }),
      };

    const ÄÖÜ = 'Hi';
    const PATH = (...path: string[]) =>
        RoamingDirectoryPath + SEPARATOR + ÄÖÜ + path.join(SEPARATOR)+'.pdf';
    const SEPARATOR = Platform.OS === 'windows' ? '\\' : '/';
    const url = apiUrl;
    const path = PATH('downloadFile-1');
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

  const handleLogin = () => {
    dispatch(loginSuccess({email, password}));
    navigation.navigate('AssessmentSurvey');
    // if (email === 'user@example.com' && password === 'password') {
    //     dispatch(loginSuccess({  email, password }));
    //   navigation.navigate('AssessmentSurvey');
    // } else {
    //   Alert.alert('Login Failed', 'Invalid email or password');
    // }

    const generatePdf = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/generating-pdf',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          console.log('pdf generated');
          Alert.alert('pdf generated', response.json.toString());
        } else {
          console.log('pdf not generated');
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    // generatePdf();

    // Example usage:
    const apiUrl = 'http://localhost:3000/api/generating-pdf';
    const filePath = `my_document.pdf`;
    savePdf(apiUrl, filePath);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://qhdcfkbqnfoaeqzfdnfe.supabase.co/rest/v1/form?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZGNma2JxbmZvYWVxemZkbmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMTU4NzksImV4cCI6MjA2MDc5MTg3OX0.RrHBaSqXT-9cPUT448qgx2RPWL5dbmse1V6e7KSC7kU',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const data = await response.json();

        if (response.ok) {
          // Assume token is returned in `data.token`
          dispatch(formResponse(data?.[0]?.data));
          console.log('Login successful:', data);
        } else {
          console.log('Login Failed', data.message || 'Invalid credentials');
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    getData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
});
