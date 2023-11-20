import {Text, View,Platform,TouchableOpacity,ScrollView} from 'react-native'
import React,{ useEffect, useState }from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {Bars3CenterLeftIcon,MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import tw from 'twrnc'
import { styles } from '../theme/theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';


const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending,setTrending] = useState([1,2,3])
  const [upcoming,setUpcoming] = useState([1,2,3])
  const [toprated,setToprated] = useState([1,2,3])
    return(
        <View style={tw`flex-1 bg-neutral-800`}>
          <SafeAreaView style={ios?tw`-mb-2`: tw`mb-3`}>
          <StatusBar style="light" />
        <View style={tw`flex-row justify-between items-center`}>
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text style={tw`text-white text-3xl font-bold`}>
          <Text style={styles.text}>M</Text>ovies</Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
          </View>
          </SafeAreaView>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >
            <TrendingMovies data={trending}/>
            <MovieList title="UpcomingMovies" data={upcoming}/>
            </ScrollView>
    </View>
    )
}