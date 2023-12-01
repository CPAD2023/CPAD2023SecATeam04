import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { styles } from '../theme/theme';
import { useNavigation } from '@react-navigation/native'
import {image185, fallbackMoviePoster} from '../api/moviedb';
const {width, height} =  Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
    const navigation = useNavigation();
    let movieName= "Ant Man and The Wasp:Quantunamia";
    return(
        <View style={tw`mb-8 space-y-4`}>
            <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-lg`}>{title}</Text>
            {
                !hideSeeAll && (
                    <TouchableOpacity onPress={()=> navigation.navigate('SeeAll')}>
                    <Text style={{ ...styles.text, ...tw`text-lg` }}>See All</Text>
                    </TouchableOpacity>
                            
                )
            }
            
                </View>
                <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
         {
            data.map((item, index)=>(
                    <TouchableWithoutFeedback 
                    key={index} 
                      onPress={()=>navigation.push('Movie', item)}
                    >
                        <View style={tw`space-y-1 mr-4`}>
                        <Image 
                              //source={require('../assets/images/moviePoster2.png')}
                              source={{uri: image185(item.poster_path)|| fallbackMoviePoster}}
                              style={{ ...{ width: width * 0.33, height: height * 0.22 }, ...tw`rounded-3xl` }}>
                                
                              </Image>
                        <Text style={tw`text-neutral-300 ml-1`}>
                        {item && item.title && item.title.length > 14
                            ? item.title.slice(0, 14) + '...'
                            : item?.title
                            }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
            ))
        }
        </ScrollView>
            </View>
    )
}