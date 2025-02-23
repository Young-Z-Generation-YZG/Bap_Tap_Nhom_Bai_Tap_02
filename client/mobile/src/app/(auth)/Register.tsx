import React, { useState } from "react";
import "expo-router/entry";

import { Link, router } from "expo-router";

import { ScrollView, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "~/components/FormField";
import CustomButton from "~/components/CustomButton";

const Register = () => {
  const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
  });

  const submit = async () => {
    if (form.firstName === "" || form.lastName === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    // setSubmitting(true);
    try {
      // const result = await createUser(form.email, form.password, form.username);
      // setUser(result);
      // setIsLogged(true);
      Alert.alert("Success", "Register successfully");
      router.replace("/verify");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      // setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView
          contentContainerStyle={{
          height: "100%",
          }}
      >
        <View className="flex items-center justify-start h-full px-4">
          <Text className="text-black text-4xl font-semibold font-Poppins-SemiBold my-10">ICON</Text>
          <Text className="text-black text-4xl font-semibold font-Poppins-SemiBold">CREATE ACCOUNT</Text>
          <FormField
            title= "First Name"
            value={form.firstName}
            placeholder="First name"
            handleChangeText={(data) => setForm({...form, firstName: data})}
            otherStyles="mt-4 text-xl font-semibold font-Poppins-SemiBold"
          />
          <FormField
            title= "Last Name"
            value={form.lastName}
            placeholder="Last name"
            handleChangeText={(data) => setForm({...form, lastName: data})}
            otherStyles="mt-4 text-xl font-semibold font-Poppins-SemiBold"
          />
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
          <CustomButton
            title="Register"
            handlePress={submit}
            containerStyles="w-full mt-4 bg-black"
            textStyles="text-white text-xl uppercase"
            isLoading={false}
          />
          <Link
              href="/login"
              className="text-black font-semibold font-Poppins-SemiBold mt-5"
            >
              Already have an account
            </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
