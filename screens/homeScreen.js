import React, { Component , useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
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
        <View>
            <Text>{this.props.count.toString()}</Text>
            <TouchableOpacity
            style={styles.btn}
            onPress={() => this.changer()}>
                <Text style={styles.btnText}>
                    Sumar
                </Text>
            </TouchableOpacity>
        </View>
    )
}
}

const mapStateToProps = state => ({
    count: state.mainReducer.count
});


const styles = StyleSheet.create({
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
})

export default connect(mapStateToProps, {startCount, addOneToCount})(homeScreen)
