import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../utils/authService'; // Import login function

const LoginScreen = ({ navigation, handleLogin }) => {
  const { control, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data.email, data.password);
      if (response.token) {
        Alert.alert("Success", "Login successful!");
        reset(); // Reset form fields
        handleLogin(); // Update authentication state
      } else {
        Alert.alert("Login Failed", response.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/Wallpaper.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF8700',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
