import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Spin,
  message,
  Avatar,
  Upload,
} from "antd";
import { getPlantDetails } from "../../../api/plantsManagement";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PlantDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPlantDetails = async (id) => {
      try {
        const data = await getPlantDetails(id);
        setData(data.data);
        form.setFieldsValue(data.data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
        message.error("Error fetching plant details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlantDetails(id);
    }
  }, [id, form]);

  const handleUpdateClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    form.setFieldsValue(data);
  };

  const handleFinish = (updatedData) => {
    console.log("Updated data:", updatedData);
    setData(updatedData);
    setEditMode(false);
    message.success("Plant details updated successfully");
  };

  if (loading) {
    return (
      <Spin tip="Loading..." style={{ display: "block", margin: "auto" }} />
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        CHI TIẾT CÂY CẢNH
      </Title>
      <Card>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button type="primary" shape="round">
            Mã cây: {data.plantId}
          </Button>
        </div>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          onFinish={handleFinish}
        >
          <Form.Item label="Hình ảnh" name="imageUrl">
            <Avatar
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f0f0f0",
                borderRadius: "50%",
                marginRight: "20px",
              }}
              src={data.imagePlants[0]?.imageUrl}
            />
            {editMode && (
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="Tên cây:" name="plantName">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Mô tả ngắn:" name="title">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Chi tiết:" name="description">
            <Input.TextArea readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Chiều dài:" name="length">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Chiều rộng:" name="width">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Chiều cao:" name="height">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Giá nhập:" name="price">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Giá bán:" name="finalPrice">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Ngày tạo:" name="creationDate">
            <Input
              value={moment(data.creationDate).format("YYYY-MM-DD")}
              readOnly
            />
          </Form.Item>

          <Form.Item label="Ngày kết thúc:" name="modificationDate">
            <Input
              value={moment(data.creationDate).format("YYYY-MM-DD")}
              readOnly
            />
          </Form.Item>

          <Form.Item label="Chủ nhà vườn (chủ cây):" name="modificationBy">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Loại cây:" name="categoryId">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Loại mô hình kinh doanh" name="typeEcommerceId">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Đã duyệt:" name="isActive">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item label="Trạng thái:" name="status">
            <Input readOnly={!editMode} />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            {editMode ? (
              <>
                <Button
                  type="default"
                  danger
                  style={{ marginRight: "10px" }}
                  onClick={handleCancelClick}
                >
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={handleUpdateClick}>
                Cập nhật
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PlantDetails;
