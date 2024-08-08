import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  Radio
} from 'antd';
import './Test2.css';
import TableTest2 from './TableTest2';
import useCitizenID from '../Hook/useSetCitizen';
import useGetData from '../Hook/useGetData';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import useSetKey from '../Hook/useSetKey';
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Test2 = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { citizenID, setPart, resetCitizenID, setCitizenIDFromString } = useCitizenID();
  const { GetData } = useGetData();
  const { key, setKeyProp } = useSetKey();

  const setFormData = (data: any) => {
    
    const transformedData = {
      ...data,
      birthday: data.birthday ? moment(data.birthday) : null,
    };
    setKeyProp(data.id)
    setCitizenIDFromString(data.citizenID);
    
    form.setFieldsValue(transformedData);
    console.log("data set form:", transformedData);
  }

  const onFinish = (values: any) => {
    const fullPhoneNumber = `${values.countryCode}${values.phoneNumber}`;
    const fullCitizenID = `${citizenID.part1}-${citizenID.part2}-${citizenID.part3}-${citizenID.part4}-${citizenID.part5}`;
    const fullName = `${values.firstname} ${values.lastname}`;
    console.log('Received values of form: ', { ...values, citizenID: fullCitizenID, phonefull: fullPhoneNumber, fullname : fullName });

    const existingData = localStorage.getItem('formData');
    const data = existingData ? JSON.parse(existingData) : [];

    const checkData = data.find((item: any) => item.id === key);
    if (checkData) {
      const index = data.findIndex((item: any) => item.id === key);
      data[index] = { ...values, citizenID: fullCitizenID, phonefull: fullPhoneNumber, fullname : fullName, id : key };
      localStorage.setItem('formData', JSON.stringify(data));
      alert('Edit success',);
      GetData();
      resetCitizenID();
      form.resetFields();
      setKeyProp(null);
    }else{
      const formData = { ...values, citizenID: fullCitizenID, phonefull: fullPhoneNumber, fullname : fullName, id : data.length + 1 };
    
      data.push(formData);
      localStorage.setItem('formData', JSON.stringify(data));
      alert('Save success',);
      GetData();
      resetCitizenID();
      form.resetFields();
    }
 
  };

  return (
  <>
    <Row className='row1-test2'>
      <Form
      {...formItemLayout}
      form={form}
      className='form-test2'
      name="register"
      onFinish={onFinish}
    >
      <Row>
        <Col span={6}>
          <Form.Item
            name="title"
            label={t("title")}
            labelCol={{ span: 10 }}
            rules={[{ required: true, message: 'Please select title!' }]}
          >
            <Select placeholder={t("title")}>
              <Option value="mr">Mr.</Option>
              <Option value="mrs">Mrs.</Option>
              <Option value="ms">Ms.</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            name="firstname"
            label={t("first_name")}
            rules={[
              {
                required: true,
                message: 'Please input your firstname!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            name="lastname"
            label={t("last_name")}
            rules={[
              {
                required: true,
                message: 'Please input your lastname!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>


      <Row>
        <Col>
          <Form.Item 
            name="birthday" 
            label={t("birthday")}
            labelCol={{ span: 8 }}
            rules = {[
              { 
                type: 'object' as const, 
                required: true, 
                message: 'Please select time!' }
              ]}
            >
            <DatePicker />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            name="nationality"
            label={t("nationality")}
            rules={[{ required: true, message: 'Please select your nationality!' }]}
            >
              <Select placeholder="-- Please select --">
                <Option value="thai">{t("thai")}</Option>
                <Option value="french">{t("french")}</Option>
                <Option value="american">{t("american")}</Option>
              </Select>
            </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item 
          label={t("citizen_id")}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
        >
          <Row className='row-citizen'>
            <Col span={2}><Input maxLength={1} value={citizenID?.part1} onChange={(e) => setPart('part1', e.target.value)} /></Col>
            <Col span={4}><Input maxLength={4} value={citizenID?.part2} onChange={(e) => setPart('part2', e.target.value)} /></Col>
            <Col span={4}><Input maxLength={5} value={citizenID?.part3} onChange={(e) => setPart('part3', e.target.value)} /></Col>
            <Col span={3}><Input maxLength={2} value={citizenID?.part4} onChange={(e) => setPart('part4', e.target.value)} /></Col>
            <Col span={2}><Input maxLength={1} value={citizenID?.part5} onChange={(e) => setPart('part5', e.target.value)} /></Col>
          </Row>   
        </Form.Item>
      </Row>
      
      <Row>
        <Col span={24}>
          <Form.Item 
            name="gender" 
            label={t("gender")}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 24 }}
          >
            <Radio.Group className='row-gender'>
              <Radio value="male">{t("male")}</Radio>
              <Radio value="female">{t("female")}</Radio>
              <Radio value="unsex">{t("unsex")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="phone"
        label={t("phone")}
        labelCol={{ span: 3.5 }}
        wrapperCol={{ span: 20 }}
        rules={[{ required: true, message: 'Please input your mobile phone!' }]}
      >
        <Row gutter={8}>
          <Col span={4}>
            <Form.Item
              name="countryCode"
              noStyle
              rules={[{ required: true, message: 'Please select your country code!' }]}
            >
              <Select>
                <Option value="+66">+66</Option>
                <Option value="+1">+1</Option>
                <Option value="+33">+33</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col> - </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              noStyle
              rules={[{ required: true, message: 'Please enter your phone number!' }]}
            >
              <Input style={{ width: '100%' }} maxLength={9}/>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Row>
        <Form.Item
            name="passportno"
            label={t("passport") }
            labelCol={{ span: 3.5 }}
          >
              <Input style={{ width: '150%' }} />
          </Form.Item>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
              name="salary"
              label={t("salary")}
              labelCol={{ span: 3.5 }}
          >
              <Input style={{ width: '95%' }} />
          </Form.Item>
        </Col>
        
        <Col span={6} className='row-salary'>
          <Form.Item {...tailFormItemLayout}>
            <Button
              onClick={() => {
                form.resetFields();
                resetCitizenID();
              }}
            >
              {t("reset")}
            </Button>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item>
              <Button htmlType="submit">
                {t("submit")}
              </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </Row>
    <Row className='table-test2'>
        <TableTest2 setForm={setFormData}/>
    </Row>
  </>
  );
};
