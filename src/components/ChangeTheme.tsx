//useContext的使用，可以不使用props在组件中一层层的传递数据，能直接在组件中获取到数据
//切换主题颜色

import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>('light');
const useGetTheme = () => useContext(ThemeContext);
export default function MyApp() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent onThemeChange={setTheme}/>
    </ThemeContext.Provider>
  )
}
type MyComponentProps = {
  onThemeChange: React.Dispatch<React.SetStateAction<Theme>>;
}
function MyComponent({onThemeChange}:MyComponentProps) {
  const theme = useGetTheme();
  function handleClick() {
    onThemeChange(theme == "light" ? "dark": "light");
  }
  let color = theme == "light"? "black": "pink";
  return <div>
    <p style={{color: color}}>当前主题颜色是：{theme}</p>
    <button onClick={handleClick} style={{color: color}}>切换主题颜色</button>
  </div>
  
}