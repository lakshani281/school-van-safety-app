import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadSlipScreen() {
  const router = useRouter();
  const [fileAttached, setFileAttached] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePickFile = () => {
    setFileAttached(!fileAttached);
  };

  const handleSubmit = () => {
    if (!fileAttached) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // Navigate back to Parent Fees screen
      router.push("/parent-fees" as any);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dark Header Banner */}
        <View style={styles.headerBanner}>
          <View style={styles.headerTopRow}>
            <Text style={styles.stepText}>STEP 2 OF 2</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.8}
              onPress={() => router.back()}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Upload Payment Slip</Text>
          <Text style={styles.headerSubtitle}>
            Attach your transfer screenshot or photo
          </Text>
        </View>

        {/* Upload Box (Dashed Container) */}
        <TouchableOpacity
          style={[
            styles.uploadDashedCard,
            fileAttached && styles.uploadDashedCardActive,
          ]}
          activeOpacity={0.85}
          onPress={handlePickFile}
        >
          <View style={styles.attachmentIconCircle}>
            <Text style={{ fontSize: 28 }}>📎</Text>
          </View>

          {fileAttached ? (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.attachedFileNameText}>
                ✓ Payment_Slip_Sep2026.jpg
              </Text>

              <Text style={styles.attachedSubText}>
                Tap again to change slip photo
              </Text>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.uploadTitleText}>Tap to upload slip</Text>

              <Text style={styles.uploadFormatsText}>
                JPG, PNG, or PDF • Max 5 MB
              </Text>

              <Text style={styles.uploadDescText}>
                Screenshot or photo of transfer slip
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Transfer Summary Card */}
        <Text style={styles.sectionHeaderTitle}>TRANSFER SUMMARY</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.fieldLabel}>Bank</Text>
            <Text style={styles.fieldValueBold}>BOC</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.fieldLabel}>Branch</Text>
            <Text style={styles.fieldValue}>BOC Branch Colombo Fort</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.fieldLabel}>Account</Text>
            <Text style={styles.fieldValueMonospace}>8888 2222 44</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.fieldLabel}>Amount</Text>
            <Text style={styles.amountOrangeText}>Rs. 15,000</Text>
          </View>

          <View style={[styles.summaryRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Text style={styles.fieldLabel}>Period</Text>
            <Text style={styles.fieldValueBold}>September 2026</Text>
          </View>
        </View>

        {/* Note (Optional) Section */}
        <View style={styles.noteContainerCard}>
          <Text style={styles.noteTitle}>Note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="e.g. Transfer from husband's account"
            placeholderTextColor="#A0AAB0"
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>

        {/* Submit Action Button */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            fileAttached ? styles.submitBtnActive : styles.submitBtnDisabled,
          ]}
          activeOpacity={fileAttached ? 0.85 : 1}
          onPress={handleSubmit}
          disabled={!fileAttached || submitting}
        >
          <Text
            style={[
              styles.submitBtnText,
              fileAttached ? styles.submitBtnTextActive : styles.submitBtnTextDisabled,
            ]}
          >
            📥 {submitting ? "Submitting Slip..." : "Submit Payment Slip"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerNoticeText}>
          Verified by admin within 1 × 24 hours
        </Text>
      </ScrollView>
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
  headerBanner: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 28,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  stepText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#7F8C8D",
    letterSpacing: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#A0AAB0",
    lineHeight: 18,
  },
  uploadDashedCard: {
    backgroundColor: "#FFF8ED",
    borderWidth: 2,
    borderColor: "#F39C12",
    borderStyle: "dashed",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadDashedCardActive: {
    backgroundColor: "#E6F9F0",
    borderColor: "#10B981",
  },
  attachmentIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  uploadTitleText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
    marginBottom: 4,
  },
  uploadFormatsText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A0AAB0",
    marginBottom: 2,
  },
  uploadDescText: {
    fontSize: 11,
    color: "#7F8C8D",
  },
  attachedFileNameText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#10B981",
    marginBottom: 4,
  },
  attachedSubText: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#F39C12",
    letterSpacing: 1,
    marginLeft: 22,
    marginBottom: 10,
    marginTop: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  fieldLabel: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  fieldValueBold: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1A252C",
  },
  fieldValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A252C",
  },
  fieldValueMonospace: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1A252C",
    fontFamily: "monospace",
  },
  amountOrangeText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#F39C12",
    fontFamily: "monospace",
  },
  noteContainerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
    marginBottom: 10,
  },
  noteInput: {
    backgroundColor: "#FAF7F2",
    borderRadius: 16,
    padding: 14,
    fontSize: 13,
    color: "#1A252C",
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitBtn: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  submitBtnActive: {
    backgroundColor: "#F39C12",
    elevation: 3,
  },
  submitBtnDisabled: {
    backgroundColor: "#FAD7A0",
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "900",
  },
  submitBtnTextActive: {
    color: "#1A252C",
  },
  submitBtnTextDisabled: {
    color: "#B08238",
  },
  footerNoticeText: {
    fontSize: 11,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
  },
});