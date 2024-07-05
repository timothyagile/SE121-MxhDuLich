import {Button, Text, View} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function WelcomeScreen3 ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text>This is WelcomeScreen 3</Text>
            <Button 
            title='Continue'
            onPress={() => navigation.navigate('login')}/>
        </View>
    )
}