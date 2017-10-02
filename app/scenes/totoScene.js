import React, { Component } from 'react';
import TotoChat from '../components/totochat';
import {
  Container,
  Content,
  View,
  Button,
  Header,
  Icon
} from 'native-base'
import { Text } from 'react-native'



 export default class TotoScene extends Component {
  constructor(props) {
    super(props)
  }
  render() {
      const  { stores ,theme } = this.props
    return (
      <Container theme={this.props.theme}>
        <Header>
          <Button transparent
            onPress={this.props.toggleDrawer}>
            <Icon name='menu'/>
          </Button>
          <Text>
            ChatBox
          </Text>
          <Button transparent
            >
            <Icon name='camera' color='white' size={28}/>
          </Button>
        </Header>
        <View>
          <TotoChat stores={this.props.stores} />
        </View>
      </Container>
    );
  }

}
