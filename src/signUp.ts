import { HgsRestApi } from "./types/generated/client/ClientApis";
import uuid from 'uuid/v4';

export default async function signUp(): Promise<string> {
  const idToken = uuid();

  const response = await HgsRestApi.signUp({
    origin: 'local',
    username: idToken,
    authenticationRequestData: {
      idToken,
    },
  });

  return idToken;
}
