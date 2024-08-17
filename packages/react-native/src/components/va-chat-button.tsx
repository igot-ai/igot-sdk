import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { Bot } from 'lucide-react-native';
import { useChatStore } from '../store';
import { VAChatModal } from './va-chat-modal';
import { vaService } from '../services';

interface VAChatButtonProps {
  size?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  iconColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  borderRadius?: number;
  padding?: number;
}

export const VAChatButton: React.FC<VAChatButtonProps> = ({
  size = 24,
  backgroundColor = '#007AFF',
  borderColor = '#005BB5',
  borderWidth = 2,
  iconColor = '#FFFFFF',
  onPress = () => null,
  borderRadius = 50,
  padding = 10,
}) => {
  const { setChatStore, openChatModal } = useChatStore();

  useEffect(() => {
    (async () => {
      try {
        const vaContextInfo = await vaService.getContextInfo();
        setChatStore({ vaContextInfo });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setChatStore]);

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={(event) => {
          onPress(event);
          setChatStore({ openChatModal: true });
        }}
        style={[
          styles.button,
          {
            backgroundColor,
            borderColor,
            borderWidth,
            borderRadius,
            padding,
            width: size * 2,
            height: size * 2,
          },
        ]}
      >
        <Bot size={size} color={iconColor} />
      </TouchableOpacity>
      <VAChatModal
        animationType="slide"
        transparent={false}
        visible={openChatModal}
        presentationStyle="pageSheet"
        onRequestClose={() => setChatStore({ openChatModal: false })}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
