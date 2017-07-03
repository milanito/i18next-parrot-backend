export default {
  tokenPath: '/api/v1/auth/token',
  translationPath: '/api/v1/projects/{{project_id}}/locales/{{locale}}/export/keyvaluejson',
  auth: {
    grant_type: 'client_credentials'
  }
};
