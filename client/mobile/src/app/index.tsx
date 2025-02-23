import React from "react";
import "expo-router/entry";

// import Button from "@components/Button";
import { Link, router } from "expo-router";

import { ScrollView, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaView className="bg-[#0D0D0D] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex items-center justify-center h-full">
          <View className="mb-32">
            <Text className="text-white text-xl font-semibold font-Poppins-SemiBold">
              On boarding Screen
            </Text>
          </View>
          <View className="mb-32 flex flex-col items-center">
            <Link
              className="text-white text-xl font-semibold font-Poppins-SemiBold"
              href="/register"
            >
                Register
            </Link>
            <Link
              className="text-white text-xl font-semibold font-Poppins-SemiBold"
              href="/login"
            >
                Login
            </Link>
          </View>

          <View className="mt-5"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
