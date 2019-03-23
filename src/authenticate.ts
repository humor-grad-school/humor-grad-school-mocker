import { HgsRestApi } from "./types/generated/client/ClientApis";

export default async function authenticate(idToken: string): Promise<string> {
  const response = await HgsRestApi.authenticate({
    origin: 'local',
    authenticationRequestData: {
      idToken,
    },
  });

  return response.data.sessionToken;
}

export async function makeIdentity(idToken: string): Promise<void> {
  await HgsRestApi.authenticate({
    origin: 'local',
    authenticationRequestData: {
      idToken,
    },
  });
}