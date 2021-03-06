import React, {useState} from 'react';
import { 
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
 } from 'react-native';
import { combineReducers } from 'redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Cores from '../Cores/Cores';
import PreviewDoMapa from './PreviewDoMapa';



const CapturaLocalizacao = (props) => {

    const [estaCapturando, setEstaCapturando] = useState(false);
    const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState();


    const capturarLocalizacao = async () =>{  
        const temPermissao = await verificarPermissoes();

        if (temPermissao){
            setEstaCapturando(true);

            try {
                const localizacao = await Location.getCurrentPositionAsync({timeout: 8000});
                // console.log(localizacao)
                setLocalizacaoSelecionada({
                    lat: localizacao.coords.latitude,
                    lng: localizacao.coords.longitude
                })
            } catch (err) {
                Alert.alert(
                    'Impossivel obter localizaçao',
                    'Tente novamente mais tarde ou escolha do mapa',
                    [{text: 'OK'}]
                )
            }
            setEstaCapturando(false);
           
        }
    }

    const verificarPermissoes = async () =>{
       const resultado = await Permissions.askAsync(Permissions.LOCATION)

       if (resultado.status !== 'granted'){
           Alert.alert(
               'Sem permissão',
               'É preciso liberar acesso ao mecanismo de localização',
               [{text: 'OK'}]
           )

           return false;
       }

       return true;
    }

  return (

        <View style={estilos.capturalocalizacao}>
            <PreviewDoMapa style={estilos.previewDoMapa} localizacao={localizacaoSelecionada}>
                {
                    estaCapturando ?
                    <ActivityIndicator
                        size= 'large'
                        color={Cores.primary} />

                        :

                        
                <Text>Nenhuma localização disponível</Text>
                }
            </PreviewDoMapa>
            <Button
                title="Obter localização"
                color={Cores.primary}
                onPress ={capturarLocalizacao}
            />

        </View>
  
  );
}

const estilos = StyleSheet.create({

    capturalocalizacao:{
        marginBottom: 15
    },

    previewDoMapa:{
        marginBottom: 15,
        width: '100%',
        height: 300,
        borderColor: 'red',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3

    }
});

export default CapturaLocalizacao;