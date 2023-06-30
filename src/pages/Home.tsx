import { useEffect, useState } from "react";

import { Box, Stack } from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api";
import { useAtomValue } from "jotai";

import EachFont from "~/components/EachFont";
import Menubar from "~/components/Menubar";
import { familyKeywordAtom, fontSizeAtom, jaFilterAtom } from "~/utils/jotai";

const HomePage: React.FC = () => {
  const fontSize = useAtomValue(fontSizeAtom);
  const jaFilter = useAtomValue(jaFilterAtom);
  const [familyList, setFamilyList] = useState<string[]>([]);
  const familyKeyword = useAtomValue(familyKeywordAtom);

  const getFontNameList = async () => {
    const familiyNameList: string[] = await invoke(
      jaFilter ? "get_ja_families" : "get_families",
      {
        keyword: familyKeyword,
      }
    );
    console.log(familiyNameList);
    setFamilyList(familiyNameList);
  };

  useEffect(() => {
    getFontNameList();
  }, [familyKeyword, jaFilter]);

  return (
    <>
      <Menubar />
      <Box p="1rem">
        <Stack
          gap="0.5rem"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {familyList.map((family) => (
            <EachFont key={family} family_name={family} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;
