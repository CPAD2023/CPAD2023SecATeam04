import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { fetchPopularMovies, fallbackMoviePoster, image185, seeAllTopRated, seeAllUpcomingMovies } from '../api/moviedb';
import { styles } from '../theme/theme';
import Loading from '../components/loading';
const { width, height } = Dimensions.get('window');

export default function SeeAllScreen() {


    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { params: title } = useRoute();

    useEffect(() => {
        getMoreMovies(title);
    }, [title]);

    const getMoreMovies = async () => {
        let data;
        if (title == "Upcoming Movies") {
            data = await seeAllUpcomingMovies();
        }
        else if (title == "Top Rated") {
            data = await seeAllTopRated();
        }
        console.log('clicked see all and got data', data)
        if (data && data.results) setResults(data.results);
        setLoading(false);
    }
    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`mx-4 mb-3 flex-row  items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.push('Home')}
                >
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white text-3xl font-bold ml-25`}>
                    <Text style={styles.text}>S</Text>ee All</Text>
            </View>
            {
                loading ? (
                    <Loading />
                ) : (
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            style={tw`space-y-3`}
                        >

                            <View style={tw`flex-row justify-between flex-wrap`}>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View style={tw`space-y-2 mb-4`}>
                                                    <Image
                                                        //source={require('../assets/images/moviePoster2.png')}
                                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                                        style={{ ...{ width: width * 0.44, height: height * 0.3 }, ...tw`rounded-3xl` }}
                                                    />
                                                    <Text style={tw`text-gray-300 ml-1`}>
                                                        {
                                                            item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={tw`flex-row justify-center`}>
                            <Image
                                source={require('../assets/images/movieTime.png')}
                                style={tw`h-96 w-96`}
                            />
                        </View>
                    )
                )}
        </SafeAreaView>
    )
}
