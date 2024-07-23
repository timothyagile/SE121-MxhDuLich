import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function AddNewCollectionScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/icons/exit.png')} style={styles.exitIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New collection</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => console.log('Create button pressed')}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.modalText}>New collection</Text>
        <TextInput
          style={[
            styles.modalInput,
            isFocused && { borderColor: '#196EEE', color: '#196EEE' },
          ]}
          placeholder="Name of collection"
          placeholderTextColor={isFocused ? '#196EEE' : '#000000'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width:'100%',
    position: 'relative',
    backgroundColor: '#ffffff', 
    paddingHorizontal:100,
    paddingVertical:40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  exitButton: {
    position: 'absolute',
    left: 10,
  },
  exitIcon: {
    width: 20,
    height: 20,
  },
  createButton: {
    position: 'absolute',
    right: 10,
  },
  createButtonText: {
    color: '#196EEE',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000000',
  },
});
