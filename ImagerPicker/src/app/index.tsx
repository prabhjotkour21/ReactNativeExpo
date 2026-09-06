import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestRecordingPermissionsAsync } from "expo-audio";
import {
  useAudioRecorder,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
} from "expo-audio";

import { useState } from "react";

import * as Network from "expo-network";
import * as Device from "expo-device";
import * as Haptics from "expo-haptics";

export default function App() {
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // ---------------- AUDIO RECORDER ----------------

  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const startRecording = async () => {
    const permission = await requestRecordingPermissionsAsync();

    if (!permission.granted) {
      console.log("Mic Permission Denied");
      return;
    }

    await setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
    });

    await recorder.prepareToRecordAsync();
    recorder.record();

    console.log("Recording Started");
  };

  const stopRecording = async () => {
    await recorder.stop();

    console.log("Recording Stop");
    console.log("Audio Url :", recorder.uri);

    setAudioUri(recorder.uri);
  };

  const player = useAudioPlayer(audioUri);

  const playAudio = () => {
    player.play();
  };

  const pauseAudio = () => {
    player.pause();
  };

  const stopAudio = () => {
    player.pause();
    player.seekTo(0);
  };

  // ---------------- MIC PERMISSION ----------------

  const checkMicPermission = async () => {
    const permission = await requestRecordingPermissionsAsync();

    if (permission.granted) {
      console.log("Mic Permission Granted");
    } else {
      console.log("Mic Permission Denied");
    }
  };

  // ---------------- LOCATION ----------------

  const checkLocationPermission = async () => {
    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      console.log("Location Permission Denied");
      return;
    }

    console.log("Location Permission Granted");

    const location =
      await Location.getCurrentPositionAsync({});

    console.log(location);
  };

  // ---------------- CAMERA ----------------

  const cameraPermission = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      console.log("Camera Permission Denied");
      return;
    }

    console.log("Camera Permission Granted");

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    console.log(result);
  };

  // ---------------- GALLERY ----------------

  const galleryPermission = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      console.log("Gallery Permission Denied");
      return;
    }

    console.log("Gallery Permission Granted");

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    console.log(result);
  };

  // ---------------- HAPTICS ----------------

  const handleHaptic = async () => {
    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Heavy
    );

    console.log("Haptic Triggered");
  };

  // ---------------- NETWORK ----------------

  const checkNetwork = async () => {
    const network =
      await Network.getNetworkStateAsync();

    console.log(network);
  };

  // ---------------- DEVICE INFO ----------------

  console.log("Brand:", Device.brand);
  console.log("Model:", Device.modelName);
  console.log("OS:", Device.osName);
  console.log("OS Version:", Device.osVersion);

  // ---------------- UI ----------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>
            React Native Permissions
          </Text>

          <Text style={styles.subtitle}>
            Camera • Location • Audio • Network
          </Text>
        </View>

        {/* IMAGE SECTION */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📷 Image
          </Text>

          <Button
            title="Open Gallery"
            onPress={galleryPermission}
          />

          <View style={styles.gap} />

          <Button
            title="Open Camera"
            onPress={cameraPermission}
          />

          {image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            </View>
          )}
        </View>

        {/* LOCATION SECTION */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📍 Location
          </Text>

          <Button
            title="Give Location Permission"
            onPress={checkLocationPermission}
          />
        </View>

        {/* AUDIO SECTION */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🎙️ Audio Recording
          </Text>

          <Button
            title="Get Mic Permission"
            onPress={checkMicPermission}
          />

          <View style={styles.gap} />

          <Button
            title="Start Recording"
            onPress={startRecording}
          />

          <View style={styles.gap} />

          <Button
            title="Stop Recording"
            onPress={stopRecording}
          />

          {audioUri && (
            <Text style={styles.audioText}>
              Recording Ready 🎵
            </Text>
          )}

          <View style={styles.gap} />

          <Button
            title="Play Recording"
            onPress={playAudio}
          />

          <View style={styles.gap} />

          <Button
            title="Pause"
            onPress={pauseAudio}
          />

          <View style={styles.gap} />

          <Button
            title="Stop Audio"
            onPress={stopAudio}
          />
        </View>

        {/* HAPTICS */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📳 Haptics
          </Text>

          <Button
            title="Test Haptics"
            onPress={handleHaptic}
          />
        </View>

        {/* NETWORK */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🌐 Network
          </Text>

          <Button
            title="Check Network"
            onPress={checkNetwork}
          />
        </View>

        {/* DEVICE INFO */}

        <View style={styles.deviceCard}>
          <Text style={styles.cardTitle}>
            📱 Device Information
          </Text>

          <Text style={styles.deviceText}>
            Brand: {Device.brand}
          </Text>

          <Text style={styles.deviceText}>
            Model: {Device.modelName}
          </Text>

          <Text style={styles.deviceText}>
            OS: {Device.osName}
          </Text>

          <Text style={styles.deviceText}>
            Version: {Device.osVersion}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= CSS =================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,

    // Shadow Android
    elevation: 3,

    // Shadow iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  deviceCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#333",
    marginBottom: 14,
  },

  gap: {
    height: 10,
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 18,
  },

  image: {
    width: 220,
    height: 220,
    borderRadius: 12,
  },

  audioText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    fontWeight: "600",
    color: "green",
  },

  deviceText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },
});