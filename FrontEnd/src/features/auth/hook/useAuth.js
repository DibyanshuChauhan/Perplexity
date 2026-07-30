/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { login, register, getMe, logout, resendVerification } from "../service/auth.api";
import { setUser, setLoading, setError, setAuthChecked, logoutSuccess, registerSuccess } from "../auth.slice";

export const useAuth = () => {
    const dispatch = useDispatch();

const handleRegister = async (payload) => {
    dispatch(setLoading(true));
    try {
        const response = await register(payload);
        dispatch(registerSuccess(response.user));
        return response; // CRITICAL: Return response so the form component can catch it
    } catch (error) {
        dispatch(setError(error.response?.data?.message || "Registration failed"));
        throw error; // CRITICAL: Re-throw error so the component's catch block executes
    } finally {
        dispatch(setLoading(false));
    }
};

    const handleLogin = async ({ email, password }) => {
    try {
        dispatch(setLoading(true));

        const data = await login({ email, password });

        dispatch(setUser(data.user));

        return data;
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || "Login failed"
            )
        );

        // VERY IMPORTANT
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

  const handleGetMe = async () => {
  try {
    dispatch(setLoading(true));

    const data = await getMe();

    dispatch(setUser(data.user));
  } catch (error) {
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
    dispatch(setAuthChecked(true));
  }
};

const handleLogout = async () => {
    try {
      // 1. Fire API request to backend to destroy the HttpOnly token cookie
      await logout();
      
      // 2. Clear browser session persistence storage locks
      localStorage.removeItem("active_chat_id");
      
      // 3. Wipe the Redux state profile
      dispatch(logoutSuccess());
      
      // 4. Cleanly force redirect the browser viewport back to login route
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout runtime sequence execution failure:", error);
    }
  };

const handleResendVerification = async (email) => {
    try {
        dispatch(setLoading(true));
        const data = await resendVerification({ email });
        return data;
    } catch (error) {
        dispatch(setError(error.response?.data?.message || "Failed to dispatch email"));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleResendVerification,
        handleLogout,
    }

}