import { Environment, Simulation } from './types';

// Mock API that simulates the backend behavior
// All dates from the API are in UTC format
export class MockAPI {
  private simulations: Simulation[] = [
    {
      id: '1',
      name: 'Test Simulation 1',
      environmentId: 'env1',
      updatedAt: '2025-11-03T10:30:00.000Z', // UTC time
    },
    {
      id: '2', 
      name: 'Test Simulation 2',
      environmentId: 'env2',
      updatedAt: '2025-11-02T15:45:00.000Z', // UTC time
    }
  ];

  private environments: Environment[] = [
    {
      environment_id: 'env1',
      latitude: 32.990254,
      longitude: -106.975056,
      elevation: 1400,
      date: new Date('2025-12-15T14:00:00.000Z'), // UTC time
      atmospheric_model_type: 'standard_atmosphere'
    },
    {
      environment_id: 'env2',
      latitude: 28.573469,
      longitude: -80.651070,
      elevation: 3,
      date: new Date('2025-12-20T18:30:00.000Z'), // UTC time
      atmospheric_model_type: 'custom_atmosphere',
      pressure: 101325,
      temperature: 288.15
    }
  ];

  // Simulate API delay
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get simulations for a project
  async getSimulations(projectId: string): Promise<Simulation[]> {
    await this.delay(500);
    return this.simulations;
  }

  // Get environment by ID - returns UTC dates
  async getEnvironment(environmentId: string): Promise<Environment | null> {
    await this.delay(300);
    return this.environments.find(env => env.environment_id === environmentId) || null;
  }

  // Save environment - expects UTC dates
  async saveEnvironment(environment: Environment): Promise<{ environment_id: string }> {
    await this.delay(800);
    
    // Log what the API receives (should be UTC)
    console.log('API received environment data:', {
      ...environment,
      date: environment.date.toISOString()
    });

    const environmentId = environment.environment_id || `env_${Date.now()}`;
    
    // Update or create environment
    const existingIndex = this.environments.findIndex(env => env.environment_id === environmentId);
    if (existingIndex >= 0) {
      this.environments[existingIndex] = { ...environment, environment_id: environmentId };
    } else {
      this.environments.push({ ...environment, environment_id: environmentId });
    }

    return { environment_id: environmentId };
  }

  // Update simulation timestamp - uses UTC
  async updateSimulation(simulationId: string, data: Partial<Simulation>): Promise<void> {
    await this.delay(300);
    
    const simulation = this.simulations.find(sim => sim.id === simulationId);
    if (simulation) {
      Object.assign(simulation, data);
      simulation.updatedAt = new Date().toISOString(); // UTC timestamp
    }
  }
}

export const mockAPI = new MockAPI();