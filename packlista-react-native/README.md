# PackList App

En enkel React Native-app byggd med Expo och Expo Router som hjälper dig att skapa och hantera packlistor för olika resor och tillfällen.


## Funktioner

- Visa en lista med packlistor (exempel: Weekend Gateway, Business Trip, Trip to Italy)
- Skapa nya packlistor med valfria items
- Visa detaljer för varje packlista med en lista av items
- Markera items som "packade" med checkbox
- Ta bort packlistor som du inte vill ha kvar
- Data sparas lokalt på enheten med asynkron lagring (`AsyncStorage`)


## 🧑‍💻 Användning

- På startsidan visas dina packlistor. Klicka på en lista för att se innehållet.
- Markera kryssrutor på items för att ange vad som är packat.
- Skapa en ny lista via "New List"-knappen.
- Ta bort en lista genom att klicka på papperskorgen på listkortet.


## 📁 Struktur

- app/ # Sidor och routing (Expo Router)
- components/ # Återanvändbara UI-komponenter (t.ex. ListCard)
- utils/storage.ts # Funktioner för att läsa/spara packlistor i lokal lagring
- types.ts # TypeScript-typer för packlistor och items



## Installation och körning

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```


## Teknologier

- **React Native** med **Expo**
- **Expo Router** för navigation
- **AsyncStorage** för lokal lagring
- **TypeScript** för typning

---

## Framtida förbättringar

- Synkronisering med molnet (backup & återställning)
- Dela packlistor med andra användare
- Fler anpassningsmöjligheter för listor och innehåll
- Förbättrad design, animationer och användarupplevelse



**Binela Skenderi**  
📎 GitHub: [https://github.com/BinelaSkenderi] 
📦 Repository: [https://github.com/BinelaSkenderi/packlista-react-native.git]

> Byggd med ❤️ och Expo

