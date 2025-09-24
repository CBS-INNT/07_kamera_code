import React, { useState, useRef } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CameraTest({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [imagesArr, setImagesArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState(false);

  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function snap() {
    if (!cameraRef.current) return;
    try {
      setLoading(true);
      const result = await cameraRef.current.takePictureAsync();
      setImagesArr([...imagesArr, result]);
    } catch (err) {
      console.log('Snap error:', err);
    } finally {
      setLoading(false);
    }
  }

  function toggleFacing() {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  }

  function toggleGallery() {
    setGallery((prev) => !prev);
  }

  const CameraGallery = () => (
    <View style={styles.gallery}>
      <Text style={styles.buttonGallery}>
        Billeder taget: {imagesArr.length}
      </Text>
      <ScrollView horizontal>
        {imagesArr.length > 0 ? (
          imagesArr.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={{ paddingHorizontal: 10 }}
              onPress={() => navigation.navigate('image', { image: image.uri })}
            >
              <Image
                source={{ uri: image.uri }}
                style={{ width: 80, height: 80, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: 'white' }}>No images taken</Text>
        )}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            {/* Flip kamera */}
            <TouchableOpacity style={styles.btn} onPress={toggleFacing}>
              <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Tag billede */}
            <TouchableOpacity style={styles.snapbtn} onPress={snap}>
              <Text style={styles.text}>{loading ? '...' : ''}</Text>
            </TouchableOpacity>

            {/* Toggle galleri */}
            <TouchableOpacity style={styles.btn} onPress={toggleGallery}>
              <Ionicons name="images-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
        {gallery ? <CameraGallery /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: {
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
  buttonGallery: {
    fontSize: 15,
    color: 'white',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  gallery: {
    flex: 0.25,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  snapbtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 40,
    padding: 12,
    alignSelf: 'center',
  },
});
