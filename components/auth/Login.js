import React, { Component } from 'react'
import { View, Button, TextInput, Text } from 'react-native'
import firebase from 'firebase';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp(){
        const {
            email, 
            password, 

        } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)

        })
        .catch((e) => {
            console.log(e)
        })
    }

    render() {
        return (
          
            <View style = {{
                flex: 1,
                justifyContent: 'center',
            }}>

                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button
                    onPress={()=> this.onSignUp()}
                    title="Login"
                />
            </View>
        )
    }
}

export default Login
