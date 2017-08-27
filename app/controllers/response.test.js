/**
 * Request Data Controller Module tests
 */
const chai = require('chai');
const { mockRes } = require('sinon-express-mock');
const { sendSuccess, sendError } = require('./response');

const expect = chai.expect;

describe('#response', function() {

  beforeEach(function() {
    responseMock = mockRes();
  });

  describe('sendSuccess @unit', function() {

    describe('with an empty response data array', function() {
      const emptyResponseDataArrayObject = { data: [] };

      describe('without response code', function() {

        it('sends 200 response successfully', function() {
          const defaultResponseCode = 200;
          sendSuccess(responseMock, emptyResponseDataArrayObject);
          expect(responseMock.status.calledWith(defaultResponseCode));
          expect(responseMock.send.calledWith(emptyResponseDataArrayObject));
        });
      });

      describe('with response code', function() {

        it('sends 200 response successfully', function() {
          const responseCode = 200;
          sendSuccess(responseMock, emptyResponseDataArrayObject, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(emptyResponseDataArrayObject));
        });

        it('sends 201 response successfully', function() {
          const responseCode = 201;
          sendSuccess(responseMock, emptyResponseDataArrayObject, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(emptyResponseDataArrayObject));
        });
      });
    });

    describe('with an integer array response data array', function() {
      const integerResponseDataArrayObject = { data: [1, 2, 3] };

      describe('without response code', function() {

        it('sends 200 response successfully', function() {
          const defaultResponseCode = 200;
          sendSuccess(responseMock, integerResponseDataArrayObject);
          expect(responseMock.status.calledWith(defaultResponseCode));
          expect(responseMock.send.calledWith(integerResponseDataArrayObject));
        });
      });

      describe('with response code', function() {

        it('sends 200 response successfully', function() {
          const responseCode = 200;
          sendSuccess(responseMock, integerResponseDataArrayObject, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(integerResponseDataArrayObject));
        });

        it('sends 201 response successfully', function() {
          const responseCode = 201;
          sendSuccess(responseMock, integerResponseDataArrayObject, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(integerResponseDataArrayObject));
        });
      });
    });

    describe('with a string array response data array', function() {
      const stringResponseDataArrayObject = { data: ['hi', 'test', 'here'] };

      describe('without response code', function() {

        it('sends 200 response successfully', function() {
          const defaultResponseCode = 200;
          sendSuccess(responseMock, stringResponseDataArrayObject);
          expect(responseMock.status.calledWith(defaultResponseCode));
          expect(responseMock.send.calledWith(stringResponseDataArrayObject));
        });
      });

      describe('with response code', function() {

        it('sends 200 response successfully', function() {
          const responseCode = 200;
          sendSuccess(responseMock, stringResponseDataArrayObject, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(stringResponseDataArrayObject));
        });

        it('sends 201 response successfully', function() {
          const responseCode = 201;
          sendSuccess(responseMock, stringResponseDataArrayObject, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(stringResponseDataArrayObject));
        });
      });
    });
  });

  describe('sendError @unit', function() {

    describe('with an empty error message string', function() {
      const emptyErrorMessage = '';

      describe('without response code', function() {

        it('sends 400 response successfully', function() {
          const defaultResponseCode = 400;
          sendError(responseMock, emptyErrorMessage);
          expect(responseMock.status.calledWith(defaultResponseCode));
          expect(responseMock.send.calledWith(emptyErrorMessage));
        });
      });

      describe('with response code', function() {

        it('sends 400 response successfully', function() {
          const responseCode = 400;
          sendError(responseMock, emptyErrorMessage, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(emptyErrorMessage));
        });

        it('sends 404 response successfully', function() {
          const responseCode = 404;
          sendError(responseMock, emptyErrorMessage, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(emptyErrorMessage));
        });
      });
    });

    describe('with a non-empty error message string', function() {
      const errorMessage = 'Hi! I am an error message';

      describe('without response code', function() {

        it('sends 400 response successfully', function() {
          const defaultResponseCode = 400;
          sendError(responseMock, errorMessage);
          expect(responseMock.status.calledWith(defaultResponseCode));
          expect(responseMock.send.calledWith(errorMessage));
        });
      });

      describe('with response code', function() {

        it('sends 400 response successfully', function() {
          const responseCode = 400;
          sendError(responseMock, errorMessage, responseCode);
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(errorMessage));
        });

        it('sends 404 response successfully', function() {
          const responseCode = 404;
          sendError(responseMock, errorMessage, responseCode );
          expect(responseMock.status.calledWith(responseCode));
          expect(responseMock.send.calledWith(errorMessage));
        });
      });
    });
  });
});
