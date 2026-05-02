import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { CalendarIcon, DropdownIcon } from '../../components/icons/BrandedIcons';

const InputField = ({ label, placeholder, value, onChangeText, icon, keyboardType = 'default' }: { 
  label: string, 
  placeholder: string, 
  value: string, 
  onChangeText: (text: string) => void,
  icon?: any,
  keyboardType?: 'default' | 'email-address' | 'numeric'
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#C7C7CD"
        keyboardType={keyboardType}
      />
      {icon && <View style={styles.inputIcon}>{icon}</View>}
    </View>
  </View>
);

const EditProfile = () => {
  const [name, setName] = useState('Minnie');
  const [email, setEmail] = useState('minnie@gmail.com');
  const [dob, setDob] = useState('28/11/2005');
  const [country, setCountry] = useState('Mexico');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop');

  const handleSelectCountry = () => {
    Alert.alert(
      'Select Country',
      'Choose your location',
      [
        { text: 'USA', onPress: () => setCountry('USA') },
        { text: 'Canada', onPress: () => setCountry('Canada') },
        { text: 'Mexico', onPress: () => setCountry('Mexico') },
        { text: 'Brazil', onPress: () => setCountry('Brazil') },
        { text: 'Argentina', onPress: () => setCountry('Argentina') },
        { text: 'Colombia', onPress: () => setCountry('Colombia') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleChangeImage = () => {
    // Simulating an image picker by toggling between two images
    const secondImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop';
    const firstImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop';
    
    setProfileImage(profileImage === firstImage ? secondImage : firstImage);
    
    // In a real app, you'd use expo-image-picker here
    console.log('Image picker triggered');
  };

  const handleSave = () => {
    // Show success feedback
    Alert.alert(
      'Profile Updated',
      'Your changes have been saved successfully.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage} 
              />
              <TouchableOpacity 
                style={styles.editImageIcon}
                onPress={handleChangeImage}
              >
                <MaterialCommunityIcons name="pencil" size={12} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <InputField 
              label="Name" 
              placeholder="Enter your name" 
              value={name}
              onChangeText={setName}
            />
            
            <InputField 
              label="Email" 
              placeholder="Enter your email" 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            
            <InputField 
              label="Date of Birth" 
              placeholder="DD/MM/YYYY" 
              value={dob}
              onChangeText={setDob}
              icon={<CalendarIcon />}
            />
            
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={handleSelectCountry}
            >
              <Text style={styles.inputLabel}>Country</Text>
              <View style={styles.inputWrapper}>
                <Text style={[styles.input, { color: country ? '#000' : '#C7C7CD', paddingTop: 14 }]}>
                  {country || 'Select country'}
                </Text>
                <View style={styles.inputIcon}>
                  <DropdownIcon />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  profileImageSection: {
    marginBottom: 40,
    marginTop: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEE',
  },
  editImageIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7C4DFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  form: {
    width: '100%',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: '100%',
  },
  inputIcon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#3F2D70',
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3F2D70',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    marginTop: 'auto',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default EditProfile;
