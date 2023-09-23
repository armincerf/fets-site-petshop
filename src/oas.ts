/* eslint-disable */ export default {
  servers: [
    {
      url: 'https://data.home.juxt.site/petstore'
    }
  ],
  info: {
    license: {
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      name: 'Apache 2.0'
    },
    title: 'Swagger Petstore - OpenAPI 3.0',
    termsOfService: 'http://swagger.io/terms/',
    version: '1.0.17',
    contact: {
      email: 'apiteam@swagger.io'
    },
    description:
      "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!\nYou can now help us improve the API whether it's by making changes to the definition itself or to the code.\nThat way, with time, we can improve the API in general, and expose some of the new features in OAS3.\n\nSome useful links:\n- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)\n- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)"
  },
  tags: [
    {
      externalDocs: {
        url: 'http://swagger.io',
        description: 'Find out more'
      },
      name: 'pet',
      description: 'Everything about your Pets'
    },
    {
      externalDocs: {
        url: 'http://swagger.io',
        description: 'Find out more about our store'
      },
      name: 'store',
      description: 'Access to Petstore orders'
    },
    {
      name: 'user',
      description: 'Operations about user'
    }
  ],
  externalDocs: {
    url: 'http://swagger.io',
    description: 'Find out more about Swagger'
  },
  paths: {
    '/pet/{petId}/uploadImage': {
      post: {
        operationId: 'uploadFile',
        description: '',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse'
                }
              }
            },
            description: 'successful operation'
          }
        },
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        tags: ['pet'],
        summary: 'uploads an image',
        requestBody: {
          content: {
            'application/octet-stream': {
              schema: {
                type: 'string',
                format: 'binary'
              }
            }
          }
        },
        parameters: [
          {
            schema: {
              type: 'integer',
              format: 'int64'
            },
            name: 'petId',
            required: true,
            description: 'ID of pet to update',
            in: 'path'
          },
          {
            schema: {
              type: 'string'
            },
            name: 'additionalMetadata',
            required: false,
            description: 'Additional Metadata',
            in: 'query'
          }
        ]
      }
    },
    '/store/order': {
      post: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/order/place',
        description: 'Place a new order in the store',
        security: [
          {
            oauth: ['https://auth.home.juxt.site/scopes/petstore/write']
          }
        ],
        responses: {
          '405': {
            description: 'Invalid input'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['store'],
        summary: 'Place an order for a pet',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Order'
              }
            }
          }
        }
      }
    },
    '/user/logout': {
      get: {
        operationId: 'logoutUser',
        description: '',
        responses: {
          default: {
            description: 'successful operation'
          }
        },
        tags: ['user'],
        summary: 'Logs out current logged in user session',
        parameters: []
      }
    },
    '/store/inventory': {
      get: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/order/inventory',
        description: 'Returns a map of status codes to quantities',
        security: [
          {
            api_key: []
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  additionalProperties: {
                    type: 'integer',
                    format: 'int32'
                  }
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['store'],
        summary: 'Returns pet inventories by status'
      }
    },
    '/user/createWithList': {
      post: {
        operationId: 'createUsersWithListInput',
        description: 'Creates list of users with given input array',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            },
            description: 'Successful operation'
          },
          default: {
            description: 'successful operation'
          }
        },
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                items: {
                  $ref: '#/components/schemas/User'
                },
                type: 'array'
              }
            }
          }
        }
      }
    },
    '/user/{username}': {
      delete: {
        operationId: 'deleteUser',
        description: 'This can only be done by the logged in user.',
        responses: {
          '404': {
            description: 'User not found'
          },
          '400': {
            description: 'Invalid username supplied'
          }
        },
        tags: ['user'],
        summary: 'Delete user',
        parameters: [
          {
            schema: {
              type: 'string'
            },
            name: 'username',
            required: true,
            description: 'The name that needs to be deleted',
            in: 'path'
          }
        ]
      },
      put: {
        operationId: 'updateUser',
        description: 'This can only be done by the logged in user.',
        responses: {
          default: {
            description: 'successful operation'
          }
        },
        tags: ['user'],
        summary: 'Update user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          },
          description: 'Update an existent user in the store'
        },
        parameters: [
          {
            schema: {
              type: 'string'
            },
            name: 'username',
            required: true,
            description: 'name that need to be deleted',
            in: 'path'
          }
        ]
      },
      get: {
        operationId: 'getUserByName',
        description: '',
        responses: {
          '404': {
            description: 'User not found'
          },
          '400': {
            description: 'Invalid username supplied'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['user'],
        summary: 'Get user by user name',
        parameters: [
          {
            schema: {
              type: 'string'
            },
            name: 'username',
            required: true,
            description:
              'The name that needs to be fetched. Use user1 for testing. ',
            in: 'path'
          }
        ]
      }
    },
    '/pet/{petId}': {
      delete: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/delete-pet-by-id',
        description: '',
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        responses: {
          '204': {
            description: 'Pet deleted'
          },
          '400': {
            description: 'Invalid pet value'
          }
        },
        tags: ['pet'],
        summary: 'Deletes a pet',
        parameters: [
          {
            schema: {
              type: 'string'
            },
            name: 'api_key',
            required: false,
            description: '',
            in: 'header'
          },
          {
            schema: {
              type: 'string'
            },
            name: 'petId',
            required: true,
            description: 'Pet id to delete',
            in: 'path'
          }
        ]
      },
      post: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/update-pet-by-id',
        description: '',
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        responses: {
          '405': {
            description: 'Invalid input'
          }
        },
        tags: ['pet'],
        summary: 'Updates a pet in the store with form data',
        parameters: [
          {
            schema: {
              type: 'integer',
              format: 'int64'
            },
            name: 'petId',
            required: true,
            description: 'ID of pet that needs to be updated',
            in: 'path'
          },
          {
            schema: {
              type: 'string'
            },
            name: 'name',
            description: 'Name of pet that needs to be updated',
            in: 'query'
          },
          {
            schema: {
              type: 'string'
            },
            name: 'status',
            description: 'Status of pet that needs to be updated',
            in: 'query'
          }
        ]
      },
      get: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/get-pet-by-id',
        description: 'Returns a single pet',
        security: [
          {
            api_key: []
          },
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        responses: {
          '404': {
            description: 'Pet not found'
          },
          '400': {
            description: 'Invalid ID supplied'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['pet'],
        summary: 'Find pet by ID',
        parameters: [
          {
            schema: {
              type: 'integer',
              format: 'int64'
            },
            name: 'petId',
            required: true,
            description: 'ID of pet to return',
            in: 'path'
          }
        ]
      }
    },
    '/pet/findByStatus': {
      get: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/find-by-status',
        description:
          'Multiple status values can be provided with comma separated strings',
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        responses: {
          '400': {
            description: 'Invalid status value'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/Pet'
                  },
                  type: 'array'
                }
              },
              'application/xml': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/Pet'
                  },
                  type: 'array'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['pet'],
        summary: 'Finds Pets by status',
        parameters: [
          {
            schema: {
              type: 'string',
              default: 'available',
              enum: ['unavailable', 'available', 'pending', 'sold']
            },
            name: 'status',
            explode: true,
            required: false,
            description: 'Status values that need to be considered for filter',
            in: 'query'
          }
        ]
      }
    },
    '/pets': {
      get: {
        operationId: 'https://auth.home.juxt.site/operations/petstore/all-pets',
        description: 'Finds All Pets in DB',
        security: [
          {
            petstore_auth: ['read:pets']
          }
        ],
        responses: {
          '401': {
            description: 'Unauthorized'
          },
          '400': {
            description: 'Invalid status value'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/Pet'
                  },
                  type: 'array'
                }
              },
              'application/xml': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/Pet'
                  },
                  type: 'array'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['pet'],
        summary: 'Finds All Pets in DB'
      }
    },
    '/pet/findByTags': {
      get: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/find-by-tags',
        description:
          'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
        responses: {
          '400': {
            description: 'Invalid tag value'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/Pet'
                  },
                  type: 'array'
                }
              },
              'application/xml': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/Pet'
                  },
                  type: 'array'
                }
              }
            },
            description: 'successful operation'
          }
        },
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        tags: ['pet'],
        summary: 'Finds Pets by tags',
        parameters: [
          {
            schema: {
              items: {
                type: 'string'
              },
              type: 'array'
            },
            name: 'tags',
            explode: true,
            required: false,
            description: 'Tags to filter by',
            in: 'query'
          }
        ]
      }
    },
    '/pet': {
      put: {
        operationId: 'updatePet',
        description: 'Update an existing pet by Id',
        responses: {
          '404': {
            description: 'Pet not found'
          },
          '405': {
            description: 'Validation exception'
          },
          '400': {
            description: 'Invalid ID supplied'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            },
            description: 'Successful operation'
          }
        },
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        tags: ['pet'],
        summary: 'Update an existing pet',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          },
          required: true,
          description: 'Update an existent pet in the store'
        }
      },
      post: {
        operationId: 'https://auth.home.juxt.site/operations/petstore/add-pet',
        description: 'Add a new pet to the store',
        security: [
          {
            petstore_auth: ['write:pets', 'read:pets']
          }
        ],
        responses: {
          '405': {
            description: 'Invalid input'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            },
            description: 'Successful operation'
          }
        },
        tags: ['pet'],
        summary: 'Add a new pet to the store',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          },
          required: true,
          description: 'Create a new pet in the store'
        }
      }
    },
    '/user/login': {
      get: {
        operationId: 'loginUser',
        description: '',
        responses: {
          '400': {
            description: 'Invalid username/password supplied'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'string'
                }
              },
              'application/xml': {
                schema: {
                  type: 'string'
                }
              }
            },
            description: 'successful operation',
            headers: {
              'X-Rate-Limit': {
                schema: {
                  type: 'integer',
                  format: 'int32'
                },
                description: 'calls per hour allowed by the user'
              },
              'X-Expires-After': {
                schema: {
                  type: 'string',
                  format: 'date-time'
                },
                description: 'date in UTC when token expires'
              }
            }
          }
        },
        tags: ['user'],
        summary: 'Logs user into the system',
        parameters: [
          {
            schema: {
              type: 'string'
            },
            name: 'username',
            required: false,
            description: 'The user name for login',
            in: 'query'
          },
          {
            schema: {
              type: 'string'
            },
            name: 'password',
            required: false,
            description: 'The password for login in clear text',
            in: 'query'
          }
        ]
      }
    },
    '/user': {
      post: {
        operationId: 'createUser',
        description: 'This can only be done by the logged in user.',
        responses: {
          default: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['user'],
        summary: 'Create user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          },
          description: 'Created user object'
        }
      }
    },
    '/store/order/{orderId}': {
      delete: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/order/delete-by-id',
        description:
          'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
        security: [
          {
            oauth: ['https://auth.home.juxt.site/scopes/petstore/write']
          }
        ],
        responses: {
          '404': {
            description: 'Order not found'
          },
          '400': {
            description: 'Invalid ID supplied'
          }
        },
        tags: ['store'],
        summary: 'Delete purchase order by ID',
        parameters: [
          {
            schema: {
              type: 'integer',
              format: 'int64'
            },
            name: 'orderId',
            required: true,
            description: 'ID of the order that needs to be deleted',
            in: 'path'
          }
        ]
      },
      get: {
        operationId:
          'https://auth.home.juxt.site/operations/petstore/order/get-by-id',
        description:
          'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
        security: [
          {
            oauth: ['https://auth.home.juxt.site/scopes/petstore/read']
          }
        ],
        responses: {
          '404': {
            description: 'Order not found'
          },
          '400': {
            description: 'Invalid ID supplied'
          },
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            },
            description: 'successful operation'
          }
        },
        tags: ['store'],
        summary: 'Find purchase order by ID',
        parameters: [
          {
            schema: {
              type: 'integer',
              format: 'int64'
            },
            name: 'orderId',
            required: true,
            description: 'ID of order that needs to be fetched',
            in: 'path'
          }
        ]
      }
    }
  },
  openapi: '3.0.2',
  components: {
    schemas: {
      Address: {
        properties: {
          city: {
            example: 'Palo Alto',
            type: 'string'
          },
          state: {
            example: 'CA',
            type: 'string'
          },
          street: {
            example: '437 Lytton',
            type: 'string'
          },
          zip: {
            example: '94301',
            type: 'string'
          }
        },
        xml: {
          name: 'address'
        },
        type: 'object'
      },
      Order: {
        properties: {
          shipDate: {
            type: 'string',
            format: 'date-time'
          },
          complete: {
            type: 'boolean'
          },
          petId: {
            example: 198772,
            type: 'integer',
            format: 'int64'
          },
          id: {
            example: 'f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0',
            type: 'string',
            format: 'int64'
          },
          quantity: {
            example: 7,
            type: 'integer',
            format: 'int32'
          },
          status: {
            example: 'approved',
            type: 'string',
            description: 'Order Status',
            enum: ['placed', 'approved', 'delivered']
          }
        },
        xml: {
          name: 'order'
        },
        type: 'object'
      },
      Category: {
        properties: {
          id: {
            example: 'f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0',
            type: 'string',
            format: 'int64'
          },
          name: {
            example: 'Dogs',
            type: 'string'
          }
        },
        xml: {
          name: 'category'
        },
        type: 'object'
      },
      Customer: {
        properties: {
          username: {
            example: 'fehguy',
            type: 'string'
          },
          id: {
            example: 'd60587d0-e96c-4d2c-8351-76c0f18c3c58',
            type: 'string',
            format: 'int64'
          },
          address: {
            xml: {
              name: 'addresses',
              wrapped: true
            },
            items: {
              $ref: '#/components/schemas/Address'
            },
            type: 'array'
          }
        },
        xml: {
          name: 'customer'
        },
        type: 'object'
      },
      User: {
        properties: {
          userStatus: {
            example: 1,
            type: 'integer',
            description: 'User Status',
            format: 'int32'
          },
          username: {
            example: 'theUser',
            type: 'string'
          },
          lastName: {
            example: 'James',
            type: 'string'
          },
          id: {
            example: 'f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0',
            type: 'string',
            format: 'int64'
          },
          email: {
            example: 'john@email.com',
            type: 'string'
          },
          firstName: {
            example: 'John',
            type: 'string'
          },
          phone: {
            example: '12345',
            type: 'string'
          },
          password: {
            example: '12345',
            type: 'string'
          }
        },
        xml: {
          name: 'user'
        },
        type: 'object'
      },
      Tag: {
        properties: {
          id: {
            type: 'string',
            format: 'int64'
          },
          name: {
            type: 'string'
          }
        },
        xml: {
          name: 'tag'
        },
        type: 'object'
      },
      Pet: {
        properties: {
          photoUrls: {
            xml: {
              wrapped: true
            },
            items: {
              xml: {
                name: 'photoUrl'
              },
              type: 'string'
            },
            type: 'array'
          },
          tags: {
            xml: {
              wrapped: true
            },
            items: {
              $ref: '#/components/schemas/Tag'
            },
            type: 'array'
          },
          id: {
            example: 'f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0',
            type: 'string',
            format: 'int64'
          },
          name: {
            example: 'doggie',
            type: 'string'
          },
          status: {
            type: 'string',
            description: 'pet status in the store',
            enum: ['unavailable', 'available', 'pending', 'sold']
          },
          category: {
            $ref: '#/components/schemas/Category'
          }
        },
        xml: {
          name: 'pet'
        },
        required: ['name', 'photoUrls'],
        type: 'object'
      },
      ApiResponse: {
        properties: {
          message: {
            type: 'string'
          },
          type: {
            type: 'string'
          },
          code: {
            type: 'integer',
            format: 'int32'
          }
        },
        xml: {
          name: '##default'
        },
        type: 'object'
      }
    },
    requestBodies: {
      UserArray: {
        content: {
          'application/json': {
            schema: {
              items: {
                $ref: '#/components/schemas/User'
              },
              type: 'array'
            }
          }
        },
        description: 'List of user object'
      },
      Pet: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          },
          'application/xml': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        },
        description: 'Pet object that needs to be added to the store'
      }
    }
  }
} as const
