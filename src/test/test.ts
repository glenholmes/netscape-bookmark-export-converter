import convert from "../";
import { Bookmark } from "../interfaces";
import { join } from "path";

describe("reads bookmark file and returns array of bookmarks and tags", () => {
  const bookmarksFilePath = join(__dirname, "bookmarks.html");

  test("should contain 6 bookmarks", async () => {
    const tagArray: Array<Bookmark> = await convert(bookmarksFilePath);
    expect(tagArray).toHaveLength(6);
  });

  test("should contain a bookmark with 1 tag at position 1", async () => {
    const tagArray: Array<Bookmark> = await convert(bookmarksFilePath);
    expect(tagArray[0].tags).toHaveLength(1);
  });

  test("should contain a bookmark with 1 tag at position 2", async () => {
    const tagArray: Array<Bookmark> = await convert(bookmarksFilePath);
    expect(tagArray[1].tags).toHaveLength(2);
  });

  test("should contain a bookmark with 1 tag at position 3", async () => {
    const tagArray: Array<Bookmark> = await convert(bookmarksFilePath);
    expect(tagArray[5].tags).toHaveLength(3);
  });
});
