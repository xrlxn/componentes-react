import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Image,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

export default function App() {

  // Estados
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Función del botón
  const mostrarMensaje = () => {
    const texto = `Hola ${nombre}, tienes ${edad} años`;
    setMensaje(texto);
    Alert.alert("Información", texto);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* TÍTULO */}
      <Text style={styles.titulo}>
        Componentes de react - 17/04/2026
      </Text>

      {/* CONTENEDOR PRINCIPAL */}
      <View style={styles.container}>

        {/* SECCIÓN DE TEXTO */}
        <Text style={styles.texto}>
          Nombre: Marlon Aristizabal
        </Text>
        <Text style={styles.texto}>
          Taller: Componentes React Native
        </Text>
        <Text style={styles.texto}>
          Fecha: 17/04/2026
        </Text>

        {/* INPUTS */}
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingrese su edad"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        {/* BOTÓN */}
        <View style={styles.boton}>
          <Button title="Mostrar mensaje" onPress={mostrarMensaje} />
        </View>

        {/* MENSAJE EN PANTALLA */}
        <Text style={styles.mensaje}>
          {mensaje}
        </Text>

        {/* SWITCH */}
        <View style={styles.switchContainer}>
          <Text style={styles.texto}>
            Estado:
          </Text>
          <Switch
            value={activo}
            onValueChange={setActivo}
          />
        </View>

        <Text style={styles.texto}>
          {activo ? "Activado" : "Desactivado"}
        </Text>

        <Text style={styles.texto}>
  Hola (para probar el scroll)
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
              <Text style={styles.texto}>
  Hola
        </Text>
        {/* IMAGEN */}
        <Image
          style={styles.imagen}
          source={{
            uri: 'https://i.pinimg.com/280x280_RS/48/98/1e/48981e32b43f3df2489a57f1006b3b4f.jpg'
          }}
        />

      </View>
    </ScrollView>
  );
}

// ESTILOS
const styles = StyleSheet.create({

  scrollContainer: {
    alignItems: 'center',
    padding: 20
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },

  container: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center'
  },

  texto: {
    fontSize: 16,
    marginBottom: 5
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },

  boton: {
    marginTop: 15,
    width: '100%'
  },

  mensaje: {
    marginTop: 10,
    fontWeight: 'bold'
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },

  imagen: {
    width: 100,
    height: 100,
    marginTop: 20
  }

});