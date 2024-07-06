import {Button, Text, View} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function LoginScreen ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text>This is Login screen</Text>
            <Button 
            title='Continue'
            onPress={() => navigation.navigate('register')}/>
        </View>
    )
}