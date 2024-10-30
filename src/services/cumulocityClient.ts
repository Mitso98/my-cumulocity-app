import { BasicAuth, Client, MeasurementService, Realtime } from '@c8y/client';

// Read environment variables
const baseUrl = import.meta.env.VITE_C8Y_BASEURL;
const tenant = import.meta.env.VITE_C8Y_TENANT;
const user = import.meta.env.VITE_C8Y_USER;
const password = import.meta.env.VITE_C8Y_PASSWORD;

// Configure basic authentication
const auth = new BasicAuth({
  user,
  password,
  tenant
});

// Initialize the client
const client = new Client(auth, baseUrl);

export const measurment = new MeasurementService(client.core);

export default client;
