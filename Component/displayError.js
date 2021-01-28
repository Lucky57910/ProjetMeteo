import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';

import { IconeError } from '../Definition/IconUsed';

const DisplayError = ({ message = "Une erreur c'est produite" }) => (
    <Layout style={styles.container}>
      <IconeError status='warning' />
      <Text style={styles.errorText}>
        {message}
      </Text>
    </Layout>
);

export default DisplayError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});