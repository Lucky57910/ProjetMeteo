import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import Assets from '../Definition/Assets';
const Localisation = ({localisation = null, route, navigation}) => {

  const fullScreen = async () => {
      navigation.navigate('Meteo', {
          localisation: localisation,
      });
  };

  const theme = useTheme();
  let Back = Assets.images.I01d;

  switch(localisation.current.weather[0].icon){
    case "01d": { Back = Assets.images.Sun; break; }
    case "02d": { Back = Assets.images.Sun; break; }
    case "01n": { Back = Assets.images.Sun2; break; }
    case "02n": { Back = Assets.images.Cloud2; break; }
    case "03n": { Back = Assets.images.Cloud2; break; }
    case "04n": { Back = Assets.images.Cloud2; break; }
    case "50n": { Back = Assets.images.Cloud2; break; }
    case "03d": { Back = Assets.images.Cloud; break; }
    case "04d": { Back = Assets.images.Cloud; break; }
    case "50d": { Back = Assets.images.Cloud; break; }
    case "09d": { Back = Assets.images.Rain; break; }
    case "10d": { Back = Assets.images.Rain; break; }
    case "10n": { Back = Assets.images.Rain2; break; }
    case "09n": { Back = Assets.images.Rain2; break; }
    case "11d": { Back = Assets.images.Eclair; break; }
    case "11n": { Back = Assets.images.Eclair2; break; }
    case "13d": { Back = Assets.images.Snow; break; }
    case "13n": { Back = Assets.images.Snow2; break; }
  }
  return (
  <Layout style={styles.container}>
    <TouchableOpacity
      onPress={fullScreen}>
      <ImageBackground source={Back} style={styles.image}>
        <Layout style={styles.containerVille}>
          <Text category='h5' status='control'>{localisation.address}</Text>
        </Layout>
        <Layout style={styles.containerSoustitre}>
          <Text category='h6' status='control'>{localisation.current.weather[0].description}, {Math.round(parseInt(localisation.current.temp))}°C</Text>
        </Layout>
        <Layout style={styles.containerPrevision}>
          <Layout style={styles.containerPrevisionH}>
            <Text category='h6' status='control'>{(new Date(localisation.hourly[1].dt * 1000)).getHours()}:00</Text>
            <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + localisation.hourly[1].weather[0].icon + '@2x.png', }}/>
            <Text category='h6' status='control'>{Math.round(parseInt(localisation.hourly[1].temp))}°C</Text>
          </Layout>
          <Layout style={styles.containerPrevisionH}>
            <Text category='h6' status='control'>{(new Date(localisation.hourly[5].dt * 1000)).getHours()}:00</Text>
            <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + localisation.hourly[5].weather[0].icon + '@2x.png', }}/>
            <Text category='h6' status='control'>{Math.round(parseInt(localisation.hourly[5].temp))}°C</Text>
          </Layout>
          <Layout style={styles.containerPrevisionH}>
            <Text category='h6' status='control'>{(new Date(localisation.hourly[9].dt * 1000)).getHours()}:00</Text>
            <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + localisation.hourly[9].weather[0].icon + '@2x.png', }}/>
            <Text category='h6' status='control'>{Math.round(parseInt(localisation.hourly[9].temp))}°C</Text>
          </Layout>
          <Layout style={styles.containerPrevisionH}>
            <Text category='h6' status='control'>{(new Date(localisation.hourly[13].dt * 1000)).getHours()}:00</Text>
            <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + localisation.hourly[13].weather[0].icon + '@2x.png', }}/>
            <Text category='h6' status='control'>{Math.round(parseInt(localisation.hourly[13].temp))}°C</Text>
          </Layout>
        </Layout>
      </ImageBackground>
    </TouchableOpacity>
  </Layout>
  );
};

export default Localisation;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    margin: 15,
  },
  containerVille: {
    marginLeft: 15,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  containerSoustitre: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  containerTemp: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  containerPrevision: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  containerPrevisionH: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  image: {
      flex: 1,
      borderRadius: 12,
  },
  thumbnail: {
    height: 26,
  },
});



