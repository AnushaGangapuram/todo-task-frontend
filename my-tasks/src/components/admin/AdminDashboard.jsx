import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { taskService } from "../../services/taskService";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await userService.getAllUsers();
        const taskList = await taskService.getAllTasks();
        setUsers(userList);
        setTasks(taskList);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center text-primary fw-bold">Admin Dashboard</h2>

      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {!loading && !error && (
        <>
          {/* ✅ Overview Cards */}
          <Row className="mb-4">
            {[
              { label: "Total Users", value: users.length, variant: "primary" },
              { label: "Total Tasks", value: tasks.length, variant: "success" },
              { label: "Active Users", value: users.filter((u) => u.enabled).length, variant: "info" },
            ].map((item, index) => (
              <Col key={index} md={4} className="mb-3">
                <Card className="shadow border-0 text-center">
                  <Card.Body>
                    <Card.Title className={`text-${item.variant} fw-bold`}>{item.label}</Card.Title>
                    <h2 className="fw-bold text-dark">{item.value}</h2>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ✅ Recent Users Table */}
          <Row>
            <Col md={12}>
              <Card className="shadow border-0">
                <Card.Header className="bg-primary text-white text-center fw-bold">Recent Users</Card.Header>
                <Card.Body>
                  <Table responsive striped bordered hover className="mb-0 text-center">
                    <thead className="bg-light">
                      <tr>
                        <th className="fw-bold">Username</th>
                        <th className="fw-bold">Email</th>
                        <th className="fw-bold">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 5).map((u) => (
                        <tr key={u.id}>
                          <td>{u.username}</td>
                          <td>{u.email}</td>
                          <td className={`fw-bold ${u.roles[0]?.rolename === "ADMIN" ? "text-primary" : "text-success"}`}>
                            {u.roles[0]?.rolename || "USER"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
