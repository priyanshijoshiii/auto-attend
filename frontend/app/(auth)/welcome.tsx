import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Layout } from '../../constants/layout';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.emoji}>🎒</Text>
        </View>
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Auto-Attend</Text>
        <Text style={styles.subtitle}>Your attendance, on autopilot.</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.primaryButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        By continuing you agree to our Terms & Privacy Policy
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Layout.screen.paddingHorizontal,
    paddingBottom: Layout.screen.paddingBottom,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationPlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.background.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xxxl,
  },
  title: {
    fontSize: Typography.size.display,
    fontWeight: Typography.weight.bold,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
  primaryButton: {
    backgroundColor: Colors.brand.blue,
    paddingVertical: Layout.spacing.lg,
    borderRadius: Layout.radius.pill,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
  },
  secondaryButton: {
    backgroundColor: Colors.background.secondary,
    paddingVertical: Layout.spacing.lg,
    borderRadius: Layout.radius.pill,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border.light,
  },
  secondaryButtonText: {
    color: Colors.text.primary,
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.medium,
  },
  footer: {
    fontSize: Typography.size.xs,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: Typography.size.xs * Typography.lineHeight.relaxed,
  },
});