import { Avatar, Button, Col, Layout, Row } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Header.module.css";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectLogin } from "../../redux/selectors/authSelectors";
import { AppThunkDispatchType } from "../../redux/reduxStore";
import { logout } from "../../redux/authReducer";


export const Header: React.FC = (props) => {
  const { Header } = Layout;

  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectLogin);
  const dispatch: AppThunkDispatchType = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  const toLoginPage = ()=>{
    navigate("login");
  }
  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ padding: 0 }}
    >
      {isAuth ? (
        <Row>
          <Col span={19}></Col>
          <Col span={5}>
            <span>
              <Avatar size="large" icon={<UserOutlined />} />
              <span className={s.loginSpan}>{login}</span>{" "}
              <Button type="primary" danger onClick={logoutCallback}>Log out</Button>
            </span>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={23}></Col>
          <Col span={1}>
            <Button type="primary" onClick={toLoginPage}>Login</Button>
          </Col>
        </Row>
      )}
    </Header>

    // <header className={s.header}>
    //   <img
    //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Soyuzmultfilm_Logo.png/600px-Soyuzmultfilm_Logo.png"
    //     alt="lorem"
    //   />
    //   <div className={s.loginBlock}>
    //     {props.isAuth ? (
    //       <div>
    //         {props.login} <button onClick={props.logout}>Log out</button>
    //       </div>
    //     ) : (
    //       <NavLink to={"/login"}>Login</NavLink>
    //     )}
    //   </div>
    // </header>
  );
};
