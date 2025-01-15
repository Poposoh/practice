
//useReducer的使用，传递两个参数，一个reducer函数和一个state的初始值
import { useReducer } from "react";
interface State {
  count: number;
}
type CounterAction = {type: "reset"} | {type: "setCount", value: number};

const initState: State = {
  count: 0
};

const setStateCount = (state: State, action: CounterAction): State => {
  switch(action.type) {
    case "reset":
      return initState;
    case "setCount":
      return {...state, count: action.value + 5};
    default: 
      throw new Error("错误类型！");    
  }
}
export default function Counter() {
  const [state, dispatch] = useReducer(setStateCount, initState);
  function handleClick() {
    dispatch({type: "setCount", value: state.count})
  }
  function handleReset() {
    dispatch({type: "reset"})
  }
  return (
    <div>
      <h1>欢迎来到我的计数器</h1>
      <div>计数: {state.count}</div>
      <button onClick={handleClick}>加5</button>
      <button onClick={handleReset}>重置</button>
    </div>
  )
}