import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { register } from '../firebase/authService'; 
import { StackParamList } from './router';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'SignUp'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await register(email, password);
      console.log('Pendaftaran berhasil:', user.email);
      Alert.alert('Sukses', 'Pendaftaran berhasil. Silakan login.');
      navigation.replace('GetStarted'); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Pendaftaran Gagal', error.message); 
      } else {
        Alert.alert('Pendaftaran Gagal', 'Terjadi kesalahan yang tidak diketahui.');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/img/Background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Daftar</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Daftar" onPress={handleRegister} />
        <Text style={styles.signInText}>Sudah punya akun?</Text>
        <Button title="Login" onPress={() => navigation.navigate('GetStarted')} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  signInText: {
    marginTop: 20,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
