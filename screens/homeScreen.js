import React, { Component , useState} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { Policia } from '../assets/icons/Policia'
import { connect } from 'react-redux';
import { startCount, addOneToCount } from '../actions/postActions';

class homeScreen extends Component {
    
    constructor(props){
        super(props)
        this.props.startCount()
        this.changer = this.changer.bind(this)
    }

    changer() {
        this.props.addOneToCount(this.props.count)
    }
render(){
    return (
        <View style={styles.container}>
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
