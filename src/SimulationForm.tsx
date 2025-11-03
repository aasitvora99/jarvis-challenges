import React, { useState, useEffect } from 'react';
import { Environment, Simulation } from './types';
import { mockAPI } from './mockAPI';
import { convertUTCToLocal, convertLocalToUTC, testTimezoneConversion, formatDateForDisplay } from './timezoneUtils';

interface SimulationFormProps {
  projectId: string;
}

const SimulationForm: React.FC<SimulationFormProps> = ({ projectId }) => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  
  // Form state
  const [environmentData, setEnvironmentData] = useState<Environment>({
    latitude: 32.990254,
    longitude: -106.975056,
    elevation: 1400,
    date: new Date(), // This will be in UTC when loaded from API
    atmospheric_model_type: 'standard_atmosphere'
  });

  // Load simulations on component mount
  useEffect(() => {
    loadSimulations();
    // Run test function to show current behavior
    testTimezoneConversion();
  }, []);

  const loadSimulations = async () => {
    try {
      setIsLoading(true);
      const sims = await mockAPI.getSimulations(projectId);
      setSimulations(sims);
    } catch (error) {
      setMessage('Error loading simulations');
    } finally {
      setIsLoading(false);
    }
  };

  const loadEnvironment = async (environmentId: string) => {
    try {
      setIsLoading(true);
      const env = await mockAPI.getEnvironment(environmentId);
      if (env) {
        setSelectedEnvironment(env);
        setEnvironmentData(env);
        setMessage(`Loaded environment (UTC date: ${env.date.toISOString()})`);
      }
    } catch (error) {
      setMessage('Error loading environment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localDatetimeString = e.target.value;
    
    // 🚨 CHALLENGE: This is where the timezone conversion bug happens!
    // The user inputs a local datetime, but we need to convert it to UTC for storage
    const utcDate = convertLocalToUTC(localDatetimeString);
    
    setEnvironmentData({
      ...environmentData,
      date: utcDate
    });
    
    setMessage(`Date updated. Local input: ${localDatetimeString}, Stored as UTC: ${utcDate.toISOString()}`);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setMessage('Saving environment...');
      
      // The API expects UTC dates
      const result = await mockAPI.saveEnvironment(environmentData);
      
      setMessage(`Environment saved successfully! ID: ${result.environment_id}`);
      
      // Reload simulations to see updates
      await loadSimulations();
    } catch (error) {
      setMessage('Error saving environment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🕐 Timezone Conversion Challenge</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', border: '1px solid #0066cc', borderRadius: '5px' }}>
        <h3>📝 Challenge Instructions:</h3>
        <p><strong>Problem:</strong> Date/time values from the API are in UTC, but users need to see and edit them in their local timezone.</p>
        <p><strong>Your Task:</strong> Fix the <code>convertUTCToLocal</code> and <code>convertLocalToUTC</code> functions in <code>timezoneUtils.ts</code></p>
        <p><strong>Current Bug:</strong> The datetime input shows UTC time as if it were local time, causing timezone confusion.</p>
      </div>

      {message && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: message.includes('Error') ? '#ffe6e6' : '#e6ffe6',
          border: `1px solid ${message.includes('Error') ? '#cc0000' : '#00cc00'}`,
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h2>📋 Existing Simulations</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ marginBottom: '20px' }}>
            {simulations.map(sim => (
              <div key={sim.id} style={{ 
                margin: '10px 0', 
                padding: '15px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                backgroundColor: '#f9f9f9'
              }}>
                <h3>{sim.name}</h3>
                <p><strong>Last Updated (UTC):</strong> {sim.updatedAt}</p>
                <p><strong>Last Updated (Local):</strong> {sim.updatedAt ? formatDateForDisplay(new Date(sim.updatedAt)) : 'N/A'}</p>
                
                {sim.environmentId && (
                  <button 
                    onClick={() => loadEnvironment(sim.environmentId!)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0066cc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Load Environment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>🛠️ Environment Editor</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Launch Date and Time:
          </label>
          <input
            type="datetime-local"
            value={convertUTCToLocal(environmentData.date)} // 🚨 This is where the bug manifests!
            onChange={handleDateChange}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            <p><strong>Stored in system (UTC):</strong> {environmentData.date.toISOString()}</p>
            <p><strong>Display in local timezone:</strong> {formatDateForDisplay(environmentData.date)}</p>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Latitude:
          </label>
          <input
            type="number"
            value={environmentData.latitude}
            onChange={(e) => setEnvironmentData({
              ...environmentData,
              latitude: parseFloat(e.target.value) || 0
            })}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Longitude:
          </label>
          <input
            type="number"
            value={environmentData.longitude}
            onChange={(e) => setEnvironmentData({
              ...environmentData,
              longitude: parseFloat(e.target.value) || 0
            })}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Elevation (m):
          </label>
          <input
            type="number"
            value={environmentData.elevation}
            onChange={(e) => setEnvironmentData({
              ...environmentData,
              elevation: parseFloat(e.target.value) || 0
            })}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: isLoading ? '#ccc' : '#00cc00',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? 'Saving...' : 'Save Environment'}
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #856404', borderRadius: '5px' }}>
        <h3>🧪 Testing Your Solution:</h3>
        <ol>
          <li>Open browser dev tools console to see timezone conversion logs</li>
          <li>Load an environment from the simulations above</li>
          <li>Notice the datetime input shows the wrong time (UTC time displayed as local)</li>
          <li>Modify the date/time in the input field</li>
          <li>Save and check console logs to see what the API receives</li>
          <li>The API should receive the correct UTC time corresponding to your local input</li>
        </ol>
        <p><strong>Success criteria:</strong> When you select a time in the input, that same time should be what you intended in your local timezone, and the API should receive the corresponding UTC time.</p>
      </div>
    </div>
  );
};

export default SimulationForm;