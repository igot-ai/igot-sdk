

# `@igot.ai/react-native`

Integrate a customizable Virtual Assistant (VA) chat button in your React Native application. This package allows you to configure and embed a chat button that opens a modal for interacting with your VA powered by iGOT.ai.

## Installation

Install the package via npm or yarn:

```bash
npm install @igot.ai/react-native
# OR
yarn add @igot.ai/react-native
```

## Configuration

Before using the `IgotAiVAChatButton`, you need to configure the API key and secret provided by iGOT.ai.

```javascript
import { IgotAiVAChatButton, setConfig } from '@igot.ai/react-native';

setConfig({
  apiKey: IGOT_AI_VA_API_KEY,
  apiSecret: IGOT_AI_VA_API_SECRET,
});
```

Replace `IGOT_AI_VA_API_KEY` and `IGOT_AI_VA_API_SECRET` with your actual iGOT.ai API credentials.

## Usage

After configuration, you can integrate the `IgotAiVAChatButton` into your React Native components. When the button is clicked, a modal will open, allowing users to chat with the Virtual Assistant.

```javascript
import React from 'react';
import { View } from 'react-native';
import { IgotAiVAChatButton } from '@igot.ai/react-native';

const MyApp = () => (
  <View>
    <IgotAiVAChatButton />
  </View>
);

export default MyApp;
```
<!-- 
## Props

- **style**: Customize the button's style (optional).
- **modalStyle**: Customize the modal's appearance (optional).

## Example

Here’s an example of how to use the chat button with additional customization:

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IgotAiVAChatButton } from '@igot.ai/react-native';

const MyApp = () => (
  <View style={styles.container}>
    <IgotAiVAChatButton style={styles.button} modalStyle={styles.modal} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default MyApp;
``` -->

## License

MIT License.
