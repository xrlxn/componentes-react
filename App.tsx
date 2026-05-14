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
  ActivityIndicator,
  Animated,
  Dimensions,
  Linking,
  Modal,
  PixelRatio,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const Item = ({
  item,
  selectedId,
  onSelect,
}: ItemProps) => {

  const isSelected =
    item.id === selectedId;

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor:
            isSelected
              ? '#6e3b6e'
              : '#f9c2ff'
        }
      ]}
      onPress={() =>
        onSelect(item.id)
      }
    >

      <Text
        style={{
          color:
            isSelected
              ? '#fff'
              : '#000',
          fontSize: 18
        }}
      >
        {item.title}
      </Text>

    </TouchableOpacity>
  );
};


type HeaderProps = {

  nombre:string;
  setNombre:
  React.Dispatch<
  React.SetStateAction<string>>;

  edad:string;
  setEdad:
  React.Dispatch<
  React.SetStateAction<string>>;

  activo:boolean;

  setActivo:
  React.Dispatch<
  React.SetStateAction<boolean>>;

  mensaje:string;

  mostrarMensaje:()=>void;

  fadeAnim:Animated.Value;

  loading:boolean;

  simularCarga:()=>void;

  modalVisible:boolean;

  setModalVisible:
  React.Dispatch<
  React.SetStateAction<boolean>>;

  abrirEnlace:()=>void;

  screenWidth:number;
  screenHeight:number;

  pixelRatio:number;

  drawerRef:
  React.MutableRefObject<
  DrawerLayoutAndroid | null
  >;
};

const Header = ({
  nombre,
  setNombre,
  edad,
  setEdad,
  activo,
  setActivo,
  mensaje,
  mostrarMensaje,
  fadeAnim,
  loading,
  simularCarga,
  modalVisible,
  setModalVisible,
  abrirEnlace,
  screenWidth,
  screenHeight,
  pixelRatio,
  drawerRef

}:HeaderProps)=>(

<KeyboardAvoidingView
behavior={
Platform.OS==="ios"
?"padding"
:undefined
}
>

<Animated.View
style={{
opacity:fadeAnim
}}
>

<Button
title="☰ Abrir menú"
onPress={()=>
drawerRef.current
?.openDrawer()
}
/>

<Text style=
{styles.titulo}>
Componentes React Native
</Text>

<View style=
{styles.card}>

<TextInput
style={styles.input}
placeholder=
"Ingrese nombre"
value={nombre}
onChangeText=
{setNombre}
/>

<TextInput
style={styles.input}
placeholder=
"Ingrese edad"
keyboardType=
"numeric"
value={edad}
onChangeText=
{setEdad}
/>

<Button
title=
"Mostrar mensaje"
onPress=
{mostrarMensaje}
/>

<Text style=
{styles.mensaje}>
{mensaje}
</Text>

<View style=
{styles.switchContainer}>

<Text>
Estado:
</Text>

<Switch
value={activo}
onValueChange=
{setActivo}
/>

</View>

<Text>

{activo
?
"Activado"
:
"Desactivado"}

</Text>

</View>


<View style=
{styles.card}>

<Text style=
{styles.subtitulo}>
Nuevos Componentes
</Text>

<Button
title=
"Simular carga"
onPress=
{simularCarga}
/>

{loading&&(

<ActivityIndicator
size="large"
color="#6e3b6e"
/>

)}

<Button
title=
"Abrir Modal"
onPress={()=>
setModalVisible(
true
)}
/>

<Modal
visible={
modalVisible
}
transparent
animationType=
"slide"
onRequestClose=
{()=>setModalVisible(false)}
>

<View style=
{styles.modalOverlay}>

<View style=
{styles.modalContent}>

<Text>
Modal activo
</Text>

<Button
title=
"Cerrar"
onPress={()=>
setModalVisible(false)
}
/>

</View>

</View>

</Modal>

<Button
title=
"Abrir enlace"
onPress=
{abrirEnlace}
/>

<Text>

{Math.round(
screenWidth
)}
x
{Math.round(
screenHeight
)}

</Text>

<Text>

Pixel ratio:
{pixelRatio}

</Text>

</View>

<Text style=
{styles.subtitulo}>
Lista
</Text>

</Animated.View>

</KeyboardAvoidingView>

);



const Footer=()=>(
<View
style={{
alignItems:'center',
marginTop:20
}}
>

<Image
style=
{styles.imagen}

source={{
uri:
'https://i.pinimg.com/280x280_RS/48/98/1e/48981e32b43f3df2489a57f1006b3b4f.jpg'
}}
/>

</View>
);


