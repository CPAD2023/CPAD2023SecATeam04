import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronDoubleLeftIcon, HeartIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import { styles } from '../theme/theme';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
import Loading from '../components/loading';


const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';
var { width, height } = Dimensions.get('window');

export default function PersonScreen() {

    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, SetPerson] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        console.log("got person details");
        if (data) SetPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        console.log("got person movies");
        if (data && data.cast) setPersonMovies(data.cast);
        setLoading(false);
    }

    return (

        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={tw`flex-1 bg-neutral-800`}
        >
            <View style={tw`w-full`}>
                <SafeAreaView style={tw`z-20 w-full flex-row justify-between items-center px-4 mt-3`}>
                    <TouchableOpacity style={{ ...styles.background, ...tw`rounded-3xl` }} onPress={() => navigation.goBack()}>
                        <ChevronDoubleLeftIcon size="28" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* person details */}
                <View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <View style={tw`items-center rounded-full overflow-hidden h-72 border-2 border-neutral-400`}>
                            <Image
                                //source={require('../assets/images/castImage1.png')}
                                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                style={{ height: height * 0.43, width: width * 0.74 }}
                            />
                        </View>
                    </View>
                    <View style={tw`mt-6`}>
                        <Text style={tw`text-3xl text-white font-bold text-center`}>
                            {person?.name}
                        </Text>
                        <Text style={tw`text-base text-neutral-500 text-center`}>
                            {
                                person?.place_of_birth
                            }
                        </Text>
                    </View>
                    <View style={tw`mx-2 px-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full `}>
                        <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw` text-white font-semibold`}>Gender</Text>
                            <Text style={tw` text-neutral-300 text-sm`}>
                                {
                                    person?.gender == 1 ? 'Female' : 'Male'
                                }
                            </Text>
                        </View>
                        <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw` text-white font-semibold`}>Birthday</Text>
                            <Text style={tw` text-neutral-300 text-sm`}>
                                {
                                    person?.birthday
                                }
                            </Text>
                        </View>
                        <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw` text-white font-semibold`}>Gender</Text>
                            <Text style={tw` text-neutral-300 text-sm`}>
                                {
                                    person?.known_for_department
                                }
                            </Text>
                        </View>
                        <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                            <Text style={tw` text-white font-semibold`}>Popularity</Text>
                            <Text style={tw` text-neutral-300 text-sm`}>
                                {
                                    person?.popularity?.toFixed(2)
                                } %
                            </Text>
                        </View>
                    </View>
                    <View style={tw`my-6 mx-4 space-y-2`}>
                        <Text style={tw` text-white text-lg`}>Biography</Text>
                        <Text style={tw` text-neutral-400 tracking0-wide`}>
                            {
                                person?.biography || 'N/A'
                            }
                        </Text>
                    </View>


                    {/* {Movies list} */}
                    <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                </View>

            </View>
        </ScrollView>
    )
}