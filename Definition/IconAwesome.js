import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

export const IconFav = () => {
    return (<Icon name='heart' size={26} color="#ff0000"/>);
};

export const IconNotFav = () => {
    return (<Icon name='heart-o' size={26} color="#8F9BB3"/>);
};

export const IconFroid = () => {
    return (<Icon name='thermometer-0' size={22} color="#FFFFFF"/>);
};

export const IconChaud = () => {
    return (<Icon name='thermometer-4' size={22} color="#FFFFFF"/>);
};