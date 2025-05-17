import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '@/context/UserContext';
import {API_BASE_URL} from '../constants/config';

type EditFields = 'name' | 'phoneNumber' | 'email' | 'address' | 'dob' | 'nationality' | 'citizenId';

export default function PersonalInformationScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
  const { userId } = useUser();
  const [isEditing, setIsEditing] = useState<{ [key in EditFields]: boolean }>({
    name: false,
    phoneNumber: false,
    email: false,
    address: false,
    dob: false,
    nationality: false,
    citizenId: false,
  });

  const fieldTranslations = {
    name: 'Tên',
    phoneNumber: 'Số điện thoại',
    email: 'Email',
    address: 'Địa chỉ',
    dob: 'Ngày sinh',
    nationality: 'Quốc tịch',
    citizenId: 'CMND/CCCD'
  };

  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Chưa được cung cấp');
  const [dob, setDob] = useState('Chưa được cung cấp');
  const [nationality, setNationality] = useState('Chưa được cung cấp');
  const [citizenId, setCitizenId] = useState('Chưa được cung cấp');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userUpdated, setUserUpdated] = useState(false);



  const handleEditToggle = (field: EditFields) => {
      setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/getbyid/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setName({ firstName: data.data.userName || 'Người dùng khách', lastName: data.lastName || '' });
      setPhoneNumber(data.data.userPhoneNumber || 'Chưa được cung cấp');
      setEmail(data.data.userEmail || '');
      setAddress(data.userAddress || 'Chưa được cung cấp');
      setDob(data.userDateOfBirth || 'Chưa được cung cấp');
      setNationality(data.Nationality || 'Chưa được cung cấp');
      setCitizenId(data.CitizenId || 'Chưa được cung cấp');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = async (field: EditFields, value: any) => {
    try {
      let updateData = {};
      
      // Xác định đúng tên trường cần cập nhật trong cơ sở dữ liệu
      switch(field) {
        case 'name':
          updateData = { userName: value };
          break;
        case 'phoneNumber':
          updateData = { userPhoneNumber: value };
          break;
        case 'email':
          updateData = { userEmail: value };
          break;
        case 'address':
          updateData = { userAddress: value };
          break;
        case 'dob':
          updateData = { userDateOfBirth: value };
          break;
        case 'nationality':
          updateData = { userNationality: value };
          break;
        case 'citizenId':
          updateData = { userCitizenId: value };
          break;
      }

      console.log(`Cập nhật trường ${field} với giá trị:`, updateData);
      
      const response = await fetch(`${API_BASE_URL}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
        credentials: 'include', // Đảm bảo gửi cookies xác thực
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Cập nhật thành công:', data);
      
      // Cập nhật giao diện người dùng
      switch(field) {
        case 'name':
          setName({ firstName: value, lastName: '' });
          break;
        case 'phoneNumber':
          setPhoneNumber(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'address':
          setAddress(value);
          break;
        case 'dob':
          setDob(value);
          break;
        case 'nationality':
          setNationality(value);
          break;
        case 'citizenId':
          setCitizenId(value);
          break;
      }
      
      Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
    } catch (error) {
      console.error('Lỗi cập nhật thông tin người dùng:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    fetchUserData(); // Gọi API khi màn hình load
  }, [userId]);

  const handleSave = (field: EditFields) => {
    let value;
  
    switch (field) {
      case 'name':
        if (name.firstName.trim() === '' || name.lastName.trim() === '') {
          Alert.alert('Lỗi', 'Họ và tên không được để trống');
          return;
        }
        // Tên đầy đủ hoặc chỉ tên (tùy theo cấu trúc dữ liệu backend)
        value = name.lastName ? `${name.firstName} ${name.lastName}` : name.firstName;
        break;
      case 'phoneNumber':
        if (phoneNumber.trim() === '') {
          Alert.alert('Lỗi', 'Số điện thoại không được để trống');
          return;
        }
        value = phoneNumber;
        break;
      case 'email':
        if (email.trim() === '') {
          Alert.alert('Lỗi', 'Email không được để trống');
          return;
        }
        value = email;
        break;
      case 'address':
        value = [
          selectedWard?.label,
          selectedDistrict?.label,
          selectedProvince?.label,
        ]
          .filter(Boolean)
          .join(', ');
        if (value.trim() === '') value = 'Chưa được cung cấp';
        break;
      case 'dob':
        value = dob.trim() === '' ? 'Chưa được cung cấp' : dob;
        break;
      case 'nationality':
        value = nationality.trim() === '' ? 'Chưa được cung cấp' : nationality;
        break;
      case 'citizenId':
        value = citizenId.trim() === '' ? 'Chưa được cung cấp' : citizenId;
        break;
      default:
        return;
    }
  
    updateUserData(field, value);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handlePhoneNumberChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      setDob(date.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
    }
  };

  const renderEditField = (field: EditFields) => {
    switch (field) {
      case 'name':
        return isEditing.name ? (
          <>
            <TextInput
              style={styles.input}
              value={name.firstName}
              onChangeText={(text) => setName({ ...name, firstName: text })}
              placeholder="Họ"
            />
            <TextInput
              style={styles.input}
              value={name.lastName}
              onChangeText={(text) => setName({ ...name, lastName: text })}
              placeholder="Tên"
            />
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('name')}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.secondtext}>{`${name.firstName} ${name.lastName}`}</Text>
        );
      case 'phoneNumber':
        return isEditing.phoneNumber ? (
          <>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('phoneNumber')}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </>
          
        ) : (
          <Text style={styles.secondtext}>{phoneNumber}</Text>
        );
      case 'email':
        return isEditing.email ? (
          <>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('email')}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.secondtext}>{email}</Text>
        );
      case 'address':
        return isEditing.address ? (
          <>
            {/* <TextInput style={styles.input} value={address} onChangeText={setAddress} /> */}
            <Picker
              selectedValue={selectedProvince?.value}
              style={styles.picker}
              onValueChange={(itemValue) => handleProvinceChange(itemValue)}
            >
              {provinces.map((province) => (
                <Picker.Item key={province.value} label={province.label} value={province.value} />
              ))}
            </Picker>

            <Picker
              selectedValue={selectedDistrict?.value}
              style={styles.picker}
              onValueChange={(itemValue) => handleDistrictChange(itemValue)}
            >
        {districts.map((district) => (
          <Picker.Item key={district.value} label={district.label} value={district.value} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedWard?.value}
        style={styles.picker}
        onValueChange={(itemValue) => handleWardChange(itemValue)}
      >
        {wards.map((ward) => (
          <Picker.Item key={ward.value} label={ward.label} value={ward.value} />
        ))}
      </Picker>

            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('address')}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.secondtext}>{address}</Text>
        );
        case 'dob':
          return isEditing.dob ? (
            <>
              <TextInput
                style={styles.input}
                value={dob}
                placeholder="YYYY-MM-DD"
                editable={true}
                onPress={() => setShowDatePicker(true)}
              />
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('dob')}>
                <Text style={styles.saveButtonText}>Lưu</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.secondtext}>{dob}</Text>
          );

      case 'nationality':
        return isEditing.nationality ? (
          <>
            <TextInput style={styles.input} value={nationality} onChangeText={setNationality} />
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('nationality')}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.secondtext}>{nationality}</Text>
        );
      case 'citizenId':
        return isEditing.citizenId ? (
          <>
            <TextInput style={styles.input} value={citizenId} onChangeText={setCitizenId} keyboardType="phone-pad"/>
            <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('citizenId')}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.secondtext}>{citizenId}</Text>
        );
      default:
        return null;
    }
  };

  const [provinces, setProvinces] = useState<{ label: string; value: string }[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | undefined>(undefined);
  const [selectedProvince, setSelectedProvince] = useState<{ label: string; value: string } | null>(null); 
  const [districts, setDistricts] = useState<{ label: string; value: string }[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | undefined>(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState<{ label: string; value: string } | null>(null);
  const [wards, setWards] = useState<{ label: string; value: string }[]>([]);
  const [selectedWardId, setSelectedWardId] = useState<string | undefined>(undefined);
  const [selectedWard, setSelectedWard] = useState<{ label: string; value: string } | null>(null);

  const handleProvinceChange = (itemValue: string) => {
    setSelectedProvinceId(itemValue);
    const selected = provinces.find(province => province.value === itemValue);
    setSelectedProvince(selected || null);
  };

  const handleDistrictChange = (itemValue: string) => {
    setSelectedDistrictId(itemValue);
    const selected = districts.find(district => district.value === itemValue);
    setSelectedDistrict(selected || null);
  };

  const handleWardChange = (itemValue: string) => {
    setSelectedWardId(itemValue);
    const selected = wards.find(ward => ward.value === itemValue);
    setSelectedWard(selected || null);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.data && Array.isArray(data.data)) {
          const formattedProvinces = data.data.map((province: { id: string; name: string }) => ({
            label: province.name,
            value: province.id,
          }));
          setProvinces(formattedProvinces);
        } else {
          console.error('Data format is incorrect:', data);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceId) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceId}.htm`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data && data.data && Array.isArray(data.data)) {
            const formattedDistricts = data.data.map((district: { id: string; name: string }) => ({
              label: district.name,
              value: district.id,
            }));
            setDistricts(formattedDistricts);
          } else {
            console.error('Data format is incorrect:', data);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };

      fetchDistricts();
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
      setSelectedDistrictId(undefined);

    }
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedDistrictId) {
      const fetchWards = async () => {
        try {
          const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrictId}.htm`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data && data.data && Array.isArray(data.data)) {
            const formattedWards = data.data.map((ward: { id: string; name: string }) => ({
              label: ward.name,
              value: ward.id,
            }));
            setWards(formattedWards);
          } else {
            console.error('Data format is incorrect:', data);
          }
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      };

      fetchWards();
    } else {
      setWards([]);
      setSelectedWard(null);
      setSelectedWardId(undefined);
    }
  }, [selectedDistrict]);

  

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
      </View>

      <ScrollView>
        {(['name', 'phoneNumber', 'email', 'address', 'dob', 'nationality', 'citizenId'] as EditFields[]).map((field) => (
          <View key={field} style={styles.borderview}>
            <View style={styles.containertext}>
            <Text style={styles.firsttext}>{fieldTranslations[field]}</Text>
              <TouchableOpacity onPress={() => handleEditToggle(field)}>
                <Text style={styles.edittext}>{isEditing[field] ? 'Hủy' : 'Chỉnh sửa'}</Text>
              </TouchableOpacity>
            </View>
            {renderEditField(field)}
          </View>
        ))}
      </ScrollView>
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
  arrowleftbutton: {
    position: 'absolute',
    left: 10,
  },
  arrowlefticon: {
    width: 40,
    height: 40,
  },

  containertext:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:5,
    
  },

  borderview:{
    marginLeft:20,
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    paddingBottom: 10, 
    marginBottom: 10, 
    marginRight:20,
  },

  firsttext:{
    fontSize:20,
    opacity:0.8,
    marginLeft:0,
  },

  edittext:{
    marginRight:0,
    fontSize:22,
    textDecorationLine:'underline',
    opacity:0.7,
  },

  secondtext:{
    marginTop:10,
    fontSize:20,
    marginLeft:0,
  },

  input: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius:8,
    marginBottom:5,
  },
  
  saveButton: {
    width:60,
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius:5,
    marginBottom:10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    height: 120,
    width: '100%',
    marginVertical: 10,
  },

});
