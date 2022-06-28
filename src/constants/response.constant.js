export default {
  error: {
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
