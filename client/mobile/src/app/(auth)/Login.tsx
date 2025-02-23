import React, { useState } from "react";
import "expo-router/entry";

import { Link, router } from "expo-router";

import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "~/components/FormField";
import CustomButton from "~/components/CustomButton";

const Login = () => {
  const [form, setForm] = useState({
      email: "",
      password: "",
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
          <Text className="text-black text-4xl font-semibold font-Poppins-SemiBold">LOGIN HERE</Text>
          <FormField
            title= "Email"
            value={form.email}
            placeholder="Email"
            handleChangeText={(data) => setForm({...form, email: data})}
            otherStyles="mt-4 text-xl font-semibold font-Poppins-SemiBold"
          />
          <FormField
            title= "Password"
            value={form.password}
            placeholder="Password"
            handleChangeText={(data) => setForm({...form, password: data})}
            otherStyles="mt-4 text-xl font-semibold font-Poppins-SemiBold"
          />
          <View className="flex flex-row items-center justify-end w-full">
            <Link
              href="/forgetPassword"
              className="text-black font-semibold font-Poppins-SemiBold mt-5"
            >
                Forgot your password?
            </Link>
          </View>
          
          <CustomButton
            title="Login"
            handlePress={() => {}}
            containerStyles="w-full mt-4 bg-black"
            textStyles="text-white text-xl uppercase"
            isLoading={false}
          />
          <Link
            href="/register"
            className="text-black font-semibold font-Poppins-SemiBold mt-5"
          >
              Create new account
          </Link>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