const DATA=[
{id:'1',title:'First Item'},
{id:'2',title:'Second Item'},
{id:'3',title:'Third Item'},
];


export default function App(){

const[
selectedId,
setSelectedId
]=useState<string|null>(null);

const[
nombre,
setNombre
]=useState('');

const[
edad,
setEdad
]=useState('');

const[
activo,
setActivo
]=useState(false);

const[
mensaje,
setMensaje
]=useState('');

const drawerRef=
useRef<
DrawerLayoutAndroid
|null
>(null);

const[
loading,
setLoading
]=useState(false);

const[
modalVisible,
setModalVisible
]=useState(false);

const[
refreshing,
setRefreshing
]=useState(false);

const fadeAnim=
useRef(
new Animated.Value(0)
).current;

const{
width:screenWidth,
height:screenHeight
}
=
Dimensions.get(
'window'
);

const pixelRatio=
PixelRatio.get();


useEffect(()=>{

const backAction=()=>{

ToastAndroid.show(
"Presionaste atrás",
ToastAndroid.SHORT
);

return true;
};

const backHandler=
BackHandler
.addEventListener(
"hardwareBackPress",
backAction
);

Animated.timing(
fadeAnim,
{
toValue:1,
duration:800,
useNativeDriver:true
}
).start();

return()=>{
backHandler.remove()
}

},[]);


const mostrarMensaje=()=>{

const texto=
`Hola ${nombre},
tienes ${edad} años`;

setMensaje(texto);

Alert.alert(
"Información",
texto
);

};


const simularCarga=()=>{

setLoading(true);

setTimeout(()=>{

setLoading(false)

},2000);

};


const onRefresh=()=>{

setRefreshing(true);

setTimeout(()=>{

setRefreshing(false)

},1500)

};


const abrirEnlace=()=>{
Linking.openURL(
'https://reactnative.dev'
)
}


const drawer=(

<View
style={{
flex:1,
padding:20
}}
>

<Text>
Menú
</Text>

<Button
title=
"Mostrar Toast"

onPress={()=>
ToastAndroid.show(
"que hay de nuevo viejo?",
ToastAndroid.SHORT
)}
/>

</View>

);


return(

<DrawerLayoutAndroid
ref={drawerRef}
drawerWidth={250}
drawerPosition="left"
renderNavigationView={
()=>drawer
}
>

<SafeAreaView
style=
{styles.container}
>

<FlatList
data={DATA}

renderItem={
({item})=>(
<Item
item={item}
selectedId={selectedId}
onSelect={(id)=>
setSelectedId(id)
}
/>
)
}

keyExtractor={
item=>item.id
}

ListHeaderComponent={
<Header
nombre={nombre}
setNombre={setNombre}
edad={edad}
setEdad={setEdad}
activo={activo}
setActivo={setActivo}
mensaje={mensaje}
mostrarMensaje={mostrarMensaje}
fadeAnim={fadeAnim}
loading={loading}
simularCarga={simularCarga}
modalVisible={modalVisible}
setModalVisible={setModalVisible}
abrirEnlace={abrirEnlace}
screenWidth={screenWidth}
screenHeight={screenHeight}
pixelRatio={pixelRatio}
drawerRef={drawerRef}
/>
}

ListFooterComponent={
<Footer/>
}

refreshControl={
<RefreshControl
refreshing={
refreshing
}
onRefresh={
onRefresh
}
/>
}
/>

</SafeAreaView>

</DrawerLayoutAndroid>

)

}

const styles=StyleSheet.create({
container:{
flex:1,
marginTop:
StatusBar.currentHeight||0,
paddingHorizontal:15
},

titulo:{
fontSize:20,
fontWeight:'bold',
textAlign:'center'
},

subtitulo:{
fontSize:18,
marginVertical:10
},

card:{
backgroundColor:'#f2f2f2',
padding:15,
borderRadius:10,
marginVertical:10
},

input:{
borderWidth:1,
borderColor:'#999',
padding:10,
borderRadius:10,
marginTop:10
},

mensaje:{
marginTop:10
},

switchContainer:{
flexDirection:'row',
justifyContent:'space-between',
marginTop:15
},

item:{
padding:15,
marginVertical:8,
borderRadius:10
},

imagen:{
width:100,
height:100
},

modalOverlay:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'rgba(0,0,0,.5)'
},

modalContent:{
backgroundColor:'#fff',
padding:25,
borderRadius:12
}

});