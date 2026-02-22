import { useEffect, useMemo, useState } from "react";
import ErrorAlert from "./components/ErrorAlert";
import { useAuth } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import AppointmentsPage from "./pages/AppointmentsPage";
import AuthPage from "./pages/AuthPage";
import CustomersPage from "./pages/CustomersPage";
import OverviewPage from "./pages/OverviewPage";
import ServicesPage from "./pages/ServicesPage";
import StaffPage from "./pages/StaffPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import {
  createAppointment,
  createCustomer,
  createService,
  createStaff,
  getAppointments,
  getCustomers,
  getOverview,
  getServices,
  getStaff,
  getSubscription,
  updateSubscription,
} from "./services/bizdeskService";
import { NAV_ITEMS } from "./utils/constants";

export default function App() {
  const { isAuthenticated, token, user, business, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [overview, setOverview] = useState(null);
  const [staff, setStaff] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "staff",
  });
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    category: "general",
    durationMin: 30,
    price: 0,
  });
  const [appointmentForm, setAppointmentForm] = useState({
    serviceId: "",
    customerId: "",
    staffId: "",
    startAt: "",
  });

  const activeTitle =
    NAV_ITEMS.find((item) => item.id === activeTab)?.label || "Dashboard";

  const fetchWorkspaceData = async () => {
    if (!token) return;
    setRefreshing(true);
    setError("");
    try {
      const [overviewRes, staffRes, customersRes, servicesRes, appointmentsRes, subRes] =
        await Promise.all([
          getOverview(token),
          getStaff(token),
          getCustomers(token),
          getServices(token),
          getAppointments(token),
          getSubscription(token),
        ]);

      setOverview(overviewRes);
      setStaff(staffRes);
      setCustomers(customersRes);
      setServices(servicesRes);
      setAppointments(appointmentsRes);
      setSubscription(subRes);
    } catch (err) {
      setError(err.message);
      if (err.message.toLowerCase().includes("token")) logout();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const submitStaff = async (event) => {
    event.preventDefault();
    try {
      await createStaff(token, staffForm);
      setStaffForm({ name: "", email: "", password: "", phone: "", role: "staff" });
      fetchWorkspaceData();
    } catch (err) {
      setError(err.message);
    }
  };

  const submitCustomer = async (event) => {
    event.preventDefault();
    try {
      await createCustomer(token, customerForm);
      setCustomerForm({ name: "", email: "", phone: "", notes: "" });
      fetchWorkspaceData();
    } catch (err) {
      setError(err.message);
    }
  };

  const submitService = async (event) => {
    event.preventDefault();
    try {
      await createService(token, serviceForm);
      setServiceForm({
        name: "",
        description: "",
        category: "general",
        durationMin: 30,
        price: 0,
      });
      fetchWorkspaceData();
    } catch (err) {
      setError(err.message);
    }
  };

  const submitAppointment = async (event) => {
    event.preventDefault();
    try {
      await createAppointment(token, appointmentForm);
      setAppointmentForm({ serviceId: "", customerId: "", staffId: "", startAt: "" });
      fetchWorkspaceData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePlanChange = async (plan) => {
    if (!subscription) return;
    try {
      await updateSubscription(token, { ...subscription, plan });
      fetchWorkspaceData();
    } catch (err) {
      setError(err.message);
    }
  };

  const activePage = useMemo(() => {
    if (activeTab === "overview") return <OverviewPage overview={overview} />;
    if (activeTab === "staff")
      return (
        <StaffPage form={staffForm} setForm={setStaffForm} onCreate={submitStaff} staff={staff} />
      );
    if (activeTab === "customers")
      return (
        <CustomersPage
          form={customerForm}
          setForm={setCustomerForm}
          onCreate={submitCustomer}
          customers={customers}
        />
      );
    if (activeTab === "services")
      return (
        <ServicesPage
          form={serviceForm}
          setForm={setServiceForm}
          onCreate={submitService}
          services={services}
        />
      );
    if (activeTab === "appointments")
      return (
        <AppointmentsPage
          form={appointmentForm}
          setForm={setAppointmentForm}
          onCreate={submitAppointment}
          appointments={appointments}
          customers={customers}
          services={services}
          staff={staff}
        />
      );
    if (activeTab === "subscription")
      return (
        <SubscriptionPage subscription={subscription} onPlanChange={handlePlanChange} />
      );
    return null;
  }, [
    activeTab,
    overview,
    staffForm,
    staff,
    customerForm,
    customers,
    serviceForm,
    services,
    appointmentForm,
    appointments,
    subscription,
  ]);

  if (!isAuthenticated) return <AuthPage />;

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onRefresh={fetchWorkspaceData}
      refreshing={refreshing}
      title={activeTitle}
      user={user}
      business={business}
      onLogout={logout}
    >
      <ErrorAlert message={error} />
      {activePage}
    </DashboardLayout>
  );
}
