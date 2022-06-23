import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  NavLink,
  Link,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { LoginPage } from "./components/Login/Login";
import React from "react";
import store, { AppStateType } from "./redux/reduxStore";
import { Suspense } from "react";
import { initializeApp } from "./redux/appReducer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { UsersPage } from "./components/Users/UsersContainer";
import "antd/dist/antd.css";

import { Layout, Menu, Button, Avatar } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Header } from "./components/Header/Header";

// const UsersPage = React.lazy(
//   () => import("./components/Users/UsersContainer")
// );
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ChatPage = React.lazy(
  () => import("./pages/Chat/ChatPage")
);
type StatePropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends React.Component<StatePropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert("Some Error occured");
    console.error(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    const { Content, Footer, Sider } = Layout;

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            // items={[
            //   UserOutlined,
            //   VideoCameraOutlined,
            //   UploadOutlined,
            //   UserOutlined,
            // ].map((icon, index) => ({
            //   key: String(index + 1),
            //   icon: React.createElement(icon),
            //   label: `nav ${index + 1}`,
            // }))}
          >
            <Menu.Item  icon={<UserOutlined/>}>
              {" "}
              <Link to="/profile">Profile</Link>{" "}
            </Menu.Item>
            <Menu.Item icon={<MessageOutlined />}>
              {" "}
              <Link to="/dialogs"> Messages </Link>{" "}
            </Menu.Item>
            <Menu.Item icon={<MessageOutlined />}>
              {" "}
              <Link to="/chat"> Chat </Link>{" "}
            </Menu.Item>
            <Menu.Item icon={<UsergroupAddOutlined />}>
              {" "}
              <Link to="/users"> Users </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/profile" />} />
                  <Route path="/profile/*" element={<ProfileContainer />} />
                  <Route
                    path="/profile/:userId"
                    element={<ProfileContainer />}
                  />
                  <Route path="/dialogs/*" element={<DialogsContainer />} />
                  <Route
                    path="/users"
                    element={<UsersPage pageTitle={"Самураи"} />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route
                    path="*"
                    element={
                      <div>
                        <h1>Not Found 404</h1>
                        <div>
                          <Button type="primary">xcszx</Button>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Meruem ©2022 
          </Footer>
        </Layout>
      </Layout>
    );

    // return (
    //   <div className="app-wrapper">
    //     <HeaderContainer />
    //     <Navbar />
    //     <div className="app-wrapper-content">
    //       <Suspense fallback={<Preloader />}>
    //         <Routes>
    //           <Route path="/" element={<Navigate to="/profile" />} />
    //           <Route path="/profile/*" element={<ProfileContainer />} />
    //           <Route path="/profile/:userId" element={<ProfileContainer />} />
    //           <Route path="/dialogs/*" element={<DialogsContainer />} />
    //           <Route
    //             path="/users"
    //             element={<UsersPage pageTitle={"Самураи"} />}
    //           />
    //           <Route path="/login" element={<LoginPage />} />
    //           <Route
    //             path="*"
    //             element={
    //               <div>
    //                 <h1>Not Found 404</h1>
    //                 <div>
    //                  <Button type="primary">xcszx</Button>
    //                 </div>
    //               </div>
    //             }
    //           />
    //         </Routes>
    //       </Suspense>
    //     </div>
    //   </div>
    // );
  }
}
const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};

const AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp })
)(App);

const AppJs: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default AppJs;
