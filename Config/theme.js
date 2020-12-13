import React from 'react'
import { Dimensions } from 'react-native'
const ICON_SIZE = 50;
const ITEM_WIDTH = 240;

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const SPACING = 18;
const SIZE = 64;
const s = width * 0.68;
const x = width * 0.68 * 1.5;
export const tutorial2Spec = {
    ITEM_WIDTH: s,
    ITEM_HEIGHT: x,
    RADIUS: 18,
    SPACING,
    FULL_SIZE: s + SPACING * 2

}

export { ICON_SIZE, ITEM_WIDTH, height, SPACING, width, SIZE, s }