import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import * as Progress from 'react-native-progress';
import { styles, theme } from '../theme/theme';
const { width, height } = Dimensions.get('window');

export default function Loading() {
    return (
        <View style={{ ...{ width: width, height: height }, ...tw`absolute flex-row justify-center items-center` }}>
            <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    )
}