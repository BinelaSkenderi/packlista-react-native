import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: "Packing lists", headerShown: true }} 
      />
      <Stack.Screen name="packlists/new" options={{ title: "New List" }} />
      <Stack.Screen name="packlists/[id]" options={{ title: "PackList Details" }} />
      <Stack.Screen name="templates" options={{ title: "Templates" }} />
    </Stack>
  );
}
