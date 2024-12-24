declare module "ico-endec" {
  const icoEndec: {
    encode(pngBuffers: Buffer[]): Buffer;
    decode(icoBuffer: Buffer): Buffer[];
  };
  export default icoEndec;
}
