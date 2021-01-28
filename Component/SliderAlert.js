import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, Image, ScrollView, View, SafeAreaView, useWindowDimensions, FlatList } from 'react-native';

import Assets from '../Definition/Assets';
import Alert from './Alert';
import { photoOfPlace } from '../API/geocode';
import { IconeBaisse, IconeMonte, IconeFlash } from '../Definition/IconUsed';
import { connect } from 'react-redux';
import { getMeteo } from '../API/Weather';
import { reverseGeocoding, geocoding } from '../API/geocode';

const SliderAlert = (favPlaces) => {

    const [places, setPlaces] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    let id = 0;
    useEffect(() => {
        refreshFavPlaces();
    }, [favPlaces]);

    const refreshFavPlaces = async () => {
        setIsRefreshing(true);
        setIsError(false);
        let places = [];
        try {
            for (const idPlace of favPlaces.favPlaces) {
                const localiteSearchResult = await geocoding(idPlace, "", "");
                let shortName = localiteSearchResult.results[0].address_components[0].long_name;
                for(let j = 0; j<localiteSearchResult.results[0].address_components.length; j++){
                    if(localiteSearchResult.results[0].address_components[j].types[0] == "locality"){
                        shortName = localiteSearchResult.results[0].address_components[j].long_name;
                    }
                }
                let latitude = localiteSearchResult.results[0].geometry.location.lat;
                let longitude = localiteSearchResult.results[0].geometry.location.lng;
                const meteoSearchResult = await getMeteo(latitude, longitude);
                meteoSearchResult.address = localiteSearchResult.results[0].formatted_address;
                meteoSearchResult.short = shortName;
                meteoSearchResult.id = id;
                id++;
                if(meteoSearchResult.alerts.length > 0 ){
                    places.push(meteoSearchResult);
                }
            };
            setPlaces(places);
        } catch (error) {
            console.log(error)
            setIsError(true);
            setPlaces([]);
        }
        setIsRefreshing(false);
    };

    const width = useWindowDimensions().width;
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.round(x / (width));
        if (indexOfNextScreen !== currentPage) {
            setSliderState({...sliderState, currentPage: indexOfNextScreen,});
        }
    };

    const { currentPage: pageIndex } = sliderState;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
          <FlatList
            horizontal={true}
            data={places}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Alert
                localisation={item}
              />
            )}
          />
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(places.length).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>

      </SafeAreaView>
    );

};

const mapStateToProps = (state) => {
  return {
    favPlaces: state.favPlacesID
  }
}

export default connect(mapStateToProps)(SliderAlert);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paginationWrapper: {
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

  paginationDots: {
    height: 10,
    width: 10,
    marginBottom: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
});



