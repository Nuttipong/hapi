"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _hapi = _interopRequireDefault(require("@hapi/hapi"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _inert = _interopRequireDefault(require("@hapi/inert"));

var _vision = _interopRequireDefault(require("@hapi/vision"));

var _routes = _interopRequireDefault(require("./config/routes"));

var _logger = require("./common/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logger = new _logger.Logger();

var server = _hapi["default"].server({
  port: 3000,
  host: "localhost"
});

exports.server = server;
server.ext("onRequest", function (req, res) {
  logger.log("Request received ".concat(req.path));
  return res["continue"];
});
server.ext("onPreResponse", function (req, res) {
  if (req.response.isBoom) {
    // return res.view("error", req.response);
    logger.log("Response error ".concat(req.response));
  }

  return res["continue"];
});

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return server.register(_inert["default"]);

        case 3:
          _context.next = 5;
          return server.register(_vision["default"]);

        case 5:
          _context.next = 7;
          return server.start();

        case 7:
          server.route(_routes["default"]);
          server.views({
            engines: {
              html: _handlebars["default"]
            },
            path: "./src/templates"
          });
          logger.info("Server running on ".concat(server.info.uri));
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          logger.error(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 12]]);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJMb2dnZXIiLCJzZXJ2ZXIiLCJIYXBpIiwicG9ydCIsImhvc3QiLCJleHQiLCJyZXEiLCJyZXMiLCJsb2ciLCJwYXRoIiwicmVzcG9uc2UiLCJpc0Jvb20iLCJyZWdpc3RlciIsIkluZXJ0IiwiVmlzaW9uIiwic3RhcnQiLCJyb3V0ZSIsIlJvdXRlcyIsInZpZXdzIiwiZW5naW5lcyIsImh0bWwiLCJIYW5kbGViYXJzIiwiaW5mbyIsInVyaSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0EsSUFBTUEsTUFBTSxHQUFHLElBQUlDLGNBQUosRUFBZjs7QUFFTyxJQUFNQyxNQUFNLEdBQUdDLGlCQUFLRCxNQUFMLENBQVk7QUFDaENFLEVBQUFBLElBQUksRUFBRSxJQUQwQjtBQUVoQ0MsRUFBQUEsSUFBSSxFQUFFO0FBRjBCLENBQVosQ0FBZjs7O0FBS1BILE1BQU0sQ0FBQ0ksR0FBUCxDQUFXLFdBQVgsRUFBd0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDcENSLEVBQUFBLE1BQU0sQ0FBQ1MsR0FBUCw0QkFBK0JGLEdBQUcsQ0FBQ0csSUFBbkM7QUFDQSxTQUFPRixHQUFHLFlBQVY7QUFDRCxDQUhEO0FBS0FOLE1BQU0sQ0FBQ0ksR0FBUCxDQUFXLGVBQVgsRUFBNEIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDeEMsTUFBSUQsR0FBRyxDQUFDSSxRQUFKLENBQWFDLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0FaLElBQUFBLE1BQU0sQ0FBQ1MsR0FBUCwwQkFBNkJGLEdBQUcsQ0FBQ0ksUUFBakM7QUFDRDs7QUFDRCxTQUFPSCxHQUFHLFlBQVY7QUFDRCxDQU5EOztBQVFBLHdEQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRVNOLE1BQU0sQ0FBQ1csUUFBUCxDQUFnQkMsaUJBQWhCLENBRlQ7O0FBQUE7QUFBQTtBQUFBLGlCQUdTWixNQUFNLENBQUNXLFFBQVAsQ0FBZ0JFLGtCQUFoQixDQUhUOztBQUFBO0FBQUE7QUFBQSxpQkFJU2IsTUFBTSxDQUFDYyxLQUFQLEVBSlQ7O0FBQUE7QUFNR2QsVUFBQUEsTUFBTSxDQUFDZSxLQUFQLENBQWFDLGtCQUFiO0FBQ0FoQixVQUFBQSxNQUFNLENBQUNpQixLQUFQLENBQWE7QUFDWEMsWUFBQUEsT0FBTyxFQUFFO0FBQ1BDLGNBQUFBLElBQUksRUFBRUM7QUFEQyxhQURFO0FBSVhaLFlBQUFBLElBQUksRUFBRTtBQUpLLFdBQWI7QUFPQVYsVUFBQUEsTUFBTSxDQUFDdUIsSUFBUCw2QkFBaUNyQixNQUFNLENBQUNxQixJQUFQLENBQVlDLEdBQTdDO0FBZEg7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFnQkd4QixVQUFBQSxNQUFNLENBQUN5QixLQUFQOztBQWhCSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhcGkgZnJvbSBcIkBoYXBpL2hhcGlcIjtcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gXCJoYW5kbGViYXJzXCI7XG5pbXBvcnQgSW5lcnQgZnJvbSBcIkBoYXBpL2luZXJ0XCI7XG5pbXBvcnQgVmlzaW9uIGZyb20gXCJAaGFwaS92aXNpb25cIjtcbmltcG9ydCBSb3V0ZXMgZnJvbSBcIi4vY29uZmlnL3JvdXRlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vY29tbW9uL2xvZ2dlclwiO1xuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG5leHBvcnQgY29uc3Qgc2VydmVyID0gSGFwaS5zZXJ2ZXIoe1xuICBwb3J0OiAzMDAwLFxuICBob3N0OiBcImxvY2FsaG9zdFwiLFxufSk7XG5cbnNlcnZlci5leHQoXCJvblJlcXVlc3RcIiwgKHJlcSwgcmVzKSA9PiB7XG4gIGxvZ2dlci5sb2coYFJlcXVlc3QgcmVjZWl2ZWQgJHtyZXEucGF0aH1gKTtcbiAgcmV0dXJuIHJlcy5jb250aW51ZTtcbn0pO1xuXG5zZXJ2ZXIuZXh0KFwib25QcmVSZXNwb25zZVwiLCAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS5yZXNwb25zZS5pc0Jvb20pIHtcbiAgICAvLyByZXR1cm4gcmVzLnZpZXcoXCJlcnJvclwiLCByZXEucmVzcG9uc2UpO1xuICAgIGxvZ2dlci5sb2coYFJlc3BvbnNlIGVycm9yICR7cmVxLnJlc3BvbnNlfWApO1xuICB9XG4gIHJldHVybiByZXMuY29udGludWU7XG59KTtcblxuKGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBzZXJ2ZXIucmVnaXN0ZXIoSW5lcnQpO1xuICAgIGF3YWl0IHNlcnZlci5yZWdpc3RlcihWaXNpb24pO1xuICAgIGF3YWl0IHNlcnZlci5zdGFydCgpO1xuXG4gICAgc2VydmVyLnJvdXRlKFJvdXRlcyk7XG4gICAgc2VydmVyLnZpZXdzKHtcbiAgICAgIGVuZ2luZXM6IHtcbiAgICAgICAgaHRtbDogSGFuZGxlYmFycyxcbiAgICAgIH0sXG4gICAgICBwYXRoOiBcIi4vc3JjL3RlbXBsYXRlc1wiLFxuICAgIH0pO1xuXG4gICAgbG9nZ2VyLmluZm8oYFNlcnZlciBydW5uaW5nIG9uICR7c2VydmVyLmluZm8udXJpfWApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZXJyb3IoZXJyKTtcbiAgfVxufSkoKTtcbiJdfQ==