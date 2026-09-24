import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddChildScreen() {
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState("#3B82F6"); // Default Blue
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [vanNumber, setVanNumber] = useState("GV-204");

  const colorOptions = ["#F39C12", "#3B82F6", "#A855F7", "#10B981", "#EF4444", "#F97316"];

  const handleClose = () => {
    router.back();
  };

  const handleAddChild = () => {
    // Navigate back to Parent Profile or Dashboard after adding child
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Purple Header */}
          <View style={styles.topHeaderCard}>
            <View style={styles.headerDecorationCircle} />

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={{ fontSize: 36, marginBottom: 8 }}>👶</Text>
              <Text style={styles.headerTitle}>Add a Child</Text>
              <Text style={styles.headerSubtitle}>
                Register your child for van pickup
              </Text>
            </View>
          </View>

          {/* Form Content Container */}
          <View style={styles.formContainer}>
            {/* Choose Avatar Color */}
            <Text style={styles.inputLabel}>Choose Avatar Color</Text>
            <View style={styles.colorRow}>
              {colorOptions.map((color, index) => {
                const isSelected = selectedColor === color;
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color },
                      isSelected && styles.selectedColorRing,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                );
              })}
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.colorCircle, styles.customColorCircle]}
              >
                <Text style={styles.customColorText}>?</Text>
              </TouchableOpacity>
            </View>

            {/* Child Full Name Input */}
            <Text style={styles.inputLabel}>Child Full Name</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Aisha Rahman"
                placeholderTextColor="#A0AAB0"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Grade / Year Input */}
            <Text style={styles.inputLabel}>Grade / Year</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 4  or  Grade 4"
                placeholderTextColor="#A0AAB0"
                value={grade}
                onChangeText={setGrade}
              />
            </View>

            {/* School Name Input */}
            <Text style={styles.inputLabel}>School Name</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Greenfield International School"
                placeholderTextColor="#A0AAB0"
                value={schoolName}
                onChangeText={setSchoolName}
              />
            </View>

            {/* Home Pickup Address Input */}
            <Text style={styles.inputLabel}>Home Pickup Address</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 12 Maplewood Drive, Block C"
                placeholderTextColor="#A0AAB0"
                value={pickupAddress}
                onChangeText={setPickupAddress}
              />
            </View>
            <Text style={styles.helperText}>
              Driver will pick up your child from this address
            </Text>

            {/* Assigned Van Number Input */}
            <Text style={[styles.inputLabel, { marginTop: 14 }]}>
              Assigned Van Number
            </Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. GV-204"
                placeholderTextColor="#A0AAB0"
                value={vanNumber}
                onChangeText={setVanNumber}
              />
            </View>
            <Text style={styles.helperText}>Ask your school admin if unsure</Text>

            {/* Submit Action Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.8}
              onPress={handleAddChild}
            >
              <Text style={styles.submitBtnText}>✓ Add Child</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topHeaderCard: {
    backgroundColor: "#6366F1",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
    position: "relative",
    overflow: "hidden",
  },
  headerDecorationCircle: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  headerTitleContainer: {
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#E0E7FF",
    fontWeight: "600",
    marginTop: 4,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A252C",
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  selectedColorRing: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    transform: [{ scale: 1.15 }],
  },
  customColorCircle: {
    backgroundColor: "#E0E7FF",
    borderWidth: 1.5,
    borderColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },
  customColorText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6366F1",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 4,
  },
  textInput: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A252C",
  },
  helperText: {
    fontSize: 11,
    color: "#7F8C8D",
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 4,
  },
  submitBtn: {
    backgroundColor: "#F39C12",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
  },
});