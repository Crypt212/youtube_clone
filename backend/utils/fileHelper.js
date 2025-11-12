import fs from "fs/promises";

export async function createFolder (path) {
    try {
        await fs.mkdir(path, { recursive: true });
        return true;
    } catch (error) {
        if (error.code === "EEXIST") {
            return false;
        }
        throw error;
    }
};

