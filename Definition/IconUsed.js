import React from 'react';
import { Icon, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const IconeSearch = (props) => {
  return (<Icon name='search-outline' {...props}/>);
};

export const IconeLocalisation = (props) => {
  return (<Icon name='pin-outline' {...props}/>);
};

export const IconeBaisse = (props) => {
  return (<Icon style={styles.icon} fill='#8F9BB3' name='arrow-downward-outline' {...props}/>);
};

export const IconeMonte = (props) => {
  return (<Icon style={styles.icon} fill='#8F9BB3' name='arrow-upward-outline' {...props}/>);
};

export const IconeFlash = (props) => {
  return (<Icon style={styles.icon} fill='#8F9BB3' name='flash-outline' {...props}/>);
};

export const IconeParapluie = (props) => {
  return (<Icon style={styles.icon} fill='#FFFFFF' name='umbrella-outline' {...props}/>);
};

export const IconWarning = (props) => {
  return (<Icon style={styles.icon} fill='#FF0000' name='alert-circle-outline' {...props}/>);
};


export const IconeError = (props) => {
  const theme = useTheme();
  return (<Icon style={styles.icon} fill={theme['color-danger-default']} name='alert-circle-outline' {...props}/>);
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});