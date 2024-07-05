import {Button, Text, View} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function WelcomeScreen2 ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text>This is WelcomeScreen 2</Text>
            <Button 
            title='Continue'
            onPress={() => navigation.navigate('welcome3')}/>
        </View>
    )
}