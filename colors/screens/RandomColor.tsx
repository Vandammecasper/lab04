import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { Dimensions, GestureResponderEvent, Pressable, Text, View } from "react-native"
import useRandomColor from "../hooks/useRandomColor"
import IColor from "../models/IColor"
import { StyleSheet, Animated, Easing, Vibration} from 'react-native';
import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'
import checkContrast from "../hooks/useContrastColor"
import useContrastColor from "../hooks/useContrastColor"

const circleSize= Math.sqrt(Math.pow(Dimensions.get('window').width, 2) + Math.pow(Dimensions.get('window').height, 2))*2

export default () => {

    const [position, setPosition] = useState<{x: number, y: number}>({x: 100, y: 100})

    const {navigate} = useNavigation<StackNavigationProp<ParamListBase>>()

    const{getRandomColor} = useRandomColor()
    
    const [backgroundColor, setBackgroundColor] = useState<IColor>(getRandomColor())

    const [circleColor, setcircleColor] = useState<IColor>()

    const [scale] = useState<Animated.Value>(new Animated.Value(0))

    const [fade] = useState<Animated.Value>(new Animated.Value(0))
    const {checkContrast} = useContrastColor()

    const[textColor, setTextColor] = useState(checkContrast(backgroundColor.rgb))

    const fadeInText = (color: IColor) => {
        fade.setValue(0)
        setTextColor(checkContrast(backgroundColor.rgb))
        Animated.timing(fade, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.quad
        }).start()}

    const handleNewColor = (event: GestureResponderEvent) => {
        impactAsync(ImpactFeedbackStyle.Light)
        const newColor = getRandomColor(backgroundColor)
        //todo: use event to set position
        setPosition({x: event.nativeEvent.locationX, y: event.nativeEvent.locationY})
        setcircleColor(newColor)
        //todo: use animation to increase circle size
        Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.quad
        }).start(()=>{
            setBackgroundColor(newColor)
            scale.setValue(0)
            fadeInText(newColor)
        })
        
    }
    

    return (
        <Pressable onPress={handleNewColor} style={[styles.container, {backgroundColor: backgroundColor.hex}]}>
            
            <Animated.View style={{opacity : fade}}>
                <Text style={[styles.name, {color:textColor}]}>{backgroundColor.name}</Text>
                <Text style={[styles.rgb, {color: textColor}]}>{backgroundColor.rgb}</Text>
                <Text style={[styles.hex, {color: textColor}]}>{backgroundColor.hex}</Text>

                <Text style={[styles.info, {color:textColor}]}>Tab anywhere to get a new color.</Text>
                <Pressable onPress={() => {navigate('Settings')}} style={null}><Text style={[styles.settings, {color:textColor}]}>Go to settings</Text></Pressable>
            </Animated.View>
            <Animated.View style={[styles.circle, {
                backgroundColor: circleColor?.hex,
                left: position.x,
                top: position.y,
                transform: [{translateX: -circleSize /2}, {translateY: -circleSize /2}, {scale: scale}]}]}
                ></Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        flex: 1,
        justifyContent: 'center',
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: 999,
        position: 'absolute',
        transform: [{translateX: -circleSize /2}, {translateY: -circleSize /2}, {scale: 0.5}]
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