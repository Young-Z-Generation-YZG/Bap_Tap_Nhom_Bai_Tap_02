import React, { useState } from "react";
import "expo-router/entry";

import { Link, router } from "expo-router";

import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/components/CustomButton";
import FormField from "~/components/FormField";

const ForgetPassword = () => {
  const [form, setForm] = useState({
      email: ""
  });
  
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView
          contentContainerStyle={{
          height: "100%",
          }}
      >
        <View className="flex items-center justify-start h-full px-4">
          <Text className="text-black text-4xl font-semibold font-Poppins-SemiBold my-10">ICON</Text>
          <Text className="text-black text-4xl font-semibold font-Poppins-SemiBold">FORGET PASSWORD</Text>
          <FormField
            title= "Email"
            value={form.email}
            placeholder="Email"
            handleChangeText={(data) => setForm({...form, email: data})}
            otherStyles="mt-4 text-xl font-semibold font-Poppins-SemiBold"
          />
          <CustomButton
            title="Recovery"
            handlePress={() => {}}
            containerStyles="w-full mt-4 bg-black"
            textStyles="text-white text-xl uppercase"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
