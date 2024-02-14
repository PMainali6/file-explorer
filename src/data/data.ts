export type File = {
  type: "file";
  name: string;
  meta: "js" | "ts" | "html" | "img" | "svg" | "css";
};

export type Folder = {
  type: "folder";
  name: string;
  data: (Folder | File)[];
};

export const files: Folder = {
  type: "folder",
  name: "parent",
  data: [
    {
      type: "folder",
      name: "root",
      data: [
        {
          type: "folder",
          name: "src",
          data: [
            {
              type: "file",
              meta: "js",
              name: "index.js",
            },
          ],
        },
        {
          type: "folder",
          name: "public",
          data: [
            {
              type: "file",
              meta: "ts",
              name: "index.ts",
            },
          ],
        },
        {
          type: "file",
          meta: "html",
          name: "index.html",
        },
        {
          type: "folder",
          name: "data",
          data: [
            {
              type: "folder",
              name: "images",
              data: [
                {
                  type: "file",
                  meta: "img",
                  name: "image.png",
                },
                {
                  type: "file",
                  meta: "img",
                  name: "image2.webp",
                },
              ],
            },
            {
              type: "file",
              meta: "svg",
              name: "logo.svg",
            },
          ],
        },
        {
          type: "file",
          meta: "css",
          name: "style.css",
        },
      ],
    },
  ],
};

export const ContextData = [
  { id: 1, label: "Edit" },
  { id: 2, label: "Copy" },
  { id: 3, label: "Delete" },
];
