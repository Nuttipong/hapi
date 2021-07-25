import { Logger, ConsoleLogger } from "./logger";

describe("Logger component", () => {
  beforeAll(() => {
    global.console = {
      log: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      table: jest.fn(),
    };
  });

  it("should call log function", () => {
    // given
    const logger = new Logger();

    // when
    logger.log("foo");

    // then
    expect(global.console.log).toHaveBeenCalledTimes(1);
  });

  it("should call info function", () => {
    // given
    const logger = new Logger();

    // when
    logger.info("bar");

    // then
    expect(global.console.info).toHaveBeenCalledTimes(1);
  });

  it("should call error function", () => {
    // given
    const logger = new Logger();

    // when
    logger.error("zoo");

    // then
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });

  it("should call table function", () => {
    // given
    const logger = new Logger();

    // when
    logger.table("tar");

    // then
    expect(global.console.table).toHaveBeenCalledTimes(1);
  });

  it("should extend ConsoleLogger as abstract", () => {
    // given
    let logger;

    // when
    try {
      logger = new ConsoleLogger();
    } catch (err) {
      // then
      expect(err.message).toEqual("ConsoleLogger is abstract.");
    }
  });
});
