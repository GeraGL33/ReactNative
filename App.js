import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const HomeScreen = ({ navigation }) => {
  const [barcodeValue1, setBarcodeValue1] = useState('');
  const [barcodeValue2, setBarcodeValue2] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner App</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => navigation.navigate('ScannerScreen', { setBarcodeValue: setBarcodeValue1 })}
      >
        <TextInput
          style={styles.input}
          value={barcodeValue1}
          onChangeText={setBarcodeValue1}
          placeholder="Barcode 1"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => navigation.navigate('ScannerScreen', { setBarcodeValue: setBarcodeValue2 })}
      >
        <TextInput
          style={styles.input}
          value={barcodeValue2}
          onChangeText={setBarcodeValue2}
          placeholder="Barcode 2"
        />
      </TouchableOpacity>
    </View>
  );
};

const ScannerScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { setBarcodeValue } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarcodeValue(data);
    navigation.goBack();
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
        <View style={styles.resultContainer}>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default App;
