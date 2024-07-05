import {Button, Text, View} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function RegisterScreen ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text>This is Register screen</Text>
            <Button 
            title='Continue'
            onPress={() => navigation.navigate('main-screen')}/>
        </View>
    )
}