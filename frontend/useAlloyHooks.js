import axios from "axios";
import { useState } from "react";
import Alloy from "alloy-frontend";

const useAlloyHooks = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [OAuthUrl, setOAuthURL] = useState();
  const [credentialId, setCredentialId] = useState();
  const [integrations, setIntegrations] = useState();
  const [shopSubdomain, setShopSubdomain] = useState("");
  const [integrationId, setIntegrationId] = useState(
    "665d974f8466237167bbc4ba"
  );
  const [msg, setMsg] = useState("");

  const alloy = Alloy();

  const BACKEND_SERVER_BASE_URL = "http://localhost:3000";

  const createUser = async () => {
    try {
      setErrorMsg("");
      setLoading(true);

      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/create-user`,
        { username: `user_${Math.floor(Math.random() * 10000)}` } // Generate a random username
      );

      const { userId } = response.data;
      setUserId(userId);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getIntegrations = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/integrations?userId=${userId}`
      );

      setIntegrations(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAuthFields = async () => {
    try {
      setErrorMsg("");
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth-fields?appName=shopify`
      );

      setFields(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getOAuthUrl = async () => {
    try {
      setErrorMsg("");
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/oauthurl?userId=${userId}&appName=shopify&shopSubdomain=${shopSubdomain}`
      );
      setOAuthURL(response.data.data);
      document.getElementById("my_modal_2").removeAttribute("open");
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCredentialId = async () => {
    try {
      setErrorMsg("");
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/credentialid?userId=${userId}`
      );

      setCredentialId(response.data.data[0].credentialId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getInstallationlIdAndCompleteInstallation = async () => {
    try {
      const installationIdRes = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/startinstallation`,
        { userId, credentialId, integrationId }
      );

      const installationId = installationIdRes.data.installationId;

      const completeInstallationRes = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/completeinstallation`,
        { installationId }
      );

      setMsg(completeInstallationRes.data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleShopSubdomainInput = (e) => {
    setShopSubdomain(e.target.value);
  };
  return {
    createUser,
    getIntegrations,
    getAuthFields,
    getOAuthUrl,
    getCredentialId,
    getInstallationlIdAndCompleteInstallation,
    handleShopSubdomainInput,
    shopSubdomain,
    msg,
    OAuthUrl,
    credentialId,
    userId,
    integrations,
    fields,
  };
};

export default useAlloyHooks;
