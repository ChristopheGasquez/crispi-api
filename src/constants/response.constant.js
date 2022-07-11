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
      properties: {
        status: 404,
        code: 'error.ensure.properties',
        message: `Error: One or more properties generate an error. See 'meta' on response.`
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
    },
    rights: {
      alreadyExists: {
        status: 409,
        code: 'error.rights.alreadyExists',
        message: 'Error: This right is already exists.'
      },
      alreadyUsed: {
        status: 409,
        code: 'error.rights.alreadyUsed',
        message: 'Error: This right is already used.'
      },
      insufficientIssuerLevel: {
        status: 401,
        code: 'error.rights.insufficientIssuerLevel',
        message: 'Error: Your level access is insufficient.'
      }
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
    credentials: {
      list: {
        status: 200,
        code: 'success.credentials.list',
        message: 'Success: Credentials list.'
      },
      remove: {
        status: 200,
        code: 'success.credentials.remove',
        message: 'Success: Credentials removed.'
      },
      show: {
        status: 200,
        code: 'success.credentials.show',
        message: 'Success: Credentials show.'
      },
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
      remove: {
        status: 200,
        code: 'success.rights.remove',
        message: 'Success: Rights removed.'
      },
      show: {
        status: 200,
        code: 'success.rights.show',
        message: 'Success: Rights show.'
      },
      update: {
        status: 200,
        code: 'success.rights.update',
        message: 'Success: Rights updated.'
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
