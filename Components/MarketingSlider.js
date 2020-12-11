import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ITEM_WIDTH, height, SPACING, width } from '../Config/theme'
import { SLIDER_DATA } from '../Config/travel';

export default function MarketingSlider() {
    return (
        <FlatList
            data={SLIDER_DATA}
            keyExtractor={(item) => item.color}
            horizontal
            snapToInterval={ITEM_WIDTH + SPACING * 2}
            contentContainerStyle={
                {
                    paddingRight: width - ITEM_WIDTH - SPACING * 2
                }
            }
            decelerationRate={"fast"}
            renderItem={
                ({ item }) => {
                    return (
                        <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    )
                }
            }
            showsHorizontalScrollIndicator={false}

        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 0.6,
        borderRadius: 16,
        padding: SPACING,
        margin: SPACING,
    },
    text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 22
    }
})
