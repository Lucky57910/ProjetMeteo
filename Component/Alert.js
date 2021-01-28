import React from 'react';
import { StyleSheet, View, ImageBackground, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Layout, Text, useTheme, Button, Icon } from '@ui-kitten/components';

import Assets from '../Definition/Assets';
import { IconWarning } from '../Definition/IconUsed';

const Localisation = ({localisation = null}) => {
  const theme = useTheme();
  const taille = useWindowDimensions().width-30;
  const debut = (new Date(localisation.alerts[0].start * 1000)).getDate() + "/" + ((new Date(localisation.alerts[0].start * 1000)).getMonth()+1) + "/" + (new Date(localisation.alerts[0].start * 1000)).getFullYear() + " " + (new Date(localisation.alerts[0].start * 1000)).getHours() + ":" + (new Date(localisation.alerts[0].start * 1000)).getMinutes();
  const fin = (new Date(localisation.alerts[0].end * 1000)).getDate() + "/" + ((new Date(localisation.alerts[0].end * 1000)).getMonth()+1) + "/" + (new Date(localisation.alerts[0].end * 1000)).getFullYear() + " " + (new Date(localisation.alerts[0].end * 1000)).getHours() + ":" + (new Date(localisation.alerts[0].end * 1000)).getMinutes();

  return (
  <Layout style={[styles.metaContainer, {width: taille}]}>
    <ImageBackground source={Assets.images.Storm} style={styles.image}>
      <Layout style={styles.titre}>
        <IconWarning />
        <Text category='h4' style={styles.ecritureTitre} > Alert {localisation.alerts[0].sender_name} </Text>
        <IconWarning />
      </Layout>
      <Text category='h6' style={styles.ecriture} >{localisation.address}</Text>
      <Text category='h6' style={styles.ecriture} >debut : {debut}</Text>
      <Text category='h6' style={styles.ecriture} >fin : {fin}</Text>
      <Text category='h6' style={styles.ecriture} >alerts : {localisation.alerts[0].event}</Text>
    </ImageBackground>
  </Layout>
  );
};

export default Localisation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',

  },
  metaContainer: {
      margin: 15,
      borderRadius: 12,
      minHeight: 100,
  },
  image: {
      flex: 1,
      borderRadius: 12,
  },
  ecriture: {
      color: '#ffffff',
      marginBottom: 10,
      marginLeft: 5,
  },
  titre: {
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  ecritureTitre: {
      color: '#ff0000',
      marginBottom: 10,
  },
  logo: {
    color: '#ff0000',
    height: 22,
  },
});



