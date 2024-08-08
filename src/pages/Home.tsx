import React from 'react'
import {  Button, Col } from 'antd';
import useChangePage from '../Hook/useChangePage';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();
  const { changePage } = useChangePage();
  return (
      <Col span={24} className='grid-button-test'>
          <Button className='button-test' onClick={() => changePage("test1")}>
            <span className="button-main-text">{t("test1")}</span>
            <span className="button-sub-text">{t("title_test1")}</span>
          </Button>
          <Button className='button-test' onClick={() => changePage("test2")}>
            <span className="button-main-text">{t("test2")}</span>
            <span className="button-sub-text">{t("title_test2")}</span>
          </Button>
      </Col>
  )
}
