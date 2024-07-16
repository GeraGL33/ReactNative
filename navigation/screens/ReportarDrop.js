import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const ReportarDrop = () => {
    const [selectedLine, setSelectedLine] = useState(null);
    const [serialNumber, setSerialNumber] = useState('');
    const [showLinePicker, setShowLinePicker] = useState(false);
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const pickerRef = useRef(null);
    const [scannedBarcodes, setScannedBarcodes] = useState([]);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isChecked, setIsChecked] = useState(Array(18).fill(false));

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleLineSelection = (line) => {
        setSelectedLine(line);
        setShowLinePicker(false);
    };
    const consultar = () => {
        consele.log('Estas seguro de enviar?');
    }
    const handleScanSerialNumber = ({ type, data }) => {
        setSerialNumber(data);
        setScannedBarcodes([...scannedBarcodes, { type, data }]);
        setShowCameraModal(false);
    };

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const handleCheckboxChange = (index) => {
        const newCheckedState = [...isChecked];
        newCheckedState[index] = !newCheckedState[index];
        setIsChecked(newCheckedState);
    };

    const descriptions = [
        'TCON', 'FRONTAL', 'ACCESORIO', 'CONTROL REMOTO', 'CABLE FFC',
        'CABLE LV', 'BOTTOM C.', 'SIDE C.', 'STAND BASE', 'CAJA',
        'MAIN BOARD', 'TERMINAL', 'ETIQUETAS INPUT', 'ANTENA WiFi',
        'ENERGY LABEL', 'SN ETIQUETA', 'PALCA WiFi', 'OPEN CELL',
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reportar Drop</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.formSection}>




                        <Text style={styles.label}>Número de Línea</Text>
                        <TouchableOpacity style={styles.inputContainer} onPress={() => setShowLinePicker(true)}>
                            <Text style={styles.inputText}>{selectedLine || 'Selecciona la línea'}</Text>
                            <Ionicons name="chevron-down" size={24} color="#eb3f59" />
                        </TouchableOpacity>


                        <Modal visible={showLinePicker} animationType="fade" transparent>
                            <View style={styles.pickerModalContainer}>
                                <View style={styles.pickerContainer}>


                                    <Picker
                                        ref={pickerRef}
                                        selectedValue={selectedLine}
                                        onValueChange={handleLineSelection}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                    >
                                        {Array.from({ length: 15 }, (_, index) => (
                                            <Picker.Item key={index} label={`Línea ${index + 1}`} value={`Línea ${index + 1}`} />
                                        ))}
                                    </Picker>
                                    <TouchableOpacity style={styles.pickerCloseButton} onPress={() => setShowLinePicker(false)}>
                                        <Text style={styles.pickerCloseButtonText}>Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>



                    <View style={styles.formSection}>
                        <Text style={styles.label}>Número de Serie</Text>


                        <TouchableOpacity style={styles.inputContainer} onPress={() => setShowCameraModal(true)}>
                            <Text style={styles.inputText}>{serialNumber || 'Escanear número de serie'}</Text>
                            <Ionicons name="barcode-outline" size={24} color="#eb3f59" />
                        </TouchableOpacity>


                        <Modal visible={showCameraModal} animationType="slide">
                            <SafeAreaView style={styles.modalContainer}>
                                {hasPermission === null ? (
                                    <Text>Solicitando permiso para usar la cámara...</Text>
                                ) : hasPermission === false ? (
                                    <Text>No se ha concedido permiso para usar la cámara.</Text>
                                ) : (
                                    <BarCodeScanner
                                        onBarCodeScanned={handleScanSerialNumber}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                )}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setShowCameraModal(false)}
                                >
                                    <Text style={styles.closeButtonText}>Cerrar cámara</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </Modal>

                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>Selecciona la fecha</Text>
                        <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
                            <Text style={styles.inputText}>
                                {selectedDate ? selectedDate.toLocaleDateString() : 'Selecciona la Fecha'}
                            </Text>
                            <Ionicons name="calendar-outline" size={24} color="#f26f83" />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Buscar Partes</Text>


                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>Seleccione los componentes faltantes</Text>
                    <ScrollView style={styles.checkboxScrollView}>
                        {descriptions.map((description, index) => (
                            <View key={index} style={styles.checkboxContainer}>
                                <Checkbox
                                    value={isChecked[index]}
                                    onValueChange={() => handleCheckboxChange(index)}
                                    color={isChecked[index] ? '#4630EB' : undefined}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.description}>{description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Enviar reporte</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        marginTop:10


    },
    scrollView: {
        padding: 20,
    },
    header: {
        width: '100%',
        backgroundColor: '#282c34',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#64FFDA',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    formContainer: {
        marginBottom: 20,

    },
    formSection: {
        marginBottom: 20,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#282c34',

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#64FFDA',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputText: {
        fontSize: 16,
        color: '#8892B0',
    },
    pickerModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,

        width: '70%',
    },
    picker: {
        height: 200,
    },
    pickerItem: {
        fontSize: 25,
    },
    pickerCloseButton: {
        backgroundColor: '#64FFDA',
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    pickerCloseButtonText: {
        color: '#282c34',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 350,
        marginTop: 350

    },
    closeButton: {
        backgroundColor: '#64FFDA',
        padding: 10,
        borderRadius: 5,
        marginTop: 150,
        marginLeft: 255
    },
    closeButtonText: {
        color: '#282c34',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#64FFDA',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    submitButtonText: {
        color: '#282c34',
        fontWeight: 'bold',
        fontSize: 16,

    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#282c34',
    },
    checkboxScrollView: {
        maxHeight: 400,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    description: {
        fontSize: 16,
        color: '#282c34',
    },
});

export default ReportarDrop;
