import { Analytics } from "@vercel/analytics/react";
import SplitScreenLayout from "./components/layout/SplitScreenLayout.jsx";

const App = () => {
  return (
    <>
      <SplitScreenLayout />
      <Analytics />
    </>
  );
};

export default App;
