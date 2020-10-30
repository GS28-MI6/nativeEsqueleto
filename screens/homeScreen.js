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
    geoSuccess = (position) => {
        console.log("im in geo success")
        this.setState({
            ready:true,
            where: {lat: position.coords.latitude,lng:position.coords.longitude }
        })
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
            <View style={styles.pairBtn}>
                <View style={styles.singleBtn}>
                    <TouchableOpacity
                    onPress={() => this.createTwoButtonAlert()}>
                        <Image 
                        style={styles.tinyLogo}
                        source={require('../assets/icons/police.png')}
                        />
                    </TouchableOpacity>
                    <Text>Policia</Text>
                </View>
                <View style={styles.singleBtn}>
                    <TouchableOpacity
                    onPress={() => this.changer()}>
                        <Image 
                        style={styles.tinyLogo}
                        source={require('../assets/icons/police.png')}
                        />
                    </TouchableOpacity>
                    <Text>Policia</Text>
                </View>
            </View>
            <View style={styles.pairBtn}>
                <View style={styles.singleBtn}>
                    <TouchableOpacity
                    onPress={() => this.changer()}>
                        <Image 
                        style={styles.tinyLogo}
                        source={require('../assets/icons/police.png')}
                        />
                    </TouchableOpacity>
                    <Text>Policia</Text>
                </View>
                <View style={styles.singleBtn}>
                    <TouchableOpacity
                    onPress={() => this.changer()}>
                        <Image 
                        style={styles.tinyLogo}
                        source={require('../assets/icons/police.png')}
                        />
                    </TouchableOpacity>
                    <Text>Policia</Text>
                </View>
            </View>
            <View style={styles.pairBtn}>
                <View style={styles.singleBtn}>
                    <TouchableOpacity
                    onPress={() => this.changer()}>
                        <Image 
                        style={styles.tinyLogo}
                        source={require('../assets/icons/police.png')}
                        />
                    </TouchableOpacity>
                    <Text>Policia</Text>
                </View>
                <View style={styles.singleBtn}>
                    <TouchableOpacity
                    onPress={() => this.changer()}>
                        <Image 
                        style={styles.tinyLogo}
                        source={require('../assets/icons/police.png')}
                        />
                    </TouchableOpacity>
                    <Text>Policia</Text>
                </View>
            </View>
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
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    pairBtn: {
        display: "flex",
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    singleBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        width: 100,
        height: 100
    }
})

export default connect(mapStateToProps, {startCount, addOneToCount})(homeScreen)
