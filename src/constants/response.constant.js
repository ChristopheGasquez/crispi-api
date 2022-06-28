export default {
  error: {
    authentication: {
      invalidToken: {
        status: 401,
        code: 'error.authentication.invalidToken',
        message: 'Error: Authorization on header request is invalid.'
      },
      expiredToken: {
        status: 401,
        code: 'error.authentication.expiredToken',
        message: 'Error: Authorization on header request is expired.'
      }
    },
    server: {
      unknown: {
        status: 500,
        code: 'error.server.unknown',
        message: 'Error: An error occurred.'
      }
    },
    ensure: {
      body: {
        property: {
          status: 400,
          code: 'error.body.property',
          message: 'Error: A property is missing on body request.'
        }
      },
      header: {
        authorization: {
          status: 401,
          code: 'error.header.authorization',
          message: 'Error: \'Authorization\' field is missing on header request.'
        },
        property: {
          status: 400,
          code: 'error.header.property',
          message: 'Error: A property is missing on header request.'
        }
      }
    },
    notFound: {
      status: 404,
      code: 'error.notFound',
      message: 'Error: Resource not found.'
    }
  },
  success: {
    authentication: {
      login: {
        status: 201,
        code: 'success.authentication.login',
        message: 'Success: Login.'
      },
      logout: {
        status: 200,
        code: 'success.authentication.logout',
        message: 'Success: Logout.'
      },
      refresh: {
        status: 200,
        code: 'success.authentication.refresh',
        message: 'Success: Refresh.'
      }
    },
    server: {
      enable: {
        status: 200,
        code: 'success.server.enable',
        message: 'Success: Server enable.'
      }
    }
  },
};
