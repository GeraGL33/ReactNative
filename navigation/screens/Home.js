import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Empieza a reportar tu Drop</Text>
        </View>

        <View style={styles.announcementsContainer}>
          <View style={styles.announcementCard}>
            <MaterialIcons name="report-gmailerrorred" size={55} color="#64FFDA" style={styles.announcementIcon} />

            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>Reporta el drop</Text>
              <Text style={styles.announcementDescription}>
                Escanea la serie y selecciona los defectos!
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Como hacerlo?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.announcementCard}>
            <MaterialIcons name="verified-user" size={50} color="#64FFDA" style={styles.announcementIcon} />

            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>Consulta el Drop que se genero</Text>
              <Text style={styles.announcementDescription}>
                Mantendarmos el drop controlado!
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Ver mas</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.announcementCard}>
            <MaterialCommunityIcons name="archive-search-outline" size={50} color="#64FFDA" style={styles.announcementIcon} />
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>Mis reportes</Text>
              <Text style={styles.announcementDescription}>
                Verifica tus reportes, compara la mejora que vamos logrando dia con dia!
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Participar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
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
  announcementsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementCard: {
    backgroundColor: '#1c1f24',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  announcementIcon: {
    marginRight: 20,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64FFDA',
    marginBottom: 5,
  },
  announcementDescription: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#64FFDA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#282c34',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
