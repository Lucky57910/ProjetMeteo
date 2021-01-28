import React from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { List, Layout } from '@ui-kitten/components';

import Localisation from './Localisation';

const ListePere = ({listeOfLocalisation = null, route, navigation}) => (
  <Layout style={styles.container}>
      <FlatList
        data={listeOfLocalisation}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Localisation
            localisation={item}
            route={route}
            navigation={navigation}/>
        )}
      />
  </Layout>
);

export default ListePere;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});