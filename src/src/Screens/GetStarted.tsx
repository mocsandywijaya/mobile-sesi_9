import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../firebase/authService'; 
import { StackParamList } from './router';

type GetStartedProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'GetStarted'>;
};

const GetStarted: React.FC<GetStartedProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      console.log('Login berhasil:', user.email);
      navigation.replace('Home', { userId: user.uid }); 
    } catch (error: any) {
      Alert.alert('Login Gagal', error.message || 'Terjadi kesalahan saat login.');
    }
  };
  

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp'); 
  };

  return (
    <ImageBackground
      source={require('../assets/img/Background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Masuk</Text>
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
        <Button title="Masuk" onPress={handleLogin} />
        <Text style={styles.signUpText} onPress={handleSignUpNavigation}>
          Belum punya akun? Daftar di sini
        </Text>
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
  signUpText: {
    marginTop: 20,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default GetStarted;
