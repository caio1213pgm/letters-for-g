import Heading from "@tiptap/extension-heading";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

export const letterExtensions = [
  StarterKit.configure({
    heading: false,
  }),
  Heading.configure({ levels: [1, 2] }),
  TextStyleKit,
];
