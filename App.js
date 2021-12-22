import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import Modal from "react-native-modal";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode: "",
      showScanner: false,
    }
  }


  barcodeReceived = (event) => {
    console.log('Type: ' + event.type + '\nData: ' + event.data)
    this.setState({
      qrcode: event.data,
      showScanner: false,
    })
  };
  render() {
    return (
      <View style={styles.main}>

        <Modal
          style={{ margin: 0 }}
          animationIn="fadeIn"
          deviceHeight={windowHeight}
          deviceWidth={windowWidth}
          isVisible={this.state.showScanner}
          onBackButtonPress={() => {
            this.setState({
              showScanner: false
            })
          }}
        >
          <View style={{ flex: 1, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
            < QRScannerView
              maskColor="transparent"
              onScanResult={this.barcodeReceived}
              renderHeaderView={this.renderTitleBar}
              renderFooterView={this.renderMenu}
              scanBarAnimateReverse={true}
              hintText=""
            />
          </View>
        </Modal>

        <Button
          title="Scan QR"
          onPress={()=>{this.setState({
            showScanner: true
          })}}

        />
        <Text style={{color: 'black'}}>{this.state.qrcode}</Text>
      </View >
    )
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
})
