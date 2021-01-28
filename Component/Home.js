import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const Home = () => {
    return (
        <Layout style={styles.container}>
          <Text category='h2'>HOME</Text>
          <Text status='danger'>Danger</Text>
        </Layout>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});