import React, { useState, useEffect } from 'react';
import { Layout, Text, List, ListItem } from '@ui-kitten/components';
import { StyleSheet, Image, ScrollView, View, SafeAreaView, useWindowDimensions } from 'react-native';

import Assets from '../Definition/Assets';
import { photoOfPlace } from '../API/geocode';
import { IconeBaisse, IconeMonte, IconeFlash } from '../Definition/IconUsed';

const Slider24Heure = (hourly) => {
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
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
            <View style={{width: useWindowDimensions().width}}>
              <Layout style={styles.containerPrevision}>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[1].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[1].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[1].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[2].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[2].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[2].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[3].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[3].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[3].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[4].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[4].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[4].temp))}°C</Text>
                </Layout>
              </Layout>
            </View>
            <View style={{width: useWindowDimensions().width, height: 100}}>
              <Layout style={styles.containerPrevision}>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[5].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[5].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[5].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[6].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[6].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[6].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[7].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[7].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[7].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[8].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[8].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[8].temp))}°C</Text>
                </Layout>
              </Layout>
            </View>
            <View style={{width: useWindowDimensions().width, height: 100}}>
              <Layout style={styles.containerPrevision}>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[9].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[9].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[9].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[10].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[10].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[10].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[11].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[11].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[11].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[12].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[12].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[12].temp))}°C</Text>
                </Layout>
              </Layout>
            </View>
            <View style={{width: useWindowDimensions().width, height: 100}}>
              <Layout style={styles.containerPrevision}>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[13].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[13].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[13].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[14].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[14].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[14].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[15].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[15].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[15].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[16].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[16].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[16].temp))}°C</Text>
                </Layout>
              </Layout>
            </View>
            <View style={{width: useWindowDimensions().width, height: 100}}>
              <Layout style={styles.containerPrevision}>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[17].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[17].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[17].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[18].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[18].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[18].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[19].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[19].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[19].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[20].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[20].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[20].temp))}°C</Text>
                </Layout>
              </Layout>
            </View>
            <View style={{width: useWindowDimensions().width, height: 100}}>
              <Layout style={styles.containerPrevision}>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[21].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[21].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[21].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[22].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[22].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[22].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[23].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[23].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[23].temp))}°C</Text>
                </Layout>
                <Layout style={styles.containerPrevisionH}>
                    <Text category='h6'>{(new Date(hourly.hourly[24].dt * 1000)).getHours()}:00</Text>
                    <Image style={styles.thumbnail} source={{ uri: 'http://openweathermap.org/img/wn/' + hourly.hourly[24].weather[0].icon + '@2x.png', }}/>
                    <Text category='h6'>{Math.round(parseInt(hourly.hourly[24].temp))}°C</Text>
                </Layout>
              </Layout>
            </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
            {Array.from(Array(6).keys()).map((key, index) => (
                <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
            ))}
        </View>
    </SafeAreaView>
    );
};

export default Slider24Heure;

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
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
  containerPrevisionH: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  containerPrevision: {
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  image: {
      flex: 1,
      borderRadius: 12,
  },
  thumbnail: {
    height: 26,
  },
});