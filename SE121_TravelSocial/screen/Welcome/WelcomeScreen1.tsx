import {Button, Text, View} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function WelcomeScreen1 ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text>This is WelcomeScreen 1</Text>
            <Button 
            title='Continue'
            onPress={() => navigation.navigate('welcome2')}/>
        </View>
    )
}