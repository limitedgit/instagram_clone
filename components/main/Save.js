import React, {useState} from 'react';
import {View, TextInput,  Button, Image} from "react-native";
import firebase from 'firebase';


require("firebase/firestore")
require("firebase/firebase-storage")
export default function Save(props, navigation) {
    console.log(props)
    const [caption, setCaption]  = useState("");
    const uploadImage = async() => {
        // getFilePathForPlatform = response => { 
        //     if (Platform.OS === "ios") {
        //         return props.route.params.image; } 
        //     else { 
        //         return props.route.params.image; 
        //     } 
        // };
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random.toString(36)}`
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
                    .storage()
                    .ref()
                    .child(childPath)
                    .put(blob)
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state changed", taskProgress, taskError, taskCompleted);

    }

    const savePostData = (downloadURL) => {
        console.log(firebase.firestore.FieldValue)
        firebase.firestore().collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            props.navigation.popToTop()
        })


    }
    return (
        <View style={{flex: 1}}>
            <Image source = {{uri: props.route.params.image}}/>
            <TextInput
            placeholder='wite a description'
            onChangeText = {(caption)=> {setCaption(caption)}}
            />
            <Button title = "Save" onPress={() => uploadImage()}/>
           

        </View>
    )
}
