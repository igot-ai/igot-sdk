import { Mic, Smile } from 'lucide-react-native';
import React, { useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
} from 'react-native';

import EmojiPicker from 'rn-emoji-keyboard';

interface Props extends ModalProps {
  // TODO: Add props
}

export const VAChatModal = (props: Props) => {
  const [openEmojiModal, setOpenEmojiModal] = useState(false);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <Modal {...props}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 25,
                paddingTop: 25,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: 'bold',
                }}
              >
                iGOT.ai Virtual Assistant
              </Text>
              <VirtualizedList
                inverted={
                  false
                  // conversations.length !== 0 || typingResponse ? true : false
                }
                // ref={flatListRef}
                getItemCount={() => 0}
                data={[{}]}
                keyExtractor={(conversation) => 'id_'}
                ListFooterComponent={() => {
                  return (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <ScrollView style={{ flex: 1 }}></ScrollView>
                    </TouchableWithoutFeedback>
                  );
                }}
                // ListHeaderComponent={() => {
                //   return (

                //   );
                // }}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <Text>Hello</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: 5,
                  position: 'relative',
                }}
              >
                <TextInput
                  placeholder="Write to start"
                  placeholderTextColor={'#6B7280'}
                  // onSubmitEditing={handleSendMessage} // Handle submit when the "Go" button is pressed
                  multiline={false}
                  returnKeyType="send" // Display "Go" button on iOS keyboard
                  // onChangeText={onChange}
                  // {...{ value, onBlur }}
                  style={{
                    minHeight: 55,
                    paddingHorizontal: 15,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: 10, // Adjust the right position for better alignment
                    transform: [{ translateY: -12 }], // Adjust vertical alignment
                    flexDirection: 'row', // Arrange icons horizontally
                    alignItems: 'center', // Align icons vertically
                  }}
                >
                  <TouchableOpacity
                    style={{ marginHorizontal: 5 }}
                    onPress={() => setOpenEmojiModal(true)}
                  >
                    <Smile size={24} color="#6B7280" />
                    <EmojiPicker
                      onEmojiSelected={(emoji) => console.log(emoji)}
                      open={openEmojiModal}
                      enableSearchBar
                      categoryPosition="top"
                      onClose={() => setOpenEmojiModal(false)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: 5 }}>
                    <Mic size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </React.Fragment>
  );
};
