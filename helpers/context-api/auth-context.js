import { useState, createContext, useContext } from "react"; // import useContext
const AAA = createContext();
export const useCustomContext = () => useContext(AAA) // export custom hook

export default function AuthContextProvider(props) {
  const [authMethod, setAuthMethod] = useState(null);
  // setAuthMethod("google") when we log in
  const distribution = { authMethod, setAuthMethod };
  return (
    <AAA.Provider value={distribution}>
      {props.children}
    </AAA.Provider>
  );
}