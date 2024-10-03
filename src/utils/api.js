const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  let _accessToken = null;

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function getAccessToken() {
    if (_accessToken == null) {
      _accessToken = localStorage.getItem("accessToken");
    }
    return _accessToken;
  }

  function putAccessToken(accessToken) {
    _accessToken = null;
    return localStorage.setItem("accessToken", accessToken);
  }

  function logout() {
    putAccessToken(null);
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.token;
  }

  async function register({ email, name, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.user;
  }

  async function getProfile() {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.users;
  }

  async function getThreads() {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.threads;
  }

  async function createThread({ title, body, category }) {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, category }),
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.thread;
  }

  async function upVoteThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.vote };
  }

  async function downVoteThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.vote };
  }

  async function neutralizeVoteThread(threadId) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.vote };
  }

  async function getThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.detailThread };
  }

  async function postComment({ threadId, content }) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.comment };
  }

  async function upVoteComment({ threadId, commentId }) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.vote };
  }

  async function downVoteComment({ threadId, commentId }) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.vote };
  }

  async function neutralizeVoteComment({ threadId, commentId }) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return { ...json.data.vote };
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    return json.data.leaderboards;
  }

  return {
    putAccessToken,
    login,
    register,
    logout,
    getProfile,
    getAllUsers,
    createThread,
    getThreads,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    getThread,
    postComment,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
