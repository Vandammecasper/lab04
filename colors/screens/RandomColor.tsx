import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import useRandomColor from "../hooks/useRandomColor"
import IColor from "../models/IColor"

export default () => {
    const [testColor, setTestColor] = useState<IColor>({name: 'snow', rgb: 'rgb(255, 250, 250)', hex: '#FFFAFA'})

    const {navigate} = useNavigation<StackNavigationProp<ParamListBase>>()

    const{getRandomColor} = useRandomColor()

    return (
        <Pressable onPress={()=>setTestColor(getRandomColor(testColor))} style={[styles.container,{backgroundColor: testColor.hex}]}>
            <Text>{testColor.name}</Text>
            <Text>{testColor.rgb}</Text>
            <Text>{testColor.hex}</Text>

            <Text>Tab anywhere to get a new color.</Text>
            <Pressable onPress={() => {navigate('Settings')}} style={null}><Text>Go to settings</Text></Pressable>
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
    },
    

})