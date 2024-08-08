import React from 'react';
import './App.css';
import { Select, Col, Row, Button } from 'antd';
import useLanguage from './Hook/useLanguage';
import useChangePage from './Hook/useChangePage';
import { Test1 } from './pages/Test1';
import { Test2 } from './pages/Test2';
import { Home } from './pages/Home';

function App() {
  const { lang , changeLanguage, t } = useLanguage();
  const { pages, changePage } = useChangePage();
  return (
    <div className='gradient-background'>
      <Row justify="space-between" align="middle">
        <Col span={8} className='title'>
          {pages === "test1" && t("title_test1")}
          {pages === "test2" && t("title_test2")}
        </Col>
        <Col className='gridgrid-button-test'>
          {pages !== "home" && <Button onClick={() => changePage("home")}>{t("home")}</Button>}
        </Col>
        <Col span={8}>
          <Select
              value={lang.value}
              className='select-lang'
              dropdownStyle={{ width: '100px' }}
              onChange={changeLanguage}
              options={[
                {
                  value: 'en',
                  label: t("en"),
                },
                {
                  value: 'th',
                  label: t("th"),
                },
              ]}
            />
        </Col>
      </Row>
      <Row>
        {pages === "home" && <Home/>}
        {pages === "test1" && <Test1 />}
        {pages === "test2" && <Test2 />}
      </Row>
    </div>
  );
}

export default App;
