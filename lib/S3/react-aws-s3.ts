import shortId from 'short-uuid';

import { dateYMD, xAmzDate } from './Date';
import { throwError } from './ErrorThrower';
import Policy from './Policy';
import Signature from './Signature';
import { IConfig, UploadResponse } from './types';

class ReactS3Client {
  private config: IConfig;
  constructor(config: IConfig) {
    this.config = config;
  }
  public async uploadFile(
    file: File,
    newFileName?: string
  ): Promise<UploadResponse> {
    throwError(this.config, file);

    const fd = new FormData();
    const fileName: string = this.getFileNameWithExtension(file, newFileName);
    const key: string = `${
      this.config.dirName ? this.config.dirName + '/' : ''
    }${fileName}`;
    const url: string = this.config.s3Url;
    fd.append('key', key);
    fd.append('acl', 'public-read');
    fd.append('Content-Type', file.type);
    fd.append('x-amz-meta-uuid', '14365123651274');
    fd.append('x-amz-server-side-encryption', 'AES256');
    fd.append(
      'X-Amz-Credential',
      `${this.config.accessKeyId}/${dateYMD}/${this.config.region}/s3/aws4_request`
    );
    fd.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
    fd.append('X-Amz-Date', xAmzDate);
    fd.append('x-amz-meta-tag', '');
    fd.append('Policy', Policy.getPolicy(this.config));
    fd.append(
      'X-Amz-Signature',
      Signature.getSignature(
        this.config,
        dateYMD,
        Policy.getPolicy(this.config)
      )
    );
    fd.append('file', file);

    const data = await fetch(url, { method: 'post', body: fd });
    if (!data.ok) return Promise.reject(data);
    return Promise.resolve({
      bucket: this.config.bucketName,
      key: `${this.config.dirName ? this.config.dirName + '/' : ''}${fileName}`,
      location: `${url}/${
        this.config.dirName ? this.config.dirName + '/' : ''
      }${fileName}`,
      status: data.status
    });
  }
  private getFileNameWithExtension(file: File, newFileName?: string): string {
    if (newFileName && newFileName.includes('.')) {
      return newFileName;
    }
    return `${newFileName || shortId.generate()}.${file.type.split('/')[1]}`;
  }
}

export default ReactS3Client;
