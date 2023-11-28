import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import tw from "twrnc";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data) {
      // Check if the scanned data is a valid URL
      if (Linking.canOpenURL(data)) {
        Alert.alert(
          "Open Link",
          "Do you want to open this link in your browser?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => Linking.openURL(data) },
          ]
        );
      } else {
        alert("Scanned content is not a valid URL");
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          style={tw`p-4 bg-green-800`}
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
