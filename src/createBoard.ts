import { HgsRestApi } from "./types/generated/client/ClientApis";

export default async function createBoard(boardName: string) {
  const response = await HgsRestApi.createBoard({
    boardName,
  });

  if (!response.isSuccessful) {
    throw new Error(`fail to make board ${boardName}`);
  }
}
