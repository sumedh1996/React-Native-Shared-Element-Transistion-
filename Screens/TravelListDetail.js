import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { tutorial2Spec, width } from '../Config/theme';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable'
import { FlatList } from 'react-native-gesture-handler';


const { ITEM_HEIGHT, ITEM_WIDTH, SPACING, FULL_SIZE, RADIUS } = tutorial2Spec;

const zoomIn = {
    0: {
        opacity: 0,
        scale: 0
    },
    1: {
        opacity: 1,
        scale: 1
    }
}

const TravelListDetail = ({ navigation, route }) => {
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AntDesign
                name="<ArrowLeftOutlined />"
                size={24}
                color='#333'
                style={
                    {
                        paddingHorizontal: SPACING,
                        position: 'absolute',
                        top: 50,
                        left: 10,
                        zIndex: 2
                    }
                }
                onPress={navigation.goBack}
            />
            <SharedElement id={`item.${item.key}.photo`} style={[StyleSheet.absoluteFillObject, { borderRadius: 0 }]}>
                <View style={[StyleSheet.absoluteFillObject]}>
                    <Image source={{ uri: item.image }} style={[StyleSheet.absoluteFillObject, {
                        resizeMode: 'cover',

                    }]} />
                </View>
            </SharedElement>

            <SharedElement id={`item.${item.key}.location`}>
                <Text style={[styles.location, {

                }]}>
                    {item.location}

                </Text>
            </SharedElement>
            <View style={{ position: 'absolute', bottom: 120, left: SPACING, right: SPACING, padding: SPACING }}>
                <Text style={{
                    fontSize: 16, width: '100%', color: '#fff',
                    fontWeight: '800',
                    width: ITEM_HEIGHT * 0.8,
                    textTransform: 'uppercase',
                    position: 'absolute',
                }}>
                    Activities
                </Text>
                <FlatList
                    data={[...Array(8).keys()]}
                    keyExtractor={item => String(item)}
                    contentContainerStyle={
                        {
                            padding: SPACING
                        }
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return <Animatable.View
                            duration={700}
                            animation={"zoomIn"}
                            delay={400 + index * 100}
                            style={{ backgroundColor: '#fff', padding: SPACING, width: width * 0.3, height: width * 0.5, marginRight: SPACING }}>
                            <Image source={{ uri: 'https://miro.medium.com/max/124/1*qYUvh-EtES8dtgKiBRiLsA.png' }}
                                style={{
                                    width: '100%',
                                    height: '70%',
                                    resizeMode: 'cover'
                                }} />
                            <Text>Activity #{item + 1}</Text>
                        </Animatable.View>
                    }}
                />

            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: SPACING

    },
    location: {
        fontSize: 30, color: '#fff',
        fontWeight: '800',
        width: ITEM_HEIGHT * 0.8,
        textTransform: 'uppercase',
        position: 'absolute',
        top: 100,
        left: SPACING * 2
    }
})

TravelListDetail.SharedElement = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [{
        id: `item.${item.key}.photo`
    }, {
        id: `item.${item.key}.location`
    }]
}


export default TravelListDetail;
