import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "../../context.tsx/AuthContext";

export default function Index() {

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  return null;
}