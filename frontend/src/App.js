import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Routes>
                {/* Redirect to /events if the user is authenticated */}
                {this.state.token && <Route path="/" element={<Navigate to="/events" replace />} />}
                {this.state.token && <Route path="/auth" element={<Navigate to="/events" replace />} />}

                {/* Route to auth page if not authenticated */}
                {!this.state.token && <Route path="/auth" element={<AuthPage />} />}

                {/* Public route to events */}
                <Route path="/events" element={<EventsPage />} />

                {/* Protected route to bookings */}
                {this.state.token && <Route path="/bookings" element={<BookingsPage />} />}

                {/* Redirect unauthenticated users to /auth */}
                {!this.state.token && <Route path="*" element={<Navigate to="/auth" replace />} />}
              </Routes>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
