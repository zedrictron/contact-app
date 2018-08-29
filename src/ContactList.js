// import React
import React from 'react';
// import the components we need from nativebase
import { Container, Body, Header, Content, List, ListItem, Text, Left, Right, Icon, Button, View } from 'native-base';
// import phonecall sa we can call some digitz
import { phonecall, text } from 'react-native-communications'
import { Alert } from 'react-native'

class ContactList extends React.Component {

  constructor () {
    super()

    this.state = {
      contacts: [
        {name: 'Moses', mobile: '11111111', email: 'moses@proudcloud.io', company: 'Proudcloud'},
        {name: 'Mejhoy', mobile: '22222222', email: 'mejhoy@proudcloud.io', company: 'Proudcloud'},
        {name: 'Lloyd', mobile: '3333333', email: 'lloyd@proudcloud.io', company: 'Proudcloud'},
        {name: 'Kat', mobile: '4444444', email: 'kat@proudcloud.io', company: 'Proudcloud'},
        {name: 'Jayah', mobile: '55555', email: 'jayah@proudcloud.io', company: 'Proudcloud'},
        {name: 'Cheska', mobile: '666666666', email: 'cheska@proudcloud.io', company: 'Proudcloud'},
        {name: 'Xyza', mobile: '77777777', email: 'xyza@proudcloud.io', company: 'Proudcloud'}
      ]
    }
  }

  openRecord (contact) {
    this.props.navigation.navigate('ContactView', { contact: contact } )
  }

  call (mobile) {
    phonecall(mobile,false)
  }

  message (mobile) {
    text(mobile, false)
  }

  delete (name) {
    Alert.alert(
      `Deleting ${name}`,
      `Do you wish to continue?`,
      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'NO',
          onPress: () => {
            console.log('Cancel Pressed')
          },
          style: 'cancel'
        },

        {
          text: 'YES',
          onPress: () => {
            this.setState({ contacts: this.state.contacts.filter(contact => contact.name != name) })
          }
        }
      ],
      { cancelable: false }
    )
  }

  // render here function is required
  render() {
    // Our Data Source

    return (
      <Container>
        <Header />
        <Content>
          <List>
            {
              // iterate through each contacts
              this.state.contacts.map((contact, i) => {
                return (
                  // will render ListItem for each iteration of contacts
                  // pressing a ListITem will call the dial() function
                  <ListItem key={i} onPress={ () => { this.openRecord(contact) } }>
                  <Body>
                      <Text> {contact.name} </Text>
                      <Text note> {contact.mobile} </Text>
                    </Body>
										<Right>

                      <View style={{ flexDirection: 'row'}}>


                       <Button transparent onPress={ () => {this.call(contact.mobile)} }>
                        <Icon
                         type="FontAwesome"
                         name="phone"
                         style={{ color: "#45bc4b" }}
                        />
                       </Button>

                        <Button transparent onPress={ () => {this.message(contact.mobile)} }>
                        <Icon
                        type="FontAwesome"
                        name="envelope"
                        style={{ color: "#4286f4" }}
                        />
                        </Button>

                        <Button transparent onPress={ () => {this.delete(contact.name) } }>
                        <Icon
                        type="FontAwesome"
                        name="trash"
                        style={{color: "#bc4545" }}
                        />
                        </Button>
                      </View>

										</Right>
                  </ListItem>
                )
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

export default ContactList
