import { apiRequest } from "./api";

export const login = async (credentials) => {
  const res = await apiRequest("/auth/login", {
    method: "POST",
    body: credentials,
  });
  return res.data;
};

export const registerBusiness = async (payload) => {
  const res = await apiRequest("/auth/register-business", {
    method: "POST",
    body: payload,
  });
  return res.data;
};

export const getOverview = async (token) => {
  const res = await apiRequest("/dashboard/overview", { token });
  return res.data;
};

export const getStaff = async (token) => {
  const res = await apiRequest("/staff", { token });
  return res.data || [];
};

export const createStaff = async (token, payload) => {
  const res = await apiRequest("/staff", { method: "POST", token, body: payload });
  return res.data;
};

export const getCustomers = async (token) => {
  const res = await apiRequest("/customers", { token });
  return res.data || [];
};

export const createCustomer = async (token, payload) => {
  const res = await apiRequest("/customers", {
    method: "POST",
    token,
    body: payload,
  });
  return res.data;
};

export const getServices = async (token) => {
  const res = await apiRequest("/services", { token });
  return res.data || [];
};

export const createService = async (token, payload) => {
  const res = await apiRequest("/services", {
    method: "POST",
    token,
    body: payload,
  });
  return res.data;
};

export const getAppointments = async (token) => {
  const res = await apiRequest("/appointments", { token });
  return res.data || [];
};

export const createAppointment = async (token, payload) => {
  const res = await apiRequest("/appointments", {
    method: "POST",
    token,
    body: payload,
  });
  return res.data;
};

export const getSubscription = async (token) => {
  const res = await apiRequest("/subscription", { token });
  return res.data;
};

export const updateSubscription = async (token, payload) => {
  const res = await apiRequest("/subscription", {
    method: "PUT",
    token,
    body: payload,
  });
  return res.data;
};
