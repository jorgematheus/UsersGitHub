import React from 'react';
import { WebView } from 'react-native-webview';

export default function ContentStar({ route }) {
  return (
    <WebView source={{ uri: route.params.item.html_url }} style={{ flex: 1 }} />
  );
}
