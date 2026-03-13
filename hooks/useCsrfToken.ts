import { useState, useEffect, useCallback } from "react";

interface CsrfState {
  token: string | null;
  expiresAt: number | null;
  loading: boolean;
  error: string | null;
}

export function useCsrfToken() {
  const [state, setState] = useState<CsrfState>({
    token: null,
    expiresAt: null,
    loading: true,
    error: null,
  });

  const fetchToken = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const res = await fetch("/api/csrf");

      if (!res.ok) {
        if (res.status === 401) {
          // Not authenticated - will be handled by middleware
          setState((prev) => ({ ...prev, loading: false, token: null }));
          return;
        }
        throw new Error("Failed to fetch CSRF token");
      }

      const data = await res.json();
      setState({
        token: data.csrfToken,
        expiresAt: data.expiresAt,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch CSRF token",
      }));
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // Refresh token if it's about to expire (within 5 minutes)
  useEffect(() => {
    if (!state.expiresAt) return;

    const timeUntilExpiry = state.expiresAt - Date.now();
    const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0);

    if (refreshTime <= 0) {
      fetchToken();
      return;
    }

    const timeout = setTimeout(fetchToken, refreshTime);
    return () => clearTimeout(timeout);
  }, [state.expiresAt, fetchToken]);

  const getHeaders = useCallback(
    (headers: Record<string, string> = {}) => {
      if (!state.token) {
        return headers;
      }
      return {
        ...headers,
        "X-CSRF-Token": state.token,
      };
    },
    [state.token]
  );

  return {
    csrfToken: state.token,
    csrfLoading: state.loading,
    csrfError: state.error,
    getCsrfHeaders: getHeaders,
    refreshCsrfToken: fetchToken,
  };
}
