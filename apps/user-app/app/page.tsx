import Image, { type ImageProps } from "next/image";
// import { PrismaClient } from "@repo/db/client";
// const client = new PrismaClient();

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
   <div className="text-3xl bg-yellow-200">hello</div>
  );
}
