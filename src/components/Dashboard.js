import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Modal, Input, Typography, message, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "../redux/slices/studentSlice";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", subject: "", marks: "" });
  const [editingRow, setEditingRow] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const { teacherId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchStudents(teacherId));
    }
  }, [teacherId, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (record) => {
    setEditingRow(record.key);
    setFormData(record);
    setEditingStudentId(record._id);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateStudent({ studentId: editingStudentId, updatedData: { ...formData, teacherId } }));
      setEditingRow(null);
    } catch (error) {
      message.error("Failed to save student");
    }
  };

  const handleDelete = async (studentId) => {
    // Optimistic update: Remove the student from the local state immediately
    const updatedStudents = students.filter((student) => student._id !== studentId);
    dispatch({ type: 'students/deleteStudent/fulfilled', payload: studentId });
    try {
      await dispatch(deleteStudent(studentId));
      message.success("Student deleted successfully");
    } catch (error) {
      message.error("Failed to delete student");
      // Re-add the student if deletion fails
      dispatch({ type: 'students/deleteStudent/rejected', payload: studentId });
    }
  };

  const handleOk = async () => {
    const dataToSend = { ...formData, teacherId };
    try {
      await dispatch(addStudent(dataToSend));
      setIsModalOpen(false);
      setFormData({ name: "", subject: "", marks: "" });
    } catch (error) {
      message.error("Failed to save student");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ name: "", subject: "", marks: "" });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input name="name" value={formData.name} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input name="subject" value={formData.subject} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      render: (text, record) =>
        editingRow === record.key ? (
          <Input name="marks" value={formData.marks} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        editingRow === record.key ? (
          <span>
            <Button onClick={handleSave} type="primary">
              Save
            </Button>
            <Button onClick={() => setEditingRow(null)} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </span>
        ) : (
          <Select
            defaultValue="action"
            onChange={(val) => {
              if (val === "edit") handleEdit(record);
              else if (val === "delete") handleDelete(record._id);
            }}
          >
            <Select.Option value="edit">Edit</Select.Option>
            <Select.Option value="delete">Delete</Select.Option>
          </Select>
        ),
    },
  ];

  return (
    <div className="mt-20 flex flex-col h-full">
      <Table
        columns={columns}
        dataSource={students.map((student, index) => ({
          ...student,
          key: index,
        }))}
        className="mx-5"
        loading={loading}
      />
      <div className="mt-8 flex justify-between">
        <Button
          size="large"
          className="mt-4 ml-5 bg-black text-white"
          danger
          onClick={() => setIsModalOpen(true)}
        >
          Add
        </Button>
      </div>

      <Modal title={"Add Student Details"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="p-5 mt-2">
          <div className="mt-2">
            <Typography.Title level={5}>Name</Typography.Title>
            <Input
              size="large"
              name="name"
              placeholder="Enter Name"
              prefix={<UserOutlined />}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <Typography.Title level={5}>Subject</Typography.Title>
            <Input
              size="large"
              name="subject"
              placeholder="Enter Subject"
              prefix={<UserOutlined />}
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <Typography.Title level={5}>Marks</Typography.Title>
            <Input
              size="large"
              name="marks"
              placeholder="Enter Marks"
              prefix={<UserOutlined />}
              value={formData.marks}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
