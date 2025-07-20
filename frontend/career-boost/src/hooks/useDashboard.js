import { useState, useCallback } from "react";
import { useUser } from "../context/userContext";

export const useDashboard = () => {
  const { user, isAuthenticated } = useUser();
  const [activities, setActivities] = useState([]);

  const handleQuickAction = useCallback((actionId) => {
    // Handle navigation or action based on actionId
    switch (actionId) {
      case 'cv-builder':
        // Navigate to CV builder
        console.log('Navigate to CV builder');
        break;
      case 'interview-prep':
        // Navigate to interview prep
        console.log('Navigate to interview prep');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  }, []);

  const addActivity = useCallback((activity) => {
    setActivities(prev => [activity, ...prev]);
  }, []);

  return {
    user,
    isAuthenticated,
    activities,
    handleQuickAction,
    addActivity
  };
};