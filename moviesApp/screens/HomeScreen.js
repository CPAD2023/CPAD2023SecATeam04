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
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([1, 2, 3])
    const [upcoming, setUpcoming] = useState([1, 2, 3])
    const [toprated, setToprated] = useState([1, 2, 3])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

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

    return (
        <View style={tw`flex-1 bg-neutral-800`}>
            <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
                <StatusBar style="light" />
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-white text-3xl font-bold`}>
                        <Text style={styles.text}>F</Text>ilmy</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
                        {upcoming.length > 0 && <MovieList title="UpcomingMovies" data={upcoming} />}
                        {toprated.length > 0 && <MovieList title="Top Rated" data={toprated} />}

                    </ScrollView>)
            }
        </View>
    )
}