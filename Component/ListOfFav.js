import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListePere from './ListePere';
import DisplayError from './displayError';
import { getMeteo } from '../API/Weather';
import { reverseGeocoding, geocoding } from '../API/geocode';

const ListOfFav = ({ route, navigation, favPlaces }) => {

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
          for (const idPlace of favPlaces) {
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

            places.push(meteoSearchResult);
          };
          setPlaces(places);
        } catch (error) {
        console.log(error)
          setIsError(true);
          setPlaces([]);
        }
        setIsRefreshing(false);
    };

    return (
      <Layout style={styles.container}>
      { isError ?
          (<DisplayError message='Impossible de récupérer les lieux favoris' />) :
          (<ListePere listeOfLocalisation={places} route={route} navigation={navigation}/>)
      }
      </Layout>
    );
};

const mapStateToProps = (state) => {
  return {
    favPlaces: state.favPlacesID
  }
}

export default connect(mapStateToProps)(ListOfFav);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});