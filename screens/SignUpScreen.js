import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../firebase';

const LoginScreen = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('HomeScreen');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userCredentials = user.user;
        console.log('Registered user with email: ', userCredentials.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    navigation.navigation('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Welcome to RideSaver, please register!</Text>
        <TextInput
          placeholder='Name'
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#67697C',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#FFFBFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: '#131200',
    borderColor: '#E7C4B1',
    borderWidth: 2,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#CE8964',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: '#FFFBFF',
    marginTop: 5,
    borderColor: '#CE8964',
    borderWidth: 2,
  },

  buttonText: {
    color: '#FFFBFF',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#CE8964',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    fontWeight: 'bold',
    paddingBottom: 20,
    fontSize: 18,
    color: '#FFFBFF',
  },
});