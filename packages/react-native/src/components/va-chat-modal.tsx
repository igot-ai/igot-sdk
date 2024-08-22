import { Mic, Smile } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';

import {
  Image,
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
import { useChatStore } from '../store';
import { useChatBot } from '../hooks';
import { Conversation } from '../types';
import { COLORS } from '../constants';
import { RenderMessageContent } from './message';

interface Props extends ModalProps {
  // TODO: Add props
}

export const VAChatModal = ({ onRequestClose, ...props }: Props) => {
  const [message, setMessage] = useState('');
  const [openEmojiModal, setOpenEmojiModal] = useState(false);
  const {
    vaContextInfo,
    conversations,
    setChatStore,
    resetChatStore,
    typingResponse,
  } = useChatStore();
  const { sendPrompt, createSession } = useChatBot();

  useEffect(() => {
    if (!props.visible) return;

    (async () => {
      try {
        const session = await createSession();
        setChatStore({ session });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.visible]);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <Modal
        onRequestClose={(event) => {
          onRequestClose && onRequestClose(event);
          resetChatStore();
        }}
        {...props}
      >
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
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingBottom: 20,
                }}
              >
                {vaContextInfo?.name}
              </Text>
              <VirtualizedList
                inverted={
                  // true
                  conversations.length !== 0 || typingResponse ? true : false
                }
                // ref={flatListRef}
                getItem={(data: Conversation[], index: number) => data[index]}
                getItemCount={(data: Conversation[]) => data.length}
                data={conversations.toReversed()}
                // data={[{ id: 1 }, { id: 2 }]}
                keyExtractor={(conversation: Conversation) =>
                  'id_' + conversation.id
                }
                ListFooterComponent={() => {
                  return (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <ScrollView style={{ flex: 1 }}></ScrollView>
                    </TouchableWithoutFeedback>
                  );
                }}
                ListHeaderComponent={() => {
                  return (
                    typingResponse && (
                      <View
                        style={{
                          marginTop: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <Image
                          source={{
                            uri: vaContextInfo?.snapshot.logo,
                            width: 40,
                            height: 40,
                          }}
                        />

                        <View
                          style={[
                            {
                              flex: 1,
                              padding: 15,
                              borderRadius: 15,
                              backgroundColor: COLORS.gray,
                              borderBottomStartRadius: 0,
                            },
                          ]}
                        >
                          <Text>{typingResponse}</Text>
                        </View>
                      </View>
                    )
                  );
                }}
                renderItem={({ item: conversation }) => {
                  const user = conversation.role === 'user';
                  return (
                    <View
                      style={[
                        {
                          marginTop: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        },
                        user && {
                          width: '75%',
                          marginLeft: 'auto',
                          flexDirection: 'row-reverse',
                        },
                      ]}
                    >
                      {!user && (
                        <Image
                          source={{
                            uri: vaContextInfo?.snapshot.logo,
                            width: 40,
                            height: 40,
                          }}
                        />
                      )}
                      <View
                        style={[
                          {
                            flex: 1,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 15,
                          },
                          user
                            ? {
                                backgroundColor: COLORS.blue,
                                borderEndEndRadius: 0,
                              }
                            : {
                                backgroundColor: COLORS.gray,
                                borderBottomStartRadius: 0,
                              },
                        ]}
                      >
                        <RenderMessageContent {...{ conversation, user }} />
                      </View>
                    </View>
                  );
                }}
                // ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              />
              <View
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: 5,
                  position: 'relative',
                  marginTop: 20,
                }}
              >
                <TextInput
                  placeholder="Write to start"
                  placeholderTextColor={'#6B7280'}
                  onSubmitEditing={async (e) => {
                    e.preventDefault();
                    await sendPrompt(message);
                    setMessage('');
                  }} // Handle submit when the "Go" button is pressed
                  multiline={false}
                  returnKeyType="send" // Display "Go" button on iOS keyboard
                  onChangeText={setMessage}
                  value={message}
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
                  <TouchableOpacity
                    style={{ marginHorizontal: 5 }}
                    onPress={() => alert('Coming soon!')}
                  >
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
