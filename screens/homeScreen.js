import React, { Component , useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { Policia } from '../assets/icons/Policia';
import { connect } from 'react-redux';
import { startCount, addOneToCount } from '../actions/postActions';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from "jwt-decode";

class homeScreen extends Component {
    
    constructor(props){
        super(props)
        this.props.startCount()
        this.changer = this.changer.bind(this)
        this.state = {
            ready: false,
            where: {lat:null, lng:null},
            error: null
        }
    }

    createTwoButtonAlert = () => {

        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 2000,
        };
        Geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);
    }

    componentDidMount(){
        this.setState({ready:false, error: null });
    }
    geoSuccess = async (position) => {
        console.log("im in geo success")
        this.setState({
            ready:true,
            where: {lat: position.coords.latitude,lng:position.coords.longitude }
        })
        var token = await AsyncStorage.getItem('userToken');
        var decript = jwt_decode(token);
        console.log(decript)
        Alert.alert(
            "Coordenadas:",
            "Lat " + this.state.where.lat + " Long: " + this.state.where.lng,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
    }
    geoFailure = (err) => {
        console.log("there was an error", err)
        this.setState({error: err.message});
    }
    
    changer() {
        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 2000,
        };
        Geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);
        Alert.alert(this.state.where)
    }
render(){
    return (
        <View style={styles.container}>
                    <TouchableOpacity
                    style={styles.singleBtn}
                    onPress={() => this.createTwoButtonAlert()}>
                        <View style={styles.logoViewPrevencion}>
                            <Image 
                            style={styles.tinyLogo}
                            source={require('../assets/icons/police.png')}
                            />
                        </View>
                        <View style={styles.pairBtn}>
                            <View style={styles.viewTitle}><Text style={styles.textTitle}>Preveon</Text></View>
                            <View style={styles.viewAlert}><Text style={styles.textAlert}>Ojos en alerta</Text></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.singleBtn}
                    onPress={() => this.createTwoButtonAlert()}>
                        <View style={styles.logoView}>
                            <Image 
                            style={styles.tinyLogo}
                            source={require('../assets/icons/police.png')}
                            />
                        </View>
                        <View style={styles.pairBtn}>
                            <View style={styles.viewTitle}><Text style={styles.textTitle}>Prevencion</Text></View>
                            <View style={styles.viewAlert}><Text style={styles.textAlert}>Ojos en alerta</Text></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.singleBtn}
                    onPress={() => this.createTwoButtonAlert()}>
                        <View style={styles.logoView}>
                            <Image 
                            style={styles.tinyLogo}
                            source={require('../assets/icons/police.png')}
                            />
                        </View>
                        <View style={styles.pairBtn}>
                            <View style={styles.viewTitle}><Text style={styles.textTitle}>Prevencion</Text></View>
                            <View style={styles.viewAlert}><Text style={styles.textAlert}>Ojos en alerta</Text></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.singleBtn}
                    onPress={() => this.createTwoButtonAlert()}>
                        <View style={styles.logoView}>
                            <Image 
                            style={styles.tinyLogo}
                            source={require('../assets/icons/police.png')}
                            />
                        </View>
                        <View style={styles.pairBtn}>
                            <View style={styles.viewTitle}><Text style={styles.textTitle}>Prevencion</Text></View>
                            <View style={styles.viewAlert}><Text style={styles.textAlert}>Ojos en alerta</Text></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.singleBtn}
                    onPress={() => this.createTwoButtonAlert()}>
                        <View style={styles.logoView}>
                            <Image 
                            style={styles.tinyLogo}
                            source={require('../assets/icons/police.png')}
                            />
                        </View>
                        <View style={styles.pairBtn}>
                            <View style={styles.viewTitle}><Text style={styles.textTitle}>Prevencion</Text></View>
                            <View style={styles.viewAlert}><Text style={styles.textAlert}>Ojos en alerta</Text></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.singleBtn}
                    onPress={() => this.createTwoButtonAlert()}>
                        <View style={styles.logoView}>
                            <Image 
                            style={styles.tinyLogo}
                            source={require('../assets/icons/police.png')}
                            />
                        </View>
                        <View style={styles.pairBtn}>
                            <View style={styles.viewTitle}><Text style={styles.textTitle}>Prevencion</Text></View>
                            <View style={styles.viewAlert}><Text style={styles.textAlert}>Ojos en alerta</Text></View>
                        </View>
                    </TouchableOpacity>
            </View>
    )
}
}

const mapStateToProps = state => ({
    count: state.mainReducer.count
});


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    pairBtn: {
        display: "flex",
        width: "75%",
        paddingLeft: "5%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    singleBtn: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "steelblue",
        width: "100%",
        borderColor: "white",
        borderStyle: "solid",
        borderTopWidth: 2,
    },
    btn: {
        backgroundColor: '#b0c4de',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },
    tinyLogo: {
        width: "100%",
        height: "100%",
    },
    logoViewPrevencion:{
        marginLeft: 5,
        height: "75%",
        width: "20%",
        borderColor: "rebeccapurple",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 2000,
        overflow: "hidden",
        backgroundColor: "springgreen"
    },
    logoView:{
        marginLeft: 5,
        height: "75%",
        width: "20%",
        borderColor: "rebeccapurple",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 2000,
        overflow: "hidden",
        backgroundColor: "tomato"
    },
    textTitle:{
        color: "white",
        fontSize: 15,
    },
    textAlert:{
        color: "white",
        fontSize: 30,
    },
    viewTitle: {
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        height:30,
        fontSize: 20,
    },
    viewAlert: {
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        height:70,
    }
})

export default connect(mapStateToProps, {startCount, addOneToCount})(homeScreen)
