import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function ImageScreen({ route }) {
  const { image } = route.params || {};

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.img} />
      ) : (
        <Text style={{ color: 'white' }}>Ingen billede valgt</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
