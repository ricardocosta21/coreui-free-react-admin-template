import { filter } from "../jestHelper/filterByTerm";

// function filter (inputArr, searchTerm) {
//   return inputArr.filter(function(arrayElement) {
//     return arrayElement.url.match(searchTerm);
//   });
// }

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" },
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filter(input, "link")).toEqual(output);

    expect(filter(input, "LINK")).toEqual(output); // New test
  });
});

describe("Calculator tests", () => {
  test("adding 1 + 2 should return 3", () => {
    // arrange and act
    var result = 3;

    // assert
    expect(result).toBe(3);
  });
});

describe("Trustiness", () => {
  test("truthy operators", () => {
    var name = "Software testing help";
    var n = null;
    expect(n).toBeNull();
    expect(name).not.toBeNull();

    //fail - as null is non success
    // expect(n).toBeTruthy();

    // pass - null treated as false or negative
    expect(n).toBeFalsy();

    // 0 - treated as false
    expect(0).toBeFalsy();
  });
});

describe("Number Matchers", () => {
  test("Number Matchers", () => {
    var num1 = 100;
    var num2 = -20;
    var num3 = 0;

    // greater than
    expect(num1).toBeGreaterThan(10);

    // less than or equal
    expect(num2).toBeLessThanOrEqual(0);

    // greater than or equal
    expect(num3).toBeGreaterThanOrEqual(0);
  });
});

describe("String Matchers", () => {
  test("string matchers", () => {
    var string1 = "software testing help - a great resource for testers";

    // test for success match
    expect(string1).toMatch("testing");

    // test for failure match
    expect(string1).not.toMatch(/abc/);
  });
});
