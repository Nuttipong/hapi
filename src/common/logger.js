export class ConsoleLogger {
  constructor() {
    if (this.constructor["name"] === "ConsoleLogger") {
      throw new Error("ConsoleLogger is abstract.");
    }
  }

  log(data) {}
  info(data) {}
  error(data) {}
  table(data) {}
}

export class Logger extends ConsoleLogger {
  constructor() {
    super();
    if (this.constructor["instance"]) {
      return this.constructor["instance"];
    }
    this.constructor["instance"] = this;
  }

  log(data) {
    console.log(data);
  }

  info(data) {
    console.info(data);
  }

  error(data) {
    console.error(data);
  }

  table(data) {
    console.table(data);
  }
}
