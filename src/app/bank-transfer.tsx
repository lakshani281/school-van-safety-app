import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BankTransferScreen() {
  const router = useRouter();
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedAmt, setCopiedAmt] = useState(false);

  const handleCopyAcc = () => {
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleCopyAmt = () => {
    setCopiedAmt(true);
    setTimeout(() => setCopiedAmt(false), 2000);
  };

  const handleProceedToUpload = () => {
    // Navigates to Step 2: Upload Slip Screen
    router.push("/upload-slip" as any);
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
            <Text style={styles.stepText}>STEP 1 OF 2</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.8}
              onPress={() => router.back()}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Bank Transfer</Text>
          <Text style={styles.headerSubtitle}>
            Transfer to one of the accounts below, then upload your slip
          </Text>
        </View>

        {/* Amount Card */}
        <View style={styles.amountCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.amountLabel}>AMOUNT TO TRANSFER</Text>
            <Text style={styles.amountText}>Rs. 15,000</Text>
            <Text style={styles.amountSub}>September 2026 • 2 children</Text>
          </View>
          <Text style={{ fontSize: 42 }}>🏦</Text>
        </View>

        {/* Bank Selection Pill */}
        <View style={styles.bankPillContainer}>
          <View style={styles.bankPill}>
            <View style={styles.redDot} />
            <Text style={styles.bankPillText}>BOC</Text>
          </View>
        </View>

        {/* Account Details Section */}
        <Text style={styles.sectionHeaderTitle}>ACCOUNT DETAILS</Text>
        <View style={styles.detailsCard}>
          <Text style={styles.fieldLabel}>Account Number</Text>
          <View style={styles.accNumRow}>
            <Text style={styles.accNumText}>8888 2222 44</Text>
            <TouchableOpacity
              style={styles.copyBtn}
              activeOpacity={0.8}
              onPress={handleCopyAcc}
            >
              <Text style={styles.copyBtnText}>
                {copiedAcc ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.fieldLabel}>Account Name</Text>
            <Text style={styles.fieldValueBold}>SafeRide Sri Lanka</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.fieldLabel}>Branch</Text>
            <Text style={styles.fieldValue}>BOC Branch Colombo Fort</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Text style={styles.fieldLabel}>Transfer Amount</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={styles.amountOrangeText}>Rs. 15,000</Text>
              <TouchableOpacity
                style={styles.copyBtnSmall}
                activeOpacity={0.8}
                onPress={handleCopyAmt}
              >
                <Text style={styles.copyBtnTextSmall}>
                  {copiedAmt ? "Copied!" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* How to Pay Section */}
        <Text style={styles.sectionHeaderTitle}>HOW TO PAY</Text>
        <View style={styles.instructionsCard}>
          <View style={styles.stepRow}>
            <View style={styles.stepNumBox}>
              <Text style={styles.stepNumText}>1</Text>
            </View>
            <Text style={styles.stepDescText}>
              Transfer the exact amount to the account above
            </Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumBox}>
              <Text style={styles.stepNumText}>2</Text>
            </View>
            <Text style={styles.stepDescText}>
              Take a screenshot of your payment confirmation
            </Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumBox}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <Text style={styles.stepDescText}>
              Come back here and tap "Upload Slip" to submit
            </Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumBox}>
              <Text style={styles.stepNumText}>4</Text>
            </View>
            <Text style={styles.stepDescText}>
              Admin will verify within 1 × 24 hours
            </Text>
          </View>
        </View>

        {/* Action Button -> Connects to Step 2 (/upload-slip) */}
        <TouchableOpacity
          style={styles.uploadBtn}
          activeOpacity={0.85}
          onPress={handleProceedToUpload}
        >
          <Text style={styles.uploadBtnText}>
            📎 I've Transferred — Upload Slip
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerNoticeText}>
          Please transfer the exact amount for faster verification
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
  amountCard: {
    backgroundColor: "#F39C12",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#1A252C",
    letterSpacing: 0.8,
  },
  amountText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1A252C",
    marginVertical: 4,
    fontFamily: "monospace",
  },
  amountSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A252C",
    opacity: 0.8,
  },
  bankPillContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  bankPill: {
    backgroundColor: "#1A252C",
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  redDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF3B30",
  },
  bankPillText: {
    color: "#F39C12",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#F39C12",
    letterSpacing: 1,
    marginLeft: 22,
    marginBottom: 10,
    marginTop: 8,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 20,
  },
  accNumRow: {
    backgroundColor: "#FAF7F2",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  accNumText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1A252C",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
  copyBtn: {
    backgroundColor: "#FFF8ED",
    borderWidth: 1.5,
    borderColor: "#F39C12",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  copyBtnText: {
    color: "#F39C12",
    fontWeight: "900",
    fontSize: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
  amountOrangeText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#F39C12",
    fontFamily: "monospace",
  },
  copyBtnSmall: {
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#F39C12",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  copyBtnTextSmall: {
    color: "#F39C12",
    fontWeight: "800",
    fontSize: 11,
  },
  instructionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 24,
    gap: 16,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  stepNumBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#FFF8ED",
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#F39C12",
  },
  stepDescText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#1A252C",
    lineHeight: 18,
  },
  uploadBtn: {
    backgroundColor: "#F39C12",
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  uploadBtnText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
  },
  footerNoticeText: {
    fontSize: 11,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
  },
});