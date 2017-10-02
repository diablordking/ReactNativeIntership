import React, { Component } from 'react';

import { observer } from 'mobx-react/native'
import { createAutoSubscriber } from 'firebase-nest';
import firebase from 'firebase'
import {
  Container,
  Content,
  View,
  Button,
  Header,
  H3,
  List,
  ListItem
} from 'native-base'

import { autoSubscriber } from 'firebase-nest'

import { Text ,StyleSheet ,ListView ,TextInput} from 'react-native'



import TimeAgo from 'react-timeago'

import twitter_text from 'twitter-text';

const tweet_limit = 140;


 class TotoChat extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      tweet: '',
      username: firebase.auth().currentUser.displayName,
      fetching: false,
      remaining: tweet_limit
    };
    this.renderRow = this.renderRow.bind(this);
  }
     static getSubs(props, state) {
        return props.stores.toto.subs();
    }
    subscribeSubs(subs, props, state) {
        const store = props.stores.toto;
        const {unsubscribe, promise} = store.subscribeSubsWithPromise(subs); 
        this.setState({fetching: true, fetchError: null}, () => {
            promise.then(
                () => this.setState({fetching: false}),
                (error) => this.setState({fetching: false, fetchError: error})
            );
        });
        return unsubscribe;
    }

    renderRow(postKey)
    {
      const { toto } = this.props.stores;
      const postObj = postKey ? toto.getData('post_'+postKey[0]) : postKey;
      const ents = postObj ? postObj.entries() :postObj

      {console.log(toto)}
{console.log(postObj)}
{console.log(ents)}
{console.log(postKey)}
      if (postObj)
      {
        let text = postKey[1].text


        return (
           <ListItem>
           
            <Text> {text} </Text>

          </ListItem>
        )
      }
      else
      {
        return (
          <ListItem>

            <Text> Loading... </Text>
          </ListItem>
        )
      }
    }

        renderList() {
  
      const { toto } = this.props.stores;
      const historyList = toto.getData('totoguess');
      const list = historyList ? historyList.entries() : []

      return (
        <List
          dataArray={list}
          renderRow={this.renderRow.bind(this)}
          >
        </List>
      )
    }


    
  render()    { 
      return (
        <View>
          {this.renderList()}
        </View>
      )
    }


}

export default autoSubscriber(observer(TotoChat))
