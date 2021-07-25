import { Paging, PageButton } from "./paging";

describe("Paging component", () => {
  it("should handle setRange function", () => {
    // given
    const tuple = [
      [
        100,
        1,
        10,
        10,
        [
          { page: 1, pageUrl: "" },
          { page: 2, pageUrl: "" },
          { page: 3, pageUrl: "" },
          { page: 4, pageUrl: "" },
          { page: 5, pageUrl: "" },
          { page: 6, pageUrl: "" },
          { page: 7, pageUrl: "" },
          { page: 8, pageUrl: "" },
          { page: 9, pageUrl: "" },
          { page: 10, pageUrl: "" },
        ],
      ],
      [
        100,
        11,
        10,
        10,
        [
          { page: 2, pageUrl: "" },
          { page: 3, pageUrl: "" },
          { page: 4, pageUrl: "" },
          { page: 5, pageUrl: "" },
          { page: 6, pageUrl: "" },
          { page: 7, pageUrl: "" },
          { page: 8, pageUrl: "" },
          { page: 9, pageUrl: "" },
          { page: 10, pageUrl: "" },
        ],
      ],
    ];

    for (const row of tuple) {
      const [total, page, limit, range, result] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setRange();

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.rangeBtn).toEqual(result);
    }
  });

  it("should handle setFirst function", () => {
    // given
    const tuple = [
      [100, 1, 10, 10, null],
      [100, 11, 10, 10, { page: 1, pageUrl: "" }],
      [100, 30, 10, 10, { page: 1, pageUrl: "" }],
    ];

    for (const row of tuple) {
      const [total, page, limit, range, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setFirst();

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.firstBtn).toEqual(expectedResult);
    }
  });

  it("should handle setLast function", () => {
    // given
    const tuple = [
      [100, 1, 10, 10, { page: 10, pageUrl: "" }],
      [100, 11, 10, 10, { page: 10, pageUrl: "" }],
      [100, 30, 10, 10, { page: 10, pageUrl: "" }],
      [100, 10, 10, 10, null],
    ];

    for (const row of tuple) {
      const [total, page, limit, range, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setLast();

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.lastBtn).toEqual(expectedResult);
    }
  });

  it("should handle setNext function", () => {
    // given
    const tuple = [
      [100, 1, 10, 10, { page: 2, pageUrl: "" }],
      [100, 11, 10, 10, null],
      [100, 30, 10, 10, null],
      [100, 10, 10, 10, null],
      [100, 5, 10, 10, { page: 6, pageUrl: "" }],
    ];

    for (const row of tuple) {
      const [total, page, limit, range, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setNext();

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.nextBtn).toEqual(expectedResult);
    }
  });

  it("should handle setPrev function", () => {
    // given
    const tuple = [
      [100, 2, 10, 10, { page: 1, pageUrl: "" }],
      [100, 11, 10, 10, { page: 10, pageUrl: "" }],
      [100, 1, 10, 10, null],
      [100, 5, 10, 10, { page: 4, pageUrl: "" }],
    ];

    for (const row of tuple) {
      const [total, page, limit, range, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setPrev();

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.prevBtn).toEqual(expectedResult);
    }
  });

  it("should handle setUrl with next function", () => {
    // given
    const tuple = [[10, 1, 5, 2, PageButton.NEXT, { page: 2, pageUrl: "2" }]];

    for (const row of tuple) {
      const [total, page, limit, range, cmd, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setNext().setUrl(cmd, (p) => {
        return `${p}`;
      });

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.nextBtn).toEqual(expectedResult);
    }
  });

  it("should handle setUrl with prev function", () => {
    // given
    const tuple = [[10, 2, 5, 2, PageButton.PREV, { page: 1, pageUrl: "1" }]];

    for (const row of tuple) {
      const [total, page, limit, range, cmd, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setPrev().setUrl(cmd, (p) => {
        return `${p}`;
      });

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.prevBtn).toEqual(expectedResult);
    }
  });

  it("should handle setUrl with first function", () => {
    // given
    const tuple = [[10, 2, 5, 2, PageButton.FISRT, { page: 1, pageUrl: "1" }]];

    for (const row of tuple) {
      const [total, page, limit, range, cmd, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setFirst().setUrl(cmd, (p) => {
        return `${p}`;
      });

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.firstBtn).toEqual(expectedResult);
    }
  });

  it("should handle setUrl with last function", () => {
    // given
    const tuple = [[10, 1, 5, 2, PageButton.LAST, { page: 2, pageUrl: "2" }]];

    for (const row of tuple) {
      const [total, page, limit, range, cmd, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setLast().setUrl(cmd, (p) => {
        return `${p}`;
      });

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.lastBtn).toEqual(expectedResult);
    }
  });

  it("should handle setUrl with range function", () => {
    // given
    const tuple = [
      [
        10,
        2,
        5,
        2,
        PageButton.RANGE,
        [
          { page: 1, pageUrl: "1" },
          { page: 2, pageUrl: "2" },
        ],
      ],
    ];

    for (const row of tuple) {
      const [total, page, limit, range, cmd, expectedResult] = row;
      const paging = new Paging(total, page, limit, range);

      // when
      const resp = paging.setRange().setUrl(cmd, (p) => {
        return `${p}`;
      });

      // then
      expect(resp).toBeDefined();
      // and
      expect(resp.rangeBtn).toEqual(expectedResult);
    }
  });
});
