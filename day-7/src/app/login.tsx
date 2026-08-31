import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../context.tsx/AuthContext";

export default function Login() {

  const { setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.replace("/(tabs)/home");
  };

  return (
    <View>
      <Text>Login Screen</Text>

      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}