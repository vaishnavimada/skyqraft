import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Row, Input, Form, Button, Typography, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { useForm } = Form;

const ItemForm = ({
  initialValues = {},
  submitBtnTxt = "",
  handleFinish = () => {},
  onCancel = null,
  onFinishFailed = () => {},
}) => {
  const [form] = useForm();

  const onFinish = (values) => {
    form.resetFields();
    handleFinish(values);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={initialValues}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="id" hidden={true}></Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Latitude"
        name="lat"
        rules={[{ required: true, message: "Please input latitude" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Longitude"
        name="lng"
        rules={[{ required: true, message: "Please input longitude" }]}
      >
        <Input />
      </Form.Item>
      <Row>
        <Button htmlType="submit">{submitBtnTxt}</Button>
        {onCancel && (
          <Button style={{ marginLeft: "8px" }} onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Row>
    </Form>
  );
};

const Item = ({ item = {}, setMarkers = () => {} }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleFinish = (values) => {
    setMarkers((markers) => {
      return markers?.map((marker) => {
        console.log(item, marker);
        if (marker?.id === item?.id) {
          return { ...values };
        }
        return { ...marker };
      });
    });
    handleEdit();
  };

  const handleDelete = () => {
    setMarkers((markers) => {
      const updatedMarkers = markers?.filter(
        (marker) => marker?.id !== item?.id
      );

      return updatedMarkers;
    });
  };

  if (!isEdit) {
    return (
      <div>
        <Text className="block-display">{`Title: ${item?.title}`}</Text>
        <Row>
          <Text>{`Lat: ${item?.lat}`}</Text>
          <Text style={{ marginLeft: "8px" }}>{`Lng: ${item?.lng}`}</Text>
        </Row>
        <Button onClick={handleEdit}>Edit Item</Button>
        <Button style={{ marginLeft: "8px" }} onClick={handleDelete}>
          Delete Item
        </Button>
        <Divider
          style={{
            height: "2px",
            marginTop: "16px",
            marginBottom: "16px",
            background: "grey",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <ItemForm
        initialValues={item}
        handleFinish={handleFinish}
        onFinishFailed={console.log}
        onCancel={handleEdit}
        submitBtnTxt="Edit Marker"
      />
      <Divider
        style={{
          height: "2px",
          marginTop: "16px",
          background: "grey",
        }}
      />
    </>
  );
};

const Controls = ({
  markers = [],
  setMarkers = () => {},
  selectedMarker = [],
  setSelectedMarker = () => {},
}) => {
  const handleFinish = (values) => {
    setMarkers([...markers, { ...values, id: markers?.length + 1 }]);
  };

  const onFinishFailed = (err) => {
    console.log(err);
  };

  return (
    <div>
      <Row align="middle">
        <Title style={{ display: "inline-block" }} level={3}>
          CRUD for Map Markers
        </Title>
        <Tooltip title="You can created, edit and delete markers from here">
          <InfoCircleOutlined
            style={{ marginLeft: "8px", marginTop: "-6px" }}
          />
        </Tooltip>
      </Row>
      {markers?.map((marker) => (
        <Item
          key={`${marker?.lat}-${marker?.lng}`}
          item={marker}
          setMarkers={setMarkers}
        />
      ))}

      <ItemForm
        handleFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        submitBtnTxt="Add Marker"
      />
    </div>
  );
};

Controls.propTypes = {
  baseControls: PropTypes.object,
  setBaseControls: PropTypes.func,
  markers: PropTypes.array,
  setMarkers: PropTypes.func,
  selectedMarker: PropTypes.array,
  setSelectedMarker: PropTypes.func,
};

export default Controls;
