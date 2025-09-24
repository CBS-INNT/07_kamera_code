import React, { useState, useRef } from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import GlobalStyle from '../style/GlobalStyle';
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
      <View style={GlobalStyle.container}>
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
    <View style={GlobalStyle.gallery}>
      <Text style={GlobalStyle.buttonGallery}>
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
    <SafeAreaView style={GlobalStyle.safeview}>
      <View style={GlobalStyle.container}>
        <CameraView ref={cameraRef} style={GlobalStyle.camera} facing={facing}>
          <View style={GlobalStyle.buttonContainer}>
            {/* Flip kamera */}
            <TouchableOpacity style={GlobalStyle.btn} onPress={toggleFacing}>
              <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Tag billede */}
            <TouchableOpacity style={GlobalStyle.snapbtn} onPress={snap}>
              <Text style={GlobalStyle.text}>{loading ? '...' : ''}</Text>
            </TouchableOpacity>

            {/* Toggle galleri */}
            <TouchableOpacity style={GlobalStyle.btn} onPress={toggleGallery}>
              <Ionicons name="images-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
        {gallery ? <CameraGallery /> : null}
      </View>
    </SafeAreaView>
  );
}
