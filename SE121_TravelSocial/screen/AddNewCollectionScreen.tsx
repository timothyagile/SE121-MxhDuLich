import { API_BASE_URL } from '@/constants/config';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function AddNewCollectionScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
  const [isFocused, setIsFocused] = useState(false);
  const [collectionName, setCollectionName] = useState('');

  const createCollection = async () => {
    if (!collectionName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên bộ sưu tập.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/collection/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: collectionName }),
      });

      const data = await response.json();

      if (data.isSuccess) {
        Alert.alert("Thành công", "Bộ sưu tập đã được tạo.");
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", data.error || "Không thể tạo bộ sưu tập.");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra trong quá trình tạo bộ sưu tập.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/icons/exit.png')} style={styles.exitIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bộ sưu tập mới</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={createCollection}

        >
          <Text style={styles.createButtonText}>Tạo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.modalText}>Bộ sưu tập mới</Text>
        <TextInput
          style={[
            styles.modalInput,
            isFocused && { borderColor: '#196EEE', color: '#196EEE' },
          ]}
          placeholder="Tên của bộ sưu tập"
          placeholderTextColor={isFocused ? '#196EEE' : '#000000'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={collectionName}
          onChangeText={setCollectionName}
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
