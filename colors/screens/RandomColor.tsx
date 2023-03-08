import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import useRandomColor from "../hooks/useRandomColor"
import IColor from "../models/IColor"
import { StyleSheet} from 'react-native';

export default () => {
    const [testColor, setTestColor] = useState<IColor>({name: 'snow', rgb: 'rgb(255, 250, 250)', hex: '#FFFAFA'})

    const {navigate} = useNavigation<StackNavigationProp<ParamListBase>>()

    const{getRandomColor} = useRandomColor()

    return (
        <Pressable onPress={()=>setTestColor(getRandomColor(testColor))} style={[styles.container,{backgroundColor: testColor.hex}]}>
            <Text style={styles.name}>{testColor.name}</Text>
            <Text style={styles.rgb}>{testColor.rgb}</Text>
            <Text style={styles.hex}>{testColor.hex}</Text>

            <Text style={styles.info}>Tab anywhere to get a new color.</Text>
            <Pressable onPress={() => {navigate('Settings')}} style={null}><Text style={styles.settings}>Go to settings</Text></Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: -100,
        marginBottom: 16,
    },
    rgb: {
        fontSize: 24,
        textAlign: 'left',
    },
    hex: {
        fontSize: 24,
        textAlign: 'left',
        marginBottom: 24,
    },
    info: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 32,
        fontWeight: '100',
    },
    settings: {
        fontSize: 16,
        textAlign: 'left',
    },
})