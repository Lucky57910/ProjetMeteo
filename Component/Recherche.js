import React, { useState, useEffect } from 'react';
import { Text, Input, Button, Layout } from '@ui-kitten/components';
import { Platform, Alert, StyleSheet, Image, ImageBackground, View } from 'react-native';
import * as Location from 'expo-location';

import { IconeLocalisation, IconeSearch } from '../Definition/IconUsed';
import Assets from '../Definition/Assets';
import { getMeteo } from '../API/Weather';
import SliderAlert from './SliderAlert';
import { reverseGeocoding, geocoding } from '../API/geocode';

const Recherche = ({ route, navigation }) => {
    let id = 0;
    let localite = [];

    const [searchVille, setSearchVille] = useState('');
    const [searchCP, setSearchCP] = useState('');
    const [searchPays, setSearchPays] = useState('');
    const [disabled, setDisabled] = useState(false);

    const addLocalite = (prevLocalite, localiteSearchResult) => {
        localite = [...prevLocalite, localiteSearchResult];
    }

    const requestMeteo = async (latitude, longitude, address, short) => {
        try {
            const localiteSearchResult = await getMeteo(latitude, longitude);
            localiteSearchResult.address = address;
            localiteSearchResult.short = short;
            localiteSearchResult.id = id;
            id++;
            addLocalite(localite, localiteSearchResult);
        }catch (error) {
            setDisabled(false);
            navigation.navigate('ListOfLocalisation', {
                isError: true,
                message : "Erreur lors de l'obtention des données météo !",
            });
        }
    };

    findCoordinates = async () => {
        setDisabled(true);
        localite = [];
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setDisabled(false);
            navigation.navigate('ListOfLocalisation', {
                isError: true,
                message : "Vous devez autoriser l'application à accèder à la localisation de l'appareil si vous souhaiter vous géolocaliser !" ,
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        try {
            const localiteSearchResult = await reverseGeocoding(location.coords.latitude, location.coords.longitude);
            let adresse = "";
            let locality = "";
            let country = "";
            let postal_code = "";
            for (let i = 0; i < localiteSearchResult.results[0].address_components.length; i++)
            {
                if(localiteSearchResult.results[0].address_components[i].types[0] == "locality"){
                    locality = localiteSearchResult.results[0].address_components[i].long_name;
                }
                if(localiteSearchResult.results[0].address_components[i].types[0] == "postal_code"){
                    postal_code = localiteSearchResult.results[0].address_components[i].long_name;
                }
                if(localiteSearchResult.results[0].address_components[i].types[0] == "country"){
                    country = localiteSearchResult.results[0].address_components[i].long_name;
                }
            }
            adresse = postal_code + " " + locality + "," + country;
            await requestMeteo(location.coords.latitude, location.coords.longitude, adresse, locality, localiteSearchResult.results[0].place_id);

            setDisabled(false);
            navigation.navigate('ListOfLocalisation', {
                isError: false,
                listeOfLocalisation: localite,
            });
        }catch (error) {
            setDisabled(false);
            navigation.navigate('ListOfLocalisation', {
                isError: true,
                message : "Erreur lors de la géolocalisation ! Etes vous sur d'être géolocalisable ?",
            });
        }
    };

    findCity= async () => {
        setDisabled(true);
        localite = [];
        try {
            const localiteSearchResult = await geocoding(searchVille, searchPays, searchCP);
            for(let i = 0; i < localiteSearchResult.results.length; i++){
                let shortName = localiteSearchResult.results[i].address_components[0].long_name;
                for(let j = 0; j<localiteSearchResult.results[i].address_components.length; j++){
                    if(localiteSearchResult.results[i].address_components[j].types[0] == "locality"){
                        shortName = localiteSearchResult.results[i].address_components[j].long_name;
                    }
                }
                await requestMeteo(localiteSearchResult.results[i].geometry.location.lat, localiteSearchResult.results[i].geometry.location.lng, localiteSearchResult.results[i].formatted_address, shortName);
            }

            if(localiteSearchResult.status == "OK"){
                setDisabled(false);
                navigation.navigate('ListOfLocalisation', {
                    isError: false,
                    listeOfLocalisation: localite,
                });
            }else{
                setDisabled(false);
                navigation.navigate('ListOfLocalisation', {
                    isError: true,
                    message: "Pas de résultat avec ces paramètres de recherche",
                });
            }

        }catch (error) {
            setDisabled(false);
            navigation.navigate('ListOfLocalisation', {
                isError: true,
                message : "Localisation introuvable " + error,
            });
        }
    };

    return (
      <Layout style={styles.metaContainer}>
        <Layout style={styles.gif2}>
          <ImageBackground source={Assets.images.Rain} style={styles.image}>
            <Layout style={styles.Surtitre} />
            <Layout style={styles.titre}>
              <Text style={styles.transparent} status='control' category='h1'>Météo(rite)</Text>
            </Layout>
            <Layout style={styles.Soustitre} />
          </ImageBackground>
        </Layout>
        <Layout style={styles.container}>
          <Input
              style={styles.espace}
              placeholder='Ville'
              onChangeText={(text) => setSearchVille(text)}>
          </Input>
          <Layout style={styles.container_CPPAYS}>
            <Input
                style={[styles.flexD, styles.espace]}
                placeholder='Code postal'
                onChangeText={(text) => setSearchCP(text)}>
            </Input>
            <Input
                style={[styles.flexG, styles.espace]}
                placeholder='Pays'
                onChangeText={(text) => setSearchPays(text)}>
            </Input>
          </Layout>
          <Layout style={styles.buttons}>
            <Button style={styles.button} onPress={findCity} disabled={disabled} accessoryLeft={IconeSearch} title='Rechercher' >Rechercher</Button>
            <Button style={styles.button} onPress={findCoordinates} disabled={disabled} accessoryLeft={IconeLocalisation} title='Me localiser'>Me localiser</Button>
          </Layout>
        </Layout>
        <Layout style={styles.alert}>
            <SliderAlert />
        </Layout>
      </Layout>
    );
};

export default Recherche;

const styles = StyleSheet.create({
    metaContainer: {
        flex: 1,
    },
    container: {
        flex: 3,
        marginTop: 26,
        marginLeft: 25,
        marginRight: 25,
    },
    alert: {
        flex: 4,
    },
    container_CPPAYS: {
        flexDirection: 'row',
        marginTop: 15,
    },
    button: {
        marginTop: 26,
        marginLeft: 10,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    flexG: {
      flex: 1,
      marginLeft: 5,
    },
    flexD: {
      flex: 1,
      marginRight: 5,
    },
    espace: {
        marginBottom: 6,
    },
    gif: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_gif: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
      flex: 1,
    },
    transparent: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    gif2: {
        flex: 3,
    },
    titre: {
        flex: 1,
        marginLeft: 25,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    Surtitre: {
        flex: 3,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    Soustitre: {
        flex: 2,
        backgroundColor: 'rgba(0,0,0,0)',
    },
});