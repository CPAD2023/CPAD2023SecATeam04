import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
import Loading from '../components/loading';
import { styles } from '../theme/theme';
import tw from 'twrnc'

const ios = Platform.OS == 'ios';
const verticalMargin = ios? '':' my-3';
var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
    const {params: item} = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item]);

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        setLoading(false);
        if(data) {
            setPerson(data);
        }
    }
    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        console.log('got person movies')
        if(data && data.cast){
            setPersonMovies(data.cast);
        }

    }

  return (
    <ScrollView
        style={tw `flex-1 bg-neutral-900`}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* back button */}
        <SafeAreaView
            style={tw `flex-row justify-between items-center mx-4 z-10` +verticalMargin}>
            <TouchableOpacity style={styles.background} style={tw `rounded-xl p-1`} onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? 'red': 'white'} />
            </TouchableOpacity>
        </SafeAreaView>

        {/* person details */}
        {
            loading? (
                <Loading />
            ):(
                <View>
                    <View
                        style={tw `flex-row justify-center`}
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 1,
                        }}
                    >
                        <View
                        style={tw `items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2`}>
                            <Image
                                // source={require('../assets/images/castImage2.png')}
                                source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                                style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                    </View>

                    <View style={tw `mt-6`}>
                        <Text style={tw `text-3xl text-white font-bold text-center`}>
                            {/* Keanu Reeves */}
                            {person?.name}
                        </Text>
                        <Text style={tw `text-neutral-500 text-base text-center`}>
                            {person?.place_of_birth}
                            {/* Beirut, Lebanon */}
                        </Text>
                    </View>

                    <View style={tw `mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                        <View style={tw `border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw `text-white font-semibold`}>Gender</Text>
                            <Text style={tw `text-neutral-300 text-sm`}>
                                {/* Male */}
                                {
                                    person?.gender==1? 'Female': 'Male'
                                }
                            </Text>
                        </View>
                        <View style={tw `border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw `text-white font-semibold`}>Birthday</Text>
                            <Text style={tw `text-neutral-300 text-sm`}>
                                {/* 1964-09-02 */}
                                {person?.birthday}
                            </Text>
                        </View>
                        <View style={tw `border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw `text-white font-semibold`}>known for</Text>
                            <Text style={tw `text-neutral-300 text-sm`}>
                                {/* Acting */}
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View style={tw `px-2 items-center`}>
                            <Text style={tw `text-white font-semibold`}>Popularity</Text>
                            <Text style={tw `text-neutral-300 text-sm`}>
                                {/* 84.23 % */}
                                {person?.popularity?.toFixed(2)} %
                            </Text>
                        </View>

                    </View>
                    <View style={tw `my-6 mx-4 space-y-2`}>
                        <Text style={tw `text-white text-lg`}>Biography</Text>
                        <Text style={tw `text-neutral-400 tracking-wide`}>
                            {
                                person?.biography? person.biography : 'N/A'
                            }
                        </Text>
                    </View>

                    {/* person movies */}
                    { person?.id && personMovies.length>0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} /> }

                </View>
            )
        }



    </ScrollView>

  )
}