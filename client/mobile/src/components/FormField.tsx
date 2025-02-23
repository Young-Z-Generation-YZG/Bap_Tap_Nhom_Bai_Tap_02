import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
// import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      {/* <Text className="text-base text-black font-pmedium">{title}</Text> */}
      <View className="w-full h-16 px-4 bg-white-100 rounded-[8px] border border-black-200 flex flex-row items-center text-base">
        <TextInput
          className="flex-1 text-black font-medium"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            /> */}
            {
              !showPassword ? (
                <Text className="text-black font-medium w-6 h-6">Hide</Text>
              ) : (
                <Text className="text-black font-medium w-6 h-6">Show</Text>
              )
            }
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
