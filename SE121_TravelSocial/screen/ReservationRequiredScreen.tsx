import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Linking, ActivityIndicator } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RadioButton } from 'react-native-paper';


export default function ReservationRequiredScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {

    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [name, setName] = useState({ firstName: '', lastName: '' });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [displayName, setDisplayName] = useState({ firstName: '', lastName: '' });
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [checked, setChecked] = useState('first');

    const handleSelect = (option: string) => {
      setSelectedOption(option);
    };


    const handleSave = (field: string) => {
        if (field === 'name') {
            setDisplayName({ firstName: name.firstName, lastName: name.lastName }); 
        } else if (field === 'phoneNumber') {
            setDisplayPhoneNumber(phoneNumber);
        }
        setIsEditing(null);
    };

    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
    };

    const renderField = (field: string) => {
        switch (field) {
        case 'name':
            return isEditing === 'name' ? (
            <>
                <TextInput
                style={styles.input}
                value={name.firstName}
                onChangeText={(text) => setName({ ...name, firstName: text })}
                placeholder="First Name"
                />
                <TextInput
                style={styles.input}
                value={name.lastName}
                onChangeText={(text) => setName({ ...name, lastName: text })}
                placeholder="Last Name"
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('name')}>
                <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </>
            ) : (
            <Text style={styles.secondtext0}>{`${name.firstName} ${name.lastName}`}</Text>
            );
        case 'phoneNumber':
            return isEditing === 'phoneNumber' ? (
            <>
                <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('phoneNumber')}>
                <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </>
            ) : (
                <Text style={styles.secondtext0}>{displayPhoneNumber || phoneNumber}</Text>
            );
        default:
            return null;
        }
    };

    return (

        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reservation Required</Text>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/camping-ho-coc.png')} style={styles.image} />
                </View>
                <View style ={styles.textContainer}>
                    <Text style= {styles.title}>Ho Coc camping Vung Tau </Text>

                    <View style={styles.detailsContainer}>
                        <View style={styles.ratingBox}>
                            <Image source = {require('../assets/icons/star.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                            <Text style={styles.boxText}>4.1</Text>
                        </View>
                        <View style={styles.featureBox}>
                            <Image source={require('../assets/icons/clock.png')} style ={{marginRight:3,}}></Image>
                            <Text style={styles.boxText}>free cancel in 24h</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
                <Text style={styles.yourbooking}>Your booking</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Date</Text>
                    <Text style={styles.secondtext}>26/6 - 27/6</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Customer</Text>
                    <Text style={styles.secondtext}>4</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Zoom for two people</Text>
                    <Text style={styles.secondtext}>2</Text>
                </View>
            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
                <Text style={styles.yourbooking}>Price detail</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>$50 x 2</Text>
                    <Text style={styles.secondtext1}>$100.00</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Cleaning fee</Text>
                    <Text style={styles.secondtext1}>$6.00</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Service fee</Text>
                    <Text style={styles.secondtext1}>$20.00</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Tax</Text>
                    <Text style={styles.secondtext1}>$8.00</Text>
                </View>

                <View style ={{width:'100%', height:1, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
                
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Total</Text>
                    <Text style={styles.secondtext1}>$134.00</Text>
                </View>

            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.yourbooking}>Payment Method</Text>
                    <Text style={{color:'red', fontSize:20, marginLeft:5}}>*</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Pay all</Text>
                    <Text style={styles.secondtext}>$134.00</Text>
                    <View style={{position:'absolute', right:0,}}>
                        <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                        />
                    </View>
                    
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Pay half first</Text>
                    <Text style={styles.secondtext}>$67.00</Text>
                    <View style={{position:'absolute', right:0,}}>
                        <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                        />
                    </View>
                    
                </View>
                <Text style={{width:'60%',}}>Need to pay $67.00 today and the remaining %67.00 on the 25th</Text>
                
            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            
            <View style={styles.bookingcontainer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.yourbooking}>Contact Infor</Text>
                    <Text style={{color:'red', fontSize:20, marginLeft:5}}>*</Text>
                    
                </View>
                <TouchableOpacity 
                style={styles.rowwithicon}         
                onPress={() => setIsEditing(isEditing === 'phoneNumber' ? null : 'phoneNumber')}
                >
                    <Text style={styles.firsttext}>{phoneNumber ? phoneNumber : 'Phone number'}</Text>
                    <Image
                        source={isEditing === 'phoneNumber'
                            ? require('../assets/icons/arrowdown.png')
                            : require('../assets/icons/arrowright.png')}
                        style={styles.arrowIcon}
                    />                    
                </TouchableOpacity>
                {isEditing === 'phoneNumber' && renderField('phoneNumber')}
                <TouchableOpacity
                style={styles.rowwithicon} 
                onPress={() => setIsEditing(isEditing === 'name' ? null : 'name')}
                >
                    <Text style={styles.firsttext}>{name.firstName || name.lastName ? `${name.firstName} ${name.lastName}` : 'Name'}</Text>
                    <Image
                        source={isEditing === 'name'
                            ? require('../assets/icons/arrowdown.png')
                            : require('../assets/icons/arrowright.png')}
                        style={styles.arrowIcon}
                    />                   
                    </TouchableOpacity>
                {isEditing === 'name' && renderField('name')}

            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
            <View style={{flexDirection:'row'}}>
                    <Text style={styles.yourbooking}>General Rules</Text>
                    <Text style={{color:'red', fontSize:20, marginLeft:5}}>*</Text>
                </View>
            </View>
            
            <View style={{width:'100%', marginVertical:20,}}>
                <View style = {{  alignItems:'center', justifyContent:'center',alignContent:'center',width:'100%'}}>
                    
                    <TouchableOpacity style={styles.addpaymentmethod2} onPress={()=> navigation.navigate('payment-method-screen')} >
                            <Text style={styles.boxText3}>Next to Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>

            
            
        </ScrollView>

        
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    bookingcontainer:{
        marginLeft:20,
        marginTop:10,
        marginBottom:10,
        marginRight:10,
    },

    yourbooking:{
        fontSize:20,
        fontWeight:'bold',
    },

    firsttext:{
        fontSize:20,
        
    },

    secondtext:{
        fontSize:20,
        opacity: 0.6,
        marginLeft:20,
        
    },

    secondtext1:{
        fontSize:20,
        opacity: 0.6,
        marginLeft:20,
        position:'absolute',
        right:20,
    },

    rowwithicon:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:5,
    },

    arrowIcon:{
        marginRight:10,
    
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

      imageContainer: {
        marginLeft:20,
        width: 130,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,
        flexWrap: 'wrap',
    },

    detailsContainer: {
        position:'absolute',
        flexDirection: 'row',
        bottom: 0,
    },
    ratingBox: {
        flexDirection: 'row',
        backgroundColor: '#FFFFE9',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureBox: {
        flexDirection:'row',
        borderRadius:20,
        backgroundColor: '#FFFFE9',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxText:{

    },

    boxText3:{
        color:'white',
        fontWeight:'900',
        fontSize:22,
    },

    addpaymentmethod:{
        borderRadius:20,
        backgroundColor: '#176FF2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:200,
        shadowColor: '#176FF2',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 20,
    },

    addpaymentmethod2:{
        
        borderRadius:60,
        backgroundColor: '#176FF2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:'85%',
        height:60,
    },


    firsttext0:{
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
    
      secondtext0:{
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

});
