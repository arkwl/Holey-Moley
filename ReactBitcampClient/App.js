/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  WebSocket = require('ws');
  wss = new WebSocket.Server("ws://10.30.9.175:1337")
  ws.on('message', function incoming(message){
    console.log(message);
  })
/*  constructor() {
        super();

        this.state = {
            open: false
        };
        //ws = new WebSocket('wss://echo.websocket.org/');
        ws = new WebSocket('wss://10.30.9.175:1337');
        this.emit = this.emit.bind(this);
    }


    emit() {
          this.setState(prevState => ({
              open: !prevState.open
          }))
          //this.socket.send("It worked!")
          this.socket.send("It worked!")
          this.socket.on('message', function incoming(message){
            console.log(message);
          })
      }



  componentDidMount() {
        /*
        this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}));
        this.socket.onmessage = ({data}) => console.log(data);
        */
    }
*/
    tasks = [
      {
        "x": "40.714224",
        "y": "-73.961452",
        "address" : "",
        "description": "blah blah"
      },
      {
        "x": "40.714224",
        "y": "-73.961452",
        "address" : "",
        "description": "blah blah blah"
      },
      {
        "x": "40.714224",
        "y": "-73.961452",
        "address" : "",
        "description": "blah blah blah blah"
      }
    ]

    onPress = () => {
    }

    getAddress = (a, b) => {
      console.log(a)
      console.log(b)
      url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + a + "," + b + "&key=AIzaSyDeBMwodkWHr82lBFMjIJEBFrnZnXTLSg8"
      fetch(url).then(function(response) {
        console.log("WITNESS ME")
        alert("result:"+JSON.stringify(response.json()))
        return(response.json())
      })

    }



    renderTasks(){
        return this.tasks.map((task) => {
            return (
              <View style={styles.rowContainer}>
                <View style={styles.left}>
                  <Text> "X" {task.x} </Text>
                  <Text> "Y" {task.y} </Text>
                  <Text> {this.getAddress(task.x, task.y)} </Text>
                </View>
                <View style={styles.right}>
                  <Button title="Done" onPress={this.onPress}> "Done" </Button>
                </View>
              </View>
            );
        });
    }



/*
"X: " <Text> {task.x} </Text>
"Y: " <Text> {task.y} </Text>
<Button onPress={this.onPress}
        title="Done">
    "Done"
</Button>
*/


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Your Tasks
        </Text>
        <View>
            {this.renderTasks()}
        </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    //textAlign: 'center',
    margin: 10,
  },
  left: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    flex: 3
  },
  right: {
    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
    flex: 0
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});
