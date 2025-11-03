// Mock API types to simulate the original project structure
export interface Environment {
  environment_id?: string;
  latitude: number;
  longitude: number;
  elevation: number;
  date: Date;
  atmospheric_model_type: "standard_atmosphere" | "custom_atmosphere" | "forecast";
  pressure?: number;
  temperature?: number;
  wind_u?: number;
  wind_v?: number;
}

export interface Simulation {
  id?: string;
  name: string;
  environmentId?: string;
  rocketId?: string;
  motorId?: string;
  flightId?: string;
  updatedAt?: string;
}

export interface Flight {
  flight_id?: string;
  rail_length: number;
  inclination: number;
  heading: number;
}