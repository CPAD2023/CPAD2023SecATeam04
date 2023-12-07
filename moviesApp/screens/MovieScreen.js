import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { styles } from '../theme/theme';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import { FIREBASE_DB } from '../Firebase';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const MovieScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const movieName = "Ant Man and The Wasp:Quantunamia";
    const [cast, setCast] = useState([1, 2, 3, 4]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        //console.log("itemId ",+ item.id);
        getAuthUserId();
        setLoading(true);
        getMovieDetials(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item])

    //Returns me the user information
    const getAuthUserId = async()=>{
        console.log('Getting user auth function call:');
        const value = await AsyncStorage.getItem('user');
        console.log(JSON.parse(value).uid)
        return JSON.parse(value).uid;
    }

    //If I toggle the button
    //Make the button red
    //Add the movie in user's Favourites List
    const addFavouriteMovie = async()=>{
        try{

            toggleFavourite(!isFavourite);
            
            console.log("Fav movie has been pressed")
            const userId = await getAuthUserId();
            console.log("The user id is " + userId)
            console.log("The movie id is: "+ movie.id)

            const docRef = doc(FIREBASE_DB, "favourites", userId);
            const docSnapshot = await getDoc(docRef);
            
            if(!docSnapshot.exists()){
                await setDoc(docRef, {
                    movieIds : arrayUnion(movie.id)
                })
            }else{
                await updateDoc(docRef, {
                    movieIds : arrayUnion(movie.id)
                })
            }
            
            console.log("Bookmarking successful")
            console.log("The bookmarking data present for the user is: " + JSON.stringify(docSnapshot.data()));

        }catch(e){
            console.log("Error bookmarking"+ e)
        }
        
    }

    const getMovieDetials = async id => {
        const data = await fetchMovieDetails(id);
        ///console.log('got movie details');
        setLoading(false);
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        console.log('got movie credits')
        if (data && data.cast) {
            setCast(data.cast);
        }

    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        if (data && data.results) {
            setSimilarMovies(data.results);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={tw`flex-1 bg-neutral-800`}
        >
            <View style={tw`w-full`}>
                <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 mt-3`}>
                    <TouchableOpacity style={{ ...styles.background, ...tw`rounded-3xl` }} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFavouriteMovie()}>
                        <HeartIcon size="35" color={isFavourite? 'red':'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            ></Image>
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{ width, height: height * 0.40, ...tw`absolute bottom-0` }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }} />
                        </View>
                    )
                }
            </View>
            {/* Ask Udita here for Syntax for className */}
            <View style={{ marginTop: -(height * 0.09) }}>
                <Text style={tw`text-white text-center text-3xl font-bold tracking-widest`}>
                    {
                        movie?.title
                    }
                </Text>


                {/* status, release date */}
                {
                    movie.id ? (
                        <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime}min
                        </Text>
                    ) : null
                }


                {/* genres  */}
                <View style={tw`flex-row justify-center mx-4 space-x-2`}>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text style={tw`text-neutral-400 mx-4 tracking-wide`}>
                    {
                        movie?.overview
                    }
                </Text>
            </View>


            {/* cast */}
            {
                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
            }

            {/* similar movies section */}
            {
                movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
            }
        </ScrollView>
    )
}

export default MovieScreen