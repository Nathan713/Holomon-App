/* eslint-disable no-bitwise */
import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import {atob, btoa} from 'react-native-quick-base64';

// const HEART_RATE_UUID = '0000180d-0000-1000-8000-00805f9b34fb';
// const HEART_RATE_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';

const UART_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const UART_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

const bleManager = new BleManager();



function useBLE() {
  const [allDevices, setAllDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [heartRate, setHeartRate] = useState(0);

  const requestPermissions = async (cb) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const isDuplicteDevice = (devices, nextDevice) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes('rpi-gatt-server')) {
        setAllDevices((prevState) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      console.log(device.services())
      bleManager.stopDeviceScan();
      
      //startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = () => {
    console.log("disconnect")
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      //setHeartRate(0);
    }
  };

//   const onHeartRateUpdate = (
//     error,
//     characteristic,
//   ) => {
//     if (error) {
//       console.log(error);
//       return -1;
//     } else if (!characteristic?.value) {
//       console.log('No Data was recieved');
//       return -1;
//     }

//     const rawData = atob(characteristic.value);
//     let innerHeartRate = -1;

//     const firstBitValue = Number(rawData) & 0x01;

//     if (firstBitValue === 0) {
//       innerHeartRate = rawData[1].charCodeAt(0);
//     } else {
//       innerHeartRate =
//         Number(rawData[1].charCodeAt(0) << 8) +
//         Number(rawData[2].charCodeAt(2));
//     }

//     setHeartRate(innerHeartRate);
//   };

//   const startStreamingData = async (device) => {
//     if (device) {
//       device.monitorCharacteristicForService(
//         HEART_RATE_UUID,
//         HEART_RATE_CHARACTERISTIC,
//         (error, characteristic) => onHeartRateUpdate(error, characteristic),
//       );
//     } else {
//       console.log('No Device Connected');
//     }
//   };
    const writeData = async (message) => {
        console.log(message)
        const sendData = btoa(message)
        
        if (connectedDevice) {
            connectedDevice.writeCharacteristicWithoutResponseForService(
            UART_UUID,
            UART_CHARACTERISTIC,
            sendData
        ).then((characteristic) => {
                
            console.log("write response");
            console.log(characteristic);
        
        })
    }
        else {
        console.log('No Device Connected');
        }
    };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    //heartRate,
    writeData
  };
}



export default useBLE;