import React, { useState, useEffect } from 'react';
import { Layout, Text, List, ListItem, Divider, useTheme, Button } from '@ui-kitten/components';
import { StyleSheet, Image, ScrollView, View, SafeAreaView, useWindowDimensions, LogBox, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import Assets from '../Definition/Assets';
import { photoOfPlace } from '../API/geocode';
import Slider24Heure from './Slider24Heure';
import { IconeBaisse, IconeMonte, IconeParapluie } from '../Definition/IconUsed';
import { IconNuage, IconWind } from '../Definition/IconSVG';
import { IconFav, IconNotFav, IconFroid, IconChaud } from '../Definition/IconAwesome';
import { LineChart, ProgressChart } from "react-native-chart-kit";

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Meteo = ({ route, navigation, favPlaces, dispatch }) => {
    const theme = useTheme();
    const { localisation } = route.params;
    const [min, setMin] = useState("...");
    const [max, setMax] = useState("...");
    const [url, setUrl] = useState("https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/source.gif");

    const renderItem = ({ item, index }) => {
      let day = 'Lundi';
      switch (new Date(item.dt * 1000).getDay()) {
        case 0: { day = 'Lundi   '; break; }
        case 1: { day = 'Mardi   '; break; }
        case 2: { day = 'Mercredi'; break; }
        case 3: { day = 'Jeudi   '; break; }
        case 4: { day = 'Vendredi'; break; }
        case 5: { day = 'Samedi  '; break; }
        case 6: { day = 'Dimanche'; break; }
      }

      return(
      <Layout style={styles.dailyItem}>
        <Layout style={styles.container4}>
          <Text>{day}</Text>
        </Layout>
        <Image style={styles.thumbnailMini} source={{ uri: 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png', }}/>
        <Layout style={styles.containerMeteo3}>
          <Text>{item.humidity}%</Text>
          <IconeBaisse />
          <Text>{Math.round(item.temp.min)}°C</Text>
          <IconeMonte />
          <Text>{Math.round(item.temp.max)}°C</Text>
        </Layout>
      </Layout>
      );
    };

    const displaySavePlace = () => {
        let fav = false;
        for(let i = 0; i<favPlaces.length; i++){
            if(favPlaces[i] == localisation.address){
                fav = true;
            }
        }
        if (fav) {
          // Le restaurant est sauvegardé
          return (
            <Button style={styles.button} accessoryLeft={IconFav} onPress={unsavePlace} />
          );
        }
        // Le restaurant n'est pas sauvegardé
        return (
            <Button style={styles.button} accessoryLeft={IconNotFav} onPress={savePlace} />
        );
    };
    const savePlace = async () => {
        const action = { type: 'SAVE_PLACE', value: localisation.address };
        dispatch(action);
    }

    const unsavePlace = async () => {
        const action = { type: 'UNSAVE_PLACE', value: localisation.address };
        dispatch(action);
    }
    let heure1 = (new Date(localisation.minutely[0].dt * 1000).getHours()) + ":" + (new Date(localisation.minutely[0].dt * 1000).getMinutes());
    let heure2 = (new Date(localisation.minutely[30].dt * 1000).getHours()) + ":" + (new Date(localisation.minutely[30].dt * 1000).getMinutes());
    let heure3 = (new Date(localisation.minutely[60].dt * 1000).getHours()) + ":" + (new Date(localisation.minutely[60].dt * 1000).getMinutes());
    let width = useWindowDimensions().width;
    let datasets = []
    for(let i = 0; i<localisation.minutely.length; i++){
        datasets[i] = localisation.minutely[i].precipitation;
    }



    const setUp = async () => {
        const reponse = await photoOfPlace(localisation.address);
        setUrl(reponse);
        let maxTmp = -1000;
        let minTmp = 1000;

        for(let i = 0; i<localisation.hourly.length; i++){
            if(Math.round(parseInt(localisation.hourly[i].temp))<minTmp){
                minTmp = Math.round(parseInt(localisation.hourly[i].temp));
            }
            if(Math.round(parseInt(localisation.hourly[i].temp))>maxTmp){
                maxTmp = (Math.round(parseInt(localisation.hourly[i].temp)));
            }
        }
        setMax(maxTmp);
        setMin(minTmp);
    }
    if(url == "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/source.gif"){
        setUp();
    }

    return (
      <Layout style={styles.container}>
        <ImageBackground source={{ uri: url, }} style={styles.thumbnail}>
          <Layout style={styles.containerVille}>
            <Text category='h3' status='control'>{localisation.short}</Text>
            { displaySavePlace() }
          </Layout>
          <Layout style={styles.containerSoustitre}>
            <Text category='h6' status='control'>{localisation.current.weather[0].description}, {Math.round(parseInt(localisation.current.temp))}°C</Text>
          </Layout>
          <Layout style={styles.containerMeteo}>
            <IconFroid style={styles.Chaud} />
            <Text category='h6' status='control'>  {min}°C  </Text>
            <IconChaud style={styles.Froid} />
            <Text category='h6' status='control'>  {max}°C</Text>
          </Layout>
          <Layout style={styles.containerMeteo2}>
            <IconNuage />
            <Text category='h6' status='control'> {localisation.current.clouds}% </Text>
            <IconWind />
            <Text category='h6' status='control'> {Math.round(localisation.current.wind_speed)}km/h </Text>
            <IconeParapluie />
            <Text category='h6' status='control'> {localisation.current.humidity}%</Text>
          </Layout>
        </ImageBackground>
        <ScrollView>
        <Layout style={styles.containerMeteo}>
          <Text category='h5'>Précipitation</Text>
        </Layout>
        <LineChart
          data={{
            labels: [heure1 , "", "", heure2, "", "", heure3],
            datasets: [{ data: datasets }]
          }}
          width={width} height={170}
          yAxisSuffix="mm"
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#66aaed",
            backgroundGradientFrom: "#66aaed",
            backgroundGradientTo: "#8bc1f7",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 6 },
            propsForDots: { r: "0", strokeWidth: "2", stroke: "#ffa726"}
          }}
          bezier
          style={{ margin: 10, borderRadius: 6 }}
        />
        <Layout style={styles.containerMeteo}>
          <Text category='h5'>Prochaine 24h</Text>
        </Layout>
        <Slider24Heure hourly={localisation.hourly} />
        <Layout style={styles.containerMeteo}>
          <Text category='h5'>Prévision 8 jours</Text>
        </Layout>
        <List
          style={styles.containerDaily}
          data={localisation.daily}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        </ScrollView>
      </Layout>
    );
};

const mapStateToProps = (state) => {
  return {
    favPlaces: state.favPlacesID
  }
}

export default connect(mapStateToProps)(Meteo);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  daily: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  containerVille: {
    marginLeft: 15,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: "rgba(0,0,0,0)",
  },
  container4: {
      width: 100,
  },
  containerDaily: {
      maxHeight: 400,
      marginLeft: 15,
      marginRight: 15,
      backgroundColor: 'rgba(0,0,0,0)',
  },
  containerHourly: {
    maxHeight: 180,
  },
  containerMeteo: {
    marginLeft: 15,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
  },
  containerMeteo2: {
    marginLeft: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
  },
  containerMeteo3: {
    marginLeft: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 150,
  },
  containerSoustitre: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 20,
    marginTop: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  thumbnail: {
    height: 200,
  },
  thumbnailMini: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 26,
  },
  dailyItem: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 5,
      height: 30,
  },
  image: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: 26,
    width: 26,
  },
  Chaud: {
      alignItems: 'flex-end',
  },
  Froid: {
      alignItems: 'flex-end',
  },
});