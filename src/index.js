import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// class Title extends React.Component {
//   handleClickOnTitle() {
//     alert("Title has been clicked!")
//   }
//   render() {
//     return (
//       <div>
//         {/* 添加点击事件，on*事件只能用于普通的html标签上，用在组件上无效 */}
//         <h1 onClick={this.handleClickOnTitle}>React练习——组件的组合</h1>
//       </div>
//     )
//   }
// }

// class Header extends React.Component {
//   render() {
//     return (
//       <div>
//         <Title />
//         <h1>This is a header!</h1>
//       </div>
//     )
//   }
// }

// class Main extends React.Component {
//   render() {
//     return(
//       <div>
//         <span>This is main content!</span>
//       </div>
//     )
//   }
// }

// class Footer extends React.Component {
//   render() {
//     return (
//       <div>
//         <span>This is a footer!</span>
//       </div>
//     )
//   }
// }

// class Index extends React.Component {
//   render() {
//     return(
//       <div>
//         <Header />
//         <Main />
//         <Footer />
//       </div>
//     )
//   }
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<Index />)