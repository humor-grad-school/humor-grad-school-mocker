import fetch from 'node-fetch';
import signUp from './signUp';
import authenticate, { makeIdentity } from './authenticate';
import { HgsRestApi } from './types/generated/client/ClientApis';
import { humorBoardName } from './globalVariables';
import createBoard from './createBoard';
import writePost from './writePost';
import uuid from 'uuid/v4';

(global as any).fetch = fetch;

async function main() {
  HgsRestApi.setIsDevelopment(true);
  HgsRestApi.setBaseServerUrl('http://localhost:8080');

  const idToken = uuid();

  await makeIdentity(idToken);
  await signUp(idToken);
  const sessionToken = await authenticate(idToken);

  HgsRestApi.setSessionToken(sessionToken);

  try {
    await createBoard(humorBoardName);
  } catch(err) {
    console.log(`that's ok. maybe board already made before~!`);
  }


  await writePost(humorBoardName, 'this is mock', 'i am mock data');
}

// create user
// write post
// the-end

main()
  .then(() => {
    console.log('mocking finished');
  })
  .catch(err => console.error(err));