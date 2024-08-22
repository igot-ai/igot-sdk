import { View, Text, Image } from 'react-native';

import Markdown from 'react-native-markdown-display';
import { Chart } from '../chart';

import { Conversation, TASK_TYPE_ROLE } from '../../types';
import { extractJson } from '../../utils';
// import { Play, Pause } from 'lucide-react-native';
import { COLORS } from '../../constants'; // Assuming COLORS is imported from a constants file

interface Props {
  conversation: Conversation;
  user?: boolean; // Add this prop if user is relevant to the conversation
}

export const RenderMessageContent = ({ conversation, user }: Props) => {
  // const playbackState = usePlaybackState();
  // const [isPlaying, setIsPlaying] = useState(false);

  // const playSound = async () => {
  //   if (playbackState.state === State.Playing) {
  //     await TrackPlayer.pause();
  //     setIsPlaying(false);
  //   } else if (
  //     playbackState.state === State.Paused ||
  //     playbackState.state === State.Stopped
  //   ) {
  //     await TrackPlayer.reset();
  //     await TrackPlayer.add({
  //       id: 'audio',
  //       url: conversation.content,
  //       title: 'Audio Message',
  //     });
  //     await TrackPlayer.play();
  //     setIsPlaying(true);
  //   }
  // };

  const markdownStyle = {
    text: {
      color: user ? COLORS.white : COLORS.black,
      fontSize: 16,
    },
  };

  switch (conversation.role as TASK_TYPE_ROLE) {
    case TASK_TYPE_ROLE.TASK_CHART_QUERY_JSON:
      return <Chart content={extractJson(conversation.content)} />;
    case TASK_TYPE_ROLE.TASK_COMPOSE_IMAGE:
      return (
        <View
          style={{
            aspectRatio: 1,
            backgroundColor: '#f3f4f6',
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Image
            source={{ uri: conversation.content }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            onError={(error) =>
              console.log('Image loading error:', error.nativeEvent.error)
            }
          />
        </View>
      );
    case TASK_TYPE_ROLE.TASK_COMPOSE_AUDIO:
      return (
        <Text
          style={{
            color: user ? COLORS.white : COLORS.black,
            fontSize: 16,
            paddingVertical: 10,
          }}
        >
          Unfortunately, the audio content is not supported
        </Text>
        // <View
        //   style={{
        //     backgroundColor: '#f3f4f6',
        //     padding: 20,
        //     borderBottomRightRadius: 16,
        //     borderBottomLeftRadius: 16,
        //     borderTopRightRadius: 16,
        //     marginTop: 12,
        //     marginBottom: 8,
        //   }}
        // >
        //   <TouchableOpacity onPress={playSound}>
        //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //       {isPlaying ? (
        //         <Pause size={20} color="black" />
        //       ) : (
        //         <Play size={20} color="black" />
        //       )}
        //       <Text style={{ marginLeft: 5 }}>Play audio</Text>
        //     </View>
        //   </TouchableOpacity>
        // </View>
      );
    default:
      return <Markdown style={markdownStyle}>{conversation.content}</Markdown>;
  }
};
