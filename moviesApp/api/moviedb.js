import axios from "axios";
import { apiKey } from "../constants";
import { FIREBASE_DB } from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`


//dynamic endpoints
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;


export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMoviesEndpoint);
}

export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}

export const seeAllUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEndpoint)
}

export const seeAllTopRated = ()=>{
    return apiCall(topRatedMoviesEndpoint)
}

// movie screen apis
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}

export const fetchPersonDetails = (id)=>{
    return apiCall(personDetailsEndpoint(id));
}

export const fetchPersonMovies = (id)=>{
    return apiCall(personMoviesEndpoint(id));
}

//favourite movies
export const fetchFavouriteMovies = async () =>{
    try{
        const userId = await AsyncStorage.getItem('user');
        const finaluserId = JSON.parse(userId).uid;
        const docRef = doc(FIREBASE_DB, "favourites", finaluserId);
        const docSnapshot = await getDoc(docRef);
        console.log("From Movie db, the bookmarking data present for the user "+ userId +" is: " + JSON.stringify(docSnapshot.data()));
        //Extract all movie ids
        const docSnapshotData = docSnapshot.data();
        let extractedIntegers = null;
        if (docSnapshotData && docSnapshotData.movieIds) {
            extractedIntegers = docSnapshotData.movieIds.map(Number);
            console.log(extractedIntegers);
        } else {
        console.log('No movieIds array found in the document data.');
        }
        //Get the detail of every movie
        let favMovies = {"results":[]};
        for (const movie of extractedIntegers){
            const movieDetails = await fetchMovieDetails(movie);
            console.log(movieDetails);
            favMovies.results.push(movieDetails);
        }
        console.log(favMovies);
        return favMovies;
    }catch(e){
        console.log('Error while fetching favourite movies' + e);
    }
    //Fetch all the favourite movies of the user
    

    
}