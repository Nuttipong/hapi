import { server as Server } from "../server";

jest.mock("../common/logger");

describe("MessageController handler", () => {
  beforeEach((done) => {
    Server.events.on("start", () => {
      done();
    });
  });

  afterEach((done) => {
    Server.events.on("stop", () => {
      done();
    });
    Server.stop();
  });

  it(`should success with connection`, async () => {
    // givenn
    const options = {
      method: "POST",
      url: "/api/messages",
      payload: JSON.stringify(mockPayload()),
    };
    const expected = JSON.stringify(mockResult());

    // when
    const resp = await Server.inject(options);

    // then
    expect(resp.statusCode).toBe(200);
    // and
    expect(resp.payload).toBeDefined();
    // and
    expect(resp.payload).toEqual(expected);
  });

  function mockPayload() {
    return {
      0: [
        {
          id: 10,
          title: "House",
          level: 0,
          children: [],
          parent_id: null,
        },
      ],
      1: [
        {
          id: 12,
          title: "Red Roof",
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 18,
          title: "Blue Roof",
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 13,
          title: "Wall",
          level: 1,
          children: [],
          parent_id: 10,
        },
      ],
      2: [
        {
          id: 17,
          title: "Blue Window",
          level: 2,
          children: [],
          parent_id: 12,
        },
        {
          id: 16,
          title: "Door",
          level: 2,
          children: [],
          parent_id: 13,
        },
        {
          id: 15,
          title: "Red Window",
          level: 2,
          children: [],
          parent_id: 12,
        },
      ],
    };
  }

  function mockResult() {
    return [
      {
        id: 10,
        title: "House",
        level: 0,
        children: [
          {
            id: 12,
            title: "Red Roof",
            level: 1,
            children: [
              {
                id: 17,
                title: "Blue Window",
                level: 2,
                children: [],
                parent_id: 12,
              },
              {
                id: 15,
                title: "Red Window",
                level: 2,
                children: [],
                parent_id: 12,
              },
            ],
            parent_id: 10,
          },
          {
            id: 18,
            title: "Blue Roof",
            level: 1,
            children: [],
            parent_id: 10,
          },
          {
            id: 13,
            title: "Wall",
            level: 1,
            children: [
              {
                id: 16,
                title: "Door",
                level: 2,
                children: [],
                parent_id: 13,
              },
            ],
            parent_id: 10,
          },
        ],
        parent_id: null,
      },
    ];
  }
});
