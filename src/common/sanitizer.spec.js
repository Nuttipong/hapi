import { DOMSanitizer } from "./sanitizer";

describe("DOMSanitizer component", () => {
  beforeAll(() => {});

  it("should able to call clean function", () => {
    // given
    const domSanitizer = new DOMSanitizer();
    const tuple = [
      ["<img src=x onerror=alert(1)//>", '<img src="x">'],
      ["<svg><g/onload=alert(2)//<p>", "<svg><g></g></svg>"],
      [
        "<TABLE><tr><td>HELLO</tr></TABL>",
        "<table><tbody><tr><td>HELLO</td></tr></tbody></table>",
      ],
      ["nodejs<img onload=\"alert('hi')\">", "nodejs<img>"],
    ];

    // when
    for (const row of tuple) {
      const [input, expected] = row;
      const actual = domSanitizer.clean(input);

      // then
      expect(actual).toEqual(expected);
    }
  });

  it("should be singleton", () => {
    // given
    const instanceA = new DOMSanitizer();

    // when
    const instanceB = new DOMSanitizer();

    // then
    expect(instanceA).toBe(instanceB);
  });
});
