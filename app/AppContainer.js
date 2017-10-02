import React, { Component }  from 'react'
import { Drawer , View } from 'native-base'
import { Navigator } from 'react-native-deprecated-custom-components'
import Expo from 'expo';
import SideMenu from './components/sideMenu'

import SettingsStore from './stores/settingsStore'
import AuthStore from './stores/authStore'
import TotoStore from './stores/totoStore'

import SplashScene from './scenes/splashScene'
import LoginScene from './scenes/loginScene'
import TotoScene from './scenes/totoScene'

import theme from './theme/base-theme'

const settings = new SettingsStore()
const authStore = new AuthStore()
const totoStore = new TotoStore()


export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      store: {
        settings: settings,
        auth: authStore,
        toto:totoStore
      },
      theme: theme
    }
  }
  toggleDrawer()  {
    this.state.toggled ? this._drawer._root.close() : this._drawer._root.open()
  }
  openDrawer ()  {
    this.setState({toggled: true})
  }
  closeDrawer()  {
    this.setState({toggled: false})
  }
  renderScene(route, navigator) {
    switch(route.title) {
        case 'Splash' : {
            return <SplashScene {...route.passProps} navigator={navigator}
            />
        }
      case 'Login': {
        return <LoginScene {...route.passProps} navigator={navigator} />
      }

      case 'Chat': {
        return <TotoScene {...route.passProps} navigator={navigator} />
      }
      default: {
        return null
      }
    }
  }
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight
  }
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="displace"
        content={<SideMenu toggleDrawer={this.toggleDrawer.bind(this)}  navigator={this._navigator} theme={this.state.theme} />}
        onClose={this.closeDrawer.bind(this)}
        onOpen={this.openDrawer.bind(this)}
        openDrawerOffset={0.2}
        >
          <Navigator
            ref={(ref) => this._navigator = ref}
            configureScene={this.configureScene.bind(this)}
            renderScene={this.renderScene.bind(this)}
            initialRoute= {{
                title: "Splash",
                passProps: {
                    stores: this.state.store,
                    toggleDrawer: this.toggleDrawer.bind(this),
                    theme:this.state.theme
                }
            }}
            />
        </Drawer>
    )
  }
}

Expo.registerRootComponent(AppContainer);
