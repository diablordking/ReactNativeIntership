import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  View
} from 'native-base'
import { Image } from 'react-native'

export default class SideMenu extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let list = [{
      title: "Chat",
      onPress: () => {
        this.props.navigator.replace({
          title: 'Chat',
          passProps: this.props
        })
        this.props.toggleDrawer();
      }
    }, {
      title: "History",
      onPress: () => {
        this.props.navigator.replace({
          title: 'History',
          passProps: this.props
        })  
        this.props.toggleDrawer();
  
      }
    }]
    return (
      <Container theme={this.props.theme}>
                  <Image
            source={{
              uri: 'https://github.com/GeekyAnts/NativeBase-KitchenSink/blob/master/img/drawer-cover.png?raw=true',
            }}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: 'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/img/logo.png',
              }}
            />
          </Image>
        <Content>
        <View>
          <List dataArray={list} renderRow={(item) => 
            <ListItem button onPress={item.onPress.bind(this)}>
              <Text style={{color: 'black'}}> {item.title} </Text>
            </ListItem>
          }/>
        </View>
        </Content>
      </Container>
    )
  }
}