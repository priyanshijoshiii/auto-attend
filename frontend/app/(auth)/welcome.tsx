import { View, Text } from 'react-native';

export default function Welcome() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F0' }}>
      <Text style={{ fontSize: 24, fontWeight: '600', color: '#2C2C2A' }}>Auto-Attend</Text>
      <Text style={{ fontSize: 15, color: '#888780', marginTop: 8 }}>Welcome screen coming soon</Text>
    </View>
  );
}