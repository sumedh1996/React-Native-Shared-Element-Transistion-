import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ScrollView, StyleSheet, Animated } from 'react-native'
import BackIcon from '../Components/BackIcon';
import Icon from '../Components/Icon';
import { DATA } from '../Config/travel'
import { SPACING, ICON_SIZE, width } from '../Config/theme'
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {

    const navigation = useNavigation();
    const { item } = route.params;
    const ref = React.useRef();
    const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
    const mountedAnimated = React.useRef(new Animated.Value(0)).current;
    const activeIndex = React.useRef(new Animated.Value(selectedItemIndex)).current;
    const activeIndexAnimation = React.useRef(new Animated.Value(selectedItemIndex)).current;

    const animation = (toValue, delay) =>
        Animated.timing(mountedAnimated, {
            toValue,
            duration: 500,
            delay,
            useNativeDriver: true
        });

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(activeIndexAnimation, {
                toValue: activeIndex,
                duration: 300,
                useNativeDriver: true
            }),
            animation(1, 1000)
        ]).start();
    })

    const size = ICON_SIZE + SPACING * 2;

    // Animate components
    const translateY = mountedAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 1]
    })



    const translateX = activeIndexAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [size, 0, -size]
    })


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 35 : 0 }}>
            <BackIcon
                onPress={() => {
                    animation(0).start(() => {
                        navigation.navigate('List');
                    });
                }} />
            <Animated.View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    marginVertical: 20,
                    marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
                    transform: [{ translateX }]
                }}>
                {
                    DATA.map((item, index) => {
                        const inputRange = [(index - 1), index, (index + 1)];
                        const opacity = activeIndexAnimation.interpolate({
                            inputRange,
                            outputRange: [.3, 1, .3],
                            extrapolate: 'clamp'
                        })
                        return <TouchableOpacity style={{
                            padding: SPACING,
                            alignItems: 'center'
                        }} key={item.id}
                            onPress={() => {
                                activeIndex.setValue(index);
                                //Scroll to index works vecause we have getItemLayout in FlatList
                                ref.current.scrollToIndex({
                                    index, animated: true
                                })
                            }}
                        >
                            <Animated.View style={{ alignItems: 'center', opacity }}>
                                <SharedElement id={`item.${item.id}.icon`}>
                                    <Icon uri={item.imageUri} />
                                </SharedElement>
                                <Text style={{
                                    fontSize: 14
                                }}>{item.title}</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    })
                }
            </Animated.View>
            <Animated.FlatList
                style={{
                    opacity: mountedAnimated, transform: [{ translateY }]
                }}
                ref={ref}
                data={DATA}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                initialScrollIndex={selectedItemIndex}
                nestedScrollEnabled
                getItemLayout={
                    (data, index) => ({
                        length: width,
                        offset: width * index,
                        index
                    })
                }
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
                    activeIndex.setValue(newIndex);
                }}
                renderItem={
                    ({ item }) => {
                        return (
                            <ScrollView style={{
                                width: width - SPACING * 2,
                                margin: SPACING,
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                borderRadius: 16
                            }}>
                                <View style={{ padding: SPACING }}>
                                    <Text style={{ fontSize: 16 }}>
                                        {Array(50).fill(`${item.title} inner text \n`)}
                                    </Text>
                                </View>

                            </ScrollView>
                        )
                    }
                }
            />
        </SafeAreaView>
    )
};

Detail.sharedElements = (route, otherRoute, showing) => {
    return DATA.map(item => `item.${item.id}.icon`);
}

export default Detail;

const styles = StyleSheet.create({
    imageContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE / 2,
        backgroundColor: '#ddd',
        alignItems: 'center',
    }
})