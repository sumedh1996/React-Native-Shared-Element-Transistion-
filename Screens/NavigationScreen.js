import React from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'

export default function NavigationScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Button title='Navigate to Project 1' onPress={() => navigation.navigate('List')} />
            <Button title='Navigate to Project 2' onPress={() => navigation.navigate('TravelList')} />
        </SafeAreaView>
    )
}
