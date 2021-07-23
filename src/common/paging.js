export const PageButton = Object.freeze({
  NEXT: "NEXT",
  PREV: "PREV",
  FISRT: "FISRT",
  LAST: "LAST",
  RANGE: "RANGE",
});

export class Paging {
  constructor(total, page, limit, range) {
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.range = range;
    this.lastPage = Math.ceil(total / limit);

    this.rangeBtn = [];
    this.nextBtn = null;
    this.prevBtn = null;
    this.firstBtn = null;
    this.lastBtn = null;
  }

  setRange = () => {
    this.ranges();
    return this;
  };

  setNext = () => {
    this.next();
    return this;
  };

  setPrev = () => {
    this.prev();
    return this;
  };

  setFirst = () => {
    this.first();
    return this;
  };

  setLast = () => {
    this.last();
    return this;
  };

  setUrl = (btn, cb) => {
    switch (btn) {
      case PageButton.NEXT:
        if (this.nextBtn) {
          this.nextBtn.pageUrl = cb(this.nextBtn.page);
        }
        break;
      case PageButton.PREV:
        if (this.prevBtn) {
          this.prevBtn.pageUrl = cb(this.prevBtn.page);
        }
        break;
      case PageButton.FISRT:
        if (this.firstBtn) {
          this.firstBtn.pageUrl = cb(this.firstBtn.page);
        }
        break;
      case PageButton.LAST:
        if (this.lastBtn) {
          this.lastBtn.pageUrl = cb(this.lastBtn.page);
        }
        break;
      case PageButton.RANGE: {
        for (let page of this.rangeBtn) {
          page.pageUrl = cb(page.page);
        }
        break;
      }
    }
    return this;
  };

  first() {
    if (this.page !== 1) {
      this.firstBtn = {
        page: 1,
        pageUrl: "",
      };
    }
  }

  prev() {
    const startIndex = (this.page - 1) * this.limit;
    if (startIndex > 0) {
      this.prevBtn = {
        page: this.page - 1,
        pageUrl: "",
      };
    }
  }

  last() {
    if (this.page !== this.lastPage) {
      this.lastBtn = {
        page: this.lastPage,
        pageUrl: "",
      };
    }
  }

  next() {
    const endIndex = this.page * this.limit;
    if (endIndex < this.total) {
      this.nextBtn = {
        page: this.page + 1,
        pageUrl: "",
      };
    }
  }

  ranges() {
    let maxLeft = this.page - Math.floor(this.range / 2);
    let maxRight = this.page + Math.floor(this.range / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = this.range;
    }

    if (maxRight >= this.lastPage) {
      maxLeft = this.page - (this.range - 1);
      maxRight = this.lastPage;

      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }

    for (let i = maxLeft; i <= maxRight; i++) {
      this.rangeBtn.push({
        page: i,
        pageUrl: "",
      });
    }
  }
}
