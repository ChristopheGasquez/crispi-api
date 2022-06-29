export default {
  error: {
    authentication: {
      invalidToken: {
        status: 401,
        code: 'error.authentication.invalidToken',
        message: 'Error: Authorization on header request is invalid.'
      },
      TokenExpiredError: {
        status: 401,
        code: 'error.authentication.tokenExpiredError',
        message: 'Error: Authorization on header request is expired.'
      },
      JsonWebTokenError: {
        status: 401,
        code: 'error.authentication.jsonWebTokenError',
        message: 'Error: Authorization on header request error.'
      },
      NotBeforeError: {
        status: 401,
        code: 'error.authentication.NotBeforeError',
        message: 'Error: Authorization on header request is not active yet.'
      },
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
      },
      param: {
        objectId: {
          status: 400,
          code: 'error.param.ObjectID',
          message: 'Error: Id send on url param is not valid.'
        }
      },
      right: {
        level: {
          status: 401,
          code: 'error.ensure.right',
          message: 'Error: You do not have access to this resource.'
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
    rights: {
      create: {
        status: 201,
        code: 'success.rights.create',
        message: 'Success: Right created.'
      },
      list: {
        status: 200,
        code: 'success.rights.list',
        message: 'Success: Rights list.'
      },
      show: {
        status: 200,
        code: 'success.rights.show',
        message: 'Success: Rights show.'
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
