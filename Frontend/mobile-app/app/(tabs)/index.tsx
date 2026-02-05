import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const response = await fetch("http://YOUR_IP:5000/api/scan-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: data,
          gate: "Main Gate"
        })
      });

      const result = await response.json();

      Alert.alert(
        "Entry Recorded",
        `Name: ${result.name}
Company: ${result.company}
Role: ${result.role}
Time: ${result.entryTime}`
      );
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    }

    setTimeout(() => setScanned(false), 3000);
  };

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return <Text>Camera permission denied</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Text style={styles.text}>Scan Employee QR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    fontSize: 18,
    backgroundColor: "black",
    color: "white",
    padding: 10
  }
});
