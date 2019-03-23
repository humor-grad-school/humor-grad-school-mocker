import { HgsRestApi } from "./types/generated/client/ClientApis";
import FormData from 'form-data';

async function UploadContentToS3(content): Promise<string> {
  const { data } = await HgsRestApi.requestPresignedPostFieldsForContent();
  const {
    key,
    url,
    fields,
  } = data;

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('key', key);
  formData.append('file', content);

  await (new Promise((resolve, reject) => {
    formData.submit(url.replace('https', 'http'), (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  }));

  return data.key;
}

export default async function writePost(boardName: string, title: string, content: string): Promise<number> {
  const contentS3Key = await UploadContentToS3(content);

  const response = await HgsRestApi.writePost({
    boardName,
    title,
    contentS3Key,
  });

  return response.data.postId;
}
