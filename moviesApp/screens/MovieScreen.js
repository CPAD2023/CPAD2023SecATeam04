import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image} from 'react-native'
import React, { useEffect, useState} from 'react'
import { useRoute, useNavigation} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { styles } from '../theme/theme';


var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';

const MovieScreen = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const movieName = "Ant Man and The Wasp:Quantunamia";
  const [cast, setCast] = useState([1,2,3,4]);
  const [similarMovies, setSimilarMovies] = useState([1,2,3,4]);
  useEffect(()=>{
    //call movie details api
  }, [item])
  return (
    <ScrollView
    contentContainerStyle={{paddingBottom:20}}
    style={tw `flex-1 bg-neutral-800`}
    >
      <View style={tw `w-full`}>
        <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 mt-3`}>
          <TouchableOpacity style={{ ...styles.background, ...tw`rounded-3xl` }} onPress={()=>navigation.goBack()}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? 'red': 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image source={require('../assets/images/moviePoster2.png')}
          style={{width, height: height*0.55}} 
          ></Image>
          <LinearGradient 
             colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
            style={{ width, height: height * 0.40, ...tw`absolute bottom-0` }}
                   start={{ x: 0.5, y: 0 }}
                 end={{ x: 0.5, y: 1 }}/>
        </View>
      </View>
      {/* Ask Udita here for Syntax for className */}
      <View style={{marginTop: -(height*0.09)}}>
        <Text style={tw `text-white text-center text-3xl font-bold tracking-widest`}>
          {movieName}
        </Text>
        <Text style={tw `text-neutral-400 font-semibold text-base text-center`}>
          Released - 2020 - 170 min
        </Text>
        <View style={tw `flex-row justify-center mx-4 space-x-2`}>
          <Text style={tw `text-neutral-400 font-semibold text-base text-center`}>
            Action -
          </Text>
          <Text style={tw `text-neutral-400 font-semibold text-base text-center`}>
            Thriller - 
          </Text>
          <Text style={tw `text-neutral-400 font-semibold text-base text-center`}>
            Comedy 
          </Text>
        </View>
        <Text style={tw `text-neutral-400 mx-4 tracking-wide`}>
        Superheroes doing something lol and saving the world once again with their powers. So another typical superhero movie. XD
        </Text>

      </View>
      <Cast navigation={navigation} cast={cast}></Cast>

      <MovieList title="Similar Movies" data={similarMovies} hideSeeAll={true}></MovieList>
    </ScrollView>
  )
}

export default MovieScreen