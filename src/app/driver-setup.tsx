import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function DriverSetupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = fullName.trim() !== "" && phoneNumber.trim() !== "";

  const handleContinue = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      // Unique ID එකක් ලෙස Phone Number එක හෝ Custom Doc ID එකක් භාවිතා කළ හැක
      const driverId = phoneNumber.replace(/[^0-9]/g, "");

      // Firestore Database එකේ 'drivers' Collection එකට Step 1 Data එකතු කිරීම
      await setDoc(
        doc(db, "drivers", driverId),
        {
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          serviceArea: serviceArea.trim(),
          role: "driver",
          stepCompleted: 1,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setLoading(false);

      // Step 2 (Vehicle Setup) එකට Data pass කරමින් Navigate කිරීම
      router.push({
        pathname: "/vehicle-setup" as any,
        params: {
          driverId,
          fullName,
          phoneNumber,
        },
      });
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        "Database Error",
        error.message || "තොරතුරු සුරැකීමට නොහැකි විය. නැවත උත්සාහ කරන්න."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Dark Card with Step Progress Bar */}
        <View style={styles.topCard}>
          {/* Progress Bar Header */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressStep, styles.activeStep]} />
            <View style={[styles.progressStep, styles.inactiveStep]} />
          </View>

          <Text style={styles.stepText}>Step 1 of 2</Text>
          <Text style={styles.mainTitle}>Personal Details</Text>
          <Text style={styles.subTitle}>Tell us about yourself</Text>
        </View>

        {/* Main Content Form */}
        <View style={styles.formContainer}>
          {/* Driver Avatar Placeholder */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBox}>
              <Text style={{ fontSize: 42 }}>👮‍♂️</Text>
            </View>
          </View>

          {/* Input 1: Full Name */}
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Budi Santoso"
            placeholderTextColor="#A0AAB0"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Input 2: Phone Number */}
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. +94 77 123 4567"
            placeholderTextColor="#A0AAB0"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          {/* Input 3: Service Area / Route */}
          <Text style={styles.inputLabel}>Service Area / Route</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Colombo 07 — Royal College"
            placeholderTextColor="#A0AAB0"
            value={serviceArea}
            onChangeText={setServiceArea}
          />
        </View>
      </ScrollView>

      {/* Bottom Fixed Continue Button */}
      <View style={styles.bottomFooter}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isFormValid ? "#F39C12" : "#F7D08A" },
          ]}
          activeOpacity={0.8}
          disabled={!isFormValid || loading}
          onPress={handleContinue}
        >
          {loading ? (
            <ActivityIndicator color="#1A252C" />
          ) : (
            <Text style={styles.buttonText}>Continue →</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  topCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 35,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressStep: {
    height: 4,
    borderRadius: 2,
    flex: 0.48,
  },
  activeStep: {
    backgroundColor: "#F39C12",
  },
  inactiveStep: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  stepText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A0AAB0",
    marginBottom: 6,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#A0AAB0",
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 25,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarBox: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#FFF8E7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F39C12",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7F8C8D",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    fontWeight: "600",
    color: "#1A252C",
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    marginBottom: 20,
  },
  bottomFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  continueButton: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A252C",
  },
});
