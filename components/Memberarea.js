import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';

export default class Memeberarea extends Component {
    
    //Set initial state
    state = {
        username: [],
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    //Load initial state
    _loadInitialState = async () => {

        //Get username from AsyncStorage 
        let value = await AsyncStorage.getItem('username');
        if (value !==null) {
            this.setState({username: value});
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>- Welcome {this.state.username}></Text>
            </View>
        );
    }
}

const styles = Stylesheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});