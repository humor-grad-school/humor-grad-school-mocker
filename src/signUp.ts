import { HgsRestApi } from "./types/generated/client/ClientApis";

export default async function signUp(idToken: string): Promise<string> {
  const response = await HgsRestApi.signUp({
    origin: 'local',
    username: idToken,
    authenticationRequestData: {
      idToken,
    },
  });

  return idToken;
}
