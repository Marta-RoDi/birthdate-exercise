import mockAxios from "axios";

it("calls axios enpoint get", async () => {
  // setup
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(data)
  );
});

it("calls axios enpoint post", async () => {
  // setup
  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve(data)
  );
});