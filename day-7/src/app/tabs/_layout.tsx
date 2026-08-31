import { Tabs, router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../../context.tsx/AuthContext";

export default function TabLayout() {

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}