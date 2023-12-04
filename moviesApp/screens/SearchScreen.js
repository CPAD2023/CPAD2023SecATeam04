import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';
import { debounce } from 'lodash';
import memoize from 'lodash/memoize';
import Loading from '../components/loading';

const { width, height } = Dimensions.get('window');


export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const memoizedSearchMovies = memoize(searchMovies, ({ query }) => query);
 
    const handleSearch = search => {
        if (search && search.length > 2) {
            setLoading(true);
            const cachedResults = memoizedSearchMovies.cache.get(search);
            // searchMovies({
            //     query: search,
            //     include_adult: false,
            //     language: 'en-US',
            //     page: '1'
            // }).then(data => {
            //     console.log('got search results');
            //     setLoading(false);
            //     if (data && data.results) setResults(data.results);
            // })
            if (cachedResults) {
                console.log('Using memoized results');
                console.log(cachedResults._j.results);
                setLoading(false);
                setResults(cachedResults._j.results);
            } else {
                // Make the API call if not found in memoization
                memoizedSearchMovies({
                    query: search,
                    include_adult: false,
                    language: 'en-US',
                    page: '1'
                })
                    .then(data => {
                        console.log('Got search results');
                        setLoading(false);
   
                        if (data && data.results) {
                            setResults(data.results);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching search results', error);
                        setLoading(false);
                    });
            }
        } else {
            setLoading(false);
            setResults([])
        }
    }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={tw`rounded-full p-3 m-1 bg-neutral-500`}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
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
              <Text style={tw`text-white font-semibold ml-1`}>Results ({results.length})</Text>
              <View style={tw`flex-row justify-between flex-wrap`}>
                {
                  results.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push('Movie', item)}
                    >
                      <View style={tw`space-y-2 mb-4`}>
                        <Image
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
                  ))
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
  );
};

