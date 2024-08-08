import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Checkbox, Row, Col } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { TableProps } from 'antd';
import useGetData from '../Hook/useGetData';
import { useTranslation } from 'react-i18next';

type ColumnsType<T extends object> = TableProps<T>['columns'];

interface DataType {
  key: React.Key;
  id: number; // Assuming each data item has a unique `id`
  birthday: string;
  citizenID: string;
  countryCode: string;
  firstname: string;
  gender: string;
  lastname: string;
  nationality: string;
  passportno: string;
  phonefull: string;
  salary: string;
  title: string;
}

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface TableTest2Props {
  setForm: (formData: any) => void; // Adjust the `any` type to match the expected parameter type
}

const TableTest2: React.FC<TableTest2Props> = (props) => {
  const { t } = useTranslation();
  const { data, GetData } = useGetData();
  const { setForm } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  const columns: ColumnsType<DataType> = [
    {
      title: t("name"),
      dataIndex: 'fullname',
      key: 'fullname'
    },
    {
      title: t("gender"),
      dataIndex: 'gender',
      key: 'gender',
      render : (_,record) => {
        return t(record.gender);
      }
    },
    {
      title: t("phone"),
      dataIndex: 'phonefull',
      key: 'phonefull',
    },
    {
      title: t("nationality"),
      dataIndex: 'nationality',
      key: 'nationality',
      render : (_,record) => {
        return t(record.nationality);
      }
    },
    {
      title: t("manage"),
      key: 'manage',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => setForm(record)}>{t("edit")}</Button>
          <Button onClick={() => handleDelete(record.id)}>{t("delete")}</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    GetData();
  }, []);

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item : any) => item.id !== id);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    GetData();
  };

  const handleDeleteSelect = () => {
    const updatedData = data.filter((item : any) => !selectedRowKeys.includes(item.id));
    localStorage.setItem('formData', JSON.stringify(updatedData));
    GetData(); // Refresh the data
    setSelectedRowKeys([]); // Clear the selection
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectAllChecked(newSelectedRowKeys.length === data.length);
  };

  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedRowKeys(data.map((item : any) => item.id));
    } else {
      setSelectedRowKeys([]);
    }
    setSelectAllChecked(isChecked);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Checkbox checked={selectAllChecked} onChange={handleSelectAllChange}>
            {t("select_all")}
          </Checkbox>
          <Button onClick={() => handleDeleteSelect()} disabled={!hasSelected}>
            {t("delete")}
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        pagination={{ position: ['topRight'] }}
        dataSource={data?.map((item : any) => ({ ...item, key: item.id }))}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </div>
  );
};

export default TableTest2;
