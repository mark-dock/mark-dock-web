export type FolderFileStructureInfo = {
    id: string;
    name: string;
    updatedAt: string | Date;
    type: "Folder" | "File";
};

export type FileStructureData = {
    folders: FolderFileStructureInfo[];
    files: FolderFileStructureInfo[];
    structure_folder_id: string;
};