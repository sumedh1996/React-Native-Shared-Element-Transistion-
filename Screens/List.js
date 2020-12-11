import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from '../Components/Icon'
import MarketingSlider from '../Components/MarketingSlider'
import { DATA } from '../Config/travel';
import { SPACING, ITEM_WIDTH, width } from '../Config/theme'
import { SharedElement } from 'react-navigation-shared-element';

export default function List({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
            <MarketingSlider />
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20
            }}>
                {DATA.map((item) => {
                    return (
                        < TouchableOpacity
                            key={item.id}
                            style={{
                                padding: SPACING
                            }}
                            onPress={() => navigation.push('Detail', { item })}
                        >
                            <SharedElement id={`item.${item.id}.icon`}>
                                <Icon uri={item.imageUri} />
                            </SharedElement>
                        </TouchableOpacity>
                    )
                })}

            </View>
        </SafeAreaView>
    )
}
