import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@ui-kitten/components';
import { Image } from 'react-native';

import Recherche from './Recherche';
import ListOfLocalisation from './ListOfLocalisation';
import Meteo from './Meteo';
import ListOfFav from './ListOfFav';

import Assets from '../Definition/Assets';

const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="Recherche"
    >
      <SearchNavigation.Screen
        name="Recherche"
        component={Recherche}
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="ListOfLocalisation"
        component={ListOfLocalisation}
        options={{ title: 'Liste de localisation' }}
      />
      <SearchNavigation.Screen
        name="Meteo"
        component={Meteo}
        options={{ title: 'Meteo' }}
      />
    </SearchNavigation.Navigator>
  )
};

function favStackScreens() {
  return (
    <FavNavigation.Navigator
      initialRouteName="ListOfFav"
    >
      <FavNavigation.Screen
        name="ListOfFav"
        component={ListOfFav}
        options={{ title: 'Favoris' }}
      />
      <FavNavigation.Screen
        name="Meteo"
        component={Meteo}
        options={{ title: 'Meteo' }}
      />
    </FavNavigation.Navigator>
  )
};

function RootStack() {
  const theme = useTheme();
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        activeTintColor: theme['color-primary-default'],
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.images.search} style={{ tintColor: color }} />;
          }
        })}
      />
      <TabNavigation.Screen
        name="Favoris"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.images.fav} style={{ tintColor: color }} />;
          }
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;