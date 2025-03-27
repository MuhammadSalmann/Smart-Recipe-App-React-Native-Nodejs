// screens/SignupScreen.js
import React from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { emailValidation } from '../utils/validation';
import { registerUser } from '../utils/authService';
import { useState } from 'react';

const SignupScreen = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      location: '',
      email: '',
      password: ''
    }
  });
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    try{
      setLoading(true);
      if (!emailValidation(data.email)) return alert('Invalid email');
      if (data.password.length < 6) return alert('Password must be at least 6 characters');
      const response = await registerUser(data);
      if (response.user) {
        Alert.alert("Success", `Sign up successful! ${response.user.email}`);
        reset(); // Reset form fields
        navigation.navigate('Login');
      } else {
        Alert.alert("Sign Up Failed", response.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <ImageBackground
      source={require('../assets/Wallpaper.png')} // Ensure this path is correct
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Location"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF5722' }]} // Green background for Login
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF8700', // Ensure text is visible on the wallpaper
    fontWeight: 'bold', 
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Semi-transparent black background
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for better readability
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
