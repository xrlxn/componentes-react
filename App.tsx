import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Image,
  StyleSheet,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  PermissionsAndroid,
  DrawerLayoutAndroid,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// =========================
// 📌 TIPOS
// =========================
type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
};

// =========================
// 🚀 APP
// =========================
export default function App() {

  // =========================
  // 📌 DATA
  // =========================
  const DATA: ItemData[] = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
  ];

  // =========================
  // 📌 ESTADOS
  // =========================
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [activo, setActivo] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  // =========================
  // 📌 EFECTOS (ANDROID)
  // =========================
  useEffect(() => {
    const backAction = () => {
      ToastAndroid.show("Presionaste atrás", ToastAndroid.SHORT);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const pedirPermiso = async () => {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
      } catch (e) {
        console.log(e);
      }
    };

    pedirPermiso();

    return () => backHandler.remove();
  }, []);

  // =========================
  // 📌 FUNCIONES
  // =========================
  const mostrarMensaje = () => {
    const texto = `Hola ${nombre}, tienes ${edad} años`;
    setMensaje(texto);
    Alert.alert("Información", texto);
  };

  // =========================
  // 📌 ITEM LISTA
  // =========================
  const Item = ({ item }: ItemProps) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: isSelected ? '#6e3b6e' : '#f9c2ff' }
        ]}
        onPress={() => setSelectedId(item.id)}
      >
        <Text style={{ color: isSelected ? '#fff' : '#000', fontSize: 18 }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  // =========================
  // 📌 HEADER (FORMULARIO)
  // =========================
const Header = () => (
  <View>
    
    <Button
      title="☰ Abrir menú"
      onPress={() => drawerRef.current?.openDrawer()}
    />

    <Text style={styles.titulo}>
      Componentes React Native
    </Text>

    <View style={styles.card}></View>

      <View style={styles.card}>
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

        <Button title="Mostrar mensaje" onPress={mostrarMensaje} />

        <Text style={styles.mensaje}>{mensaje}</Text>

        <View style={styles.switchContainer}>
          <Text>Estado:</Text>
          <Switch value={activo} onValueChange={setActivo} />
        </View>

        <Text>{activo ? "Activado" : "Desactivado"}</Text>
      </View>

      <Text style={styles.subtitulo}>Lista</Text>
    </View>
  );

  // =========================
  // 📌 FOOTER
  // =========================
  const Footer = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Image
        style={styles.imagen}
        source={{
          uri: 'https://i.pinimg.com/280x280_RS/48/98/1e/48981e32b43f3df2489a57f1006b3b4f.jpg'
        }}
      />
    </View>
  );

  // =========================
  // 📌 DRAWER
  // =========================
  const drawer = (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Menú</Text>

      <Button
        title="Mostrar Toast"
        onPress={() =>
          ToastAndroid.show("que hay de nuevo viejo?", ToastAndroid.SHORT)
        }
      />
    </View>
  );

  // =========================
  // 📌 RENDER
  // =========================
  return (
 <DrawerLayoutAndroid
  ref={drawerRef}
  drawerWidth={250}
  drawerPosition="left"
  renderNavigationView={() => drawer}
>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Header />}
          ListFooterComponent={<Footer />}
          contentContainerStyle={{ paddingBottom: 20 }}
          extraData={selectedId}
        />
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
}

// =========================
// 🎨 ESTILOS
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 15,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },

  subtitulo: {
    fontSize: 18,
    marginVertical: 10
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },

  mensaje: {
    marginTop: 10,
    fontWeight: 'bold'
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },

  item: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8
  },

  imagen: {
    width: 100,
    height: 100,
    marginTop: 20
  }
});