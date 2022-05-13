import Keycloak from 'keycloak-js';
import Config from '../config.json';

const keycloak = Keycloak({
  clientId:
    process.env.REACT_APP_KEYCLOAK_CLIENT_ID ||
    Config.REACT_APP_KEYCLOAK_CLIENT_ID,
  realm:
    process.env.REACT_APP_KEYCLOAK_REALM || Config.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL || Config.REACT_APP_KEYCLOAK_URL
});

export default keycloak;
