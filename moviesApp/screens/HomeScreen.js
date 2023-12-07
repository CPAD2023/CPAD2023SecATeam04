import { Text, View, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import tw from 'twrnc'
import { styles } from '../theme/theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchFavouriteMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([1, 2, 3])
    const [upcoming, setUpcoming] = useState([1, 2, 3])
    const [toprated, setToprated] = useState([1, 2, 3])
    const [favourites, setFavourites] = useState([1,2,3]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getAuthUser();
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        getFavoriteMovies();
    }, []);
   const getAuthUser = async()=>{
    console.log('Getting user auth function call:');
    try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          console.log('Data retrieved successfully: ', value);
        } else {
          console.log('No data found for the key: ', key);
        }
      } catch (error) {
        console.error('Error retrieving data: ', error);
      }
   }
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        console.log('got trending', data)
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        console.log('got upcoming', data.results.length)
        if (data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        console.log('got top rated', data.results.length)
        if (data && data.results) setToprated(data.results);
    }
    const getFavoriteMovies = async () => {
        await fetchFavouriteMovies();
        console.log('got favourite movies');
    }


    return (
        <View style={tw`flex-1 bg-neutral-800`}>
            <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
                <StatusBar style="light" />
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-white text-3xl font-bold ml-40`}>
                        <Text style={styles.text}>F</Text>ilmy</Text>
                    <TouchableOpacity style={tw`mr-3`} onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {trending.length > 0 && <TrendingMovies data={trending} />}
                        {upcoming.length > 0 && <MovieList title="Upcoming Movies" data={upcoming} />}
                        {toprated.length > 0 && <MovieList title="Top Rated" data={toprated} />}
                        {toprated.length > 0 && <MovieList title="Favourites" data={toprated} />}
                    </ScrollView>)
            }
        </View>
    )
}