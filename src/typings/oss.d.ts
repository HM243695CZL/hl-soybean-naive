declare namespace Oss {
  /** oss上传策略 */
  interface Policy {
    policy: string;
    signature: string;
    key: string;
    accessKeyId: string;
    ossAccessKeyId: string;
    dir: string;
    host: string;
  }
}
