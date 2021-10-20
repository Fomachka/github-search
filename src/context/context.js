import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setGithubRepos] = useState(mockRepos);
  const [followers, setGithubFollowers] = useState(mockFollowers);
  const [request, setRequest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((error) => console.log(error));
    console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        console.log(results);
        const [repos, followers] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setGithubRepos(repos.value.data);
        }
        if (followers.status === status) {
          setGithubFollowers(followers.value.data);
        }
      });
    } else {
      toggleError(true, "there is no user found with that username");
    }
    checkRequest();
    setIsLoading(false);
  };

  const checkRequest = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        console.log(data);
        setRequest(remaining);
        if (remaining === 0) {
          //throw an error
          toggleError(
            true,
            "sorry, you have exceeded your hourly access limit!"
          );
        }
      })
      .catch((error) => console.error(error));
  };

  const toggleError = (show = false, message = "") => {
    setError({ show, message });
  };

  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
