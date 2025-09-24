import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import GlobalStyle from '../style/GlobalStyle';

export default function ImageScreen({ route }) {
  const { image } = route.params || {};

  return (
    <View style={GlobalStyle.container}>
      {image ? (
        <Image source={{ uri: image }} style={GlobalStyle.img} />
      ) : (
        <Text style={{ color: 'white' }}>Ingen billede valgt</Text>
      )}
    </View>
  );
}

