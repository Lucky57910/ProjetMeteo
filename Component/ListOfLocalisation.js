import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import ListePere from './ListePere';
import DisplayError from './displayError';

const ListOfLocalisation = ({ route, navigation }) => {
    const { isError } = route.params;
    const { message } = route.params;
    const { listeOfLocalisation } = route.params;
    let isError2 = false;
    let message2 = "";

    if(listeOfLocalisation == null){
        isError2 = true;
        message2 = "Une erreur est survenu lors des appel API";
    }

    return (
      <Layout style={styles.container}>
        { isError ? (
            <DisplayError message={message} />
        ) : (
            <>
                { isError2 ? (
                    <DisplayError message={message2} />
                ) : (
                    <ListePere listeOfLocalisation={listeOfLocalisation} route={route} navigation={navigation}/>
                )}
            </>
        )}
      </Layout>
    );
};

export default ListOfLocalisation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});