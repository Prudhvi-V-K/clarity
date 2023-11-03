"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Strike from "@tiptap/extension-strike";
import React from "react";
import { Button } from "../ui/button";
import { type User } from "@prisma/client";
import { Input } from "../ui/input";
import { api } from "~/trpc/react";

type Props = {
    initial?: string;
    user?: User;
};

export default function CreatePost({user}: Props) {
  const editor = useEditor({
      extensions: [
          StarterKit,
          Document,
          Paragraph,
          Text,
            Strike
      ],
    content: "<p>Today was awesome bro!</p>",
  });
    
    const post = api.post.create.useMutation();

    const [title, setTitle] = React.useState("");
    
    function onSubmit() {
        const content = editor?.getHTML() ?? "";

        const res = post.mutate({
            title,
            content,
            user_id: user?.id ?? "",
        });
    }

    return (
      <div className="p-2">
        <div className="editor rounded-xl border-2 border-b-4 border-neutral-600 bg-white p-3">
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="mb-4 border-2 border-b-4 border-neutral-600 text-base"
            value={title}
            placeholder="Enter The Post Title"
          />
          <EditorContent editor={editor} />
          <Button onClick={onSubmit} className="mt-2 px-3 py-2 pl-2 text-lg w-full">
            Post
          </Button>
        </div>
      </div>
    );
}